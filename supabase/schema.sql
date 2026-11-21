-- ============================================
-- SCHÉMA SUPABASE - SYSTÈME DE VOTE CITOYEN
-- À exécuter dans l'éditeur SQL de Supabase
-- ============================================

-- Table scrutin : état global du scrutin (singleton)
CREATE TABLE scrutin (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ouvert boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Table votes : votes enregistrés
CREATE TABLE votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  candidat text NOT NULL CHECK (candidat IN ('delarbre','jeremy','nahil','lea','thomas','camille','blanc')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id)  -- Un seul vote par utilisateur
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS sur les deux tables
ALTER TABLE scrutin ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Politiques pour scrutin : lecture publique uniquement
CREATE POLICY "Public read scrutin" ON scrutin
  FOR SELECT USING (true);

-- Politiques pour votes :
-- - Insertion : seulement si scrutin ouvert ET utilisateur n'a pas encore voté
-- - Lecture : seulement si scrutin FERMÉ
-- - Pas de UPDATE, pas de DELETE

CREATE POLICY "Insert vote if open" ON votes
  FOR INSERT WITH CHECK (
    (SELECT ouvert FROM scrutin LIMIT 1)
    AND NOT EXISTS (SELECT 1 FROM votes WHERE user_id = auth.uid())
  );

CREATE POLICY "Read votes if closed" ON votes
  FOR SELECT USING (
    NOT (SELECT ouvert FROM scrutin LIMIT 1)
  );

-- ============================================
-- FONCTIONS SQL
-- ============================================

-- Fonction pour enregistrer un vote (atomique, SECURITY DEFINER)
CREATE OR REPLACE FUNCTION enregistrer_vote(p_candidat text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Vérification atomique : scrutin ouvert + pas de vote existant
  IF NOT (SELECT ouvert FROM scrutin LIMIT 1) THEN
    RAISE EXCEPTION 'Scrutin fermé';
  END IF;
  
  IF EXISTS (SELECT 1 FROM votes WHERE user_id = auth.uid()) THEN
    RAISE EXCEPTION 'Déjà voté';
  END IF;
  
  INSERT INTO votes (user_id, candidat) VALUES (auth.uid(), p_candidat);
END;
$$;

-- Fonction pour réinitialiser le scrutin (supprimer tous les votes + fermer)
CREATE OR REPLACE FUNCTION reinitialiser_scrutin()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM votes;
  UPDATE scrutin SET ouvert = false;
END;
$$;

-- ============================================
-- DONNÉES INITIALES
-- ============================================

-- Insérer la ligne unique pour le scrutin (OUVERT par défaut pour tests)
INSERT INTO scrutin (ouvert) VALUES (true);