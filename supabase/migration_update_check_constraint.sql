-- ============================================
-- MIGRATION : Mise à jour de la contrainte CHECK pour les nouvelles réformes
-- À exécuter dans l'éditeur SQL de Supabase
-- ============================================

-- 1. Supprimer l'ancienne contrainte CHECK
ALTER TABLE votes DROP CONSTRAINT IF EXISTS votes_candidat_check;

-- 2. Ajouter la nouvelle contrainte CHECK avec les valeurs des réformes
ALTER TABLE votes ADD CONSTRAINT votes_candidat_check 
CHECK (candidat IN ('numerique','preference','courrier','blanc_significatif','blanc'));

-- 3. Vérifier que la contrainte a bien été mise à jour
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'votes'::regclass AND contype = 'c';