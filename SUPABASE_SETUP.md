# Instructions de configuration Supabase — Vote Citoyen

Ce document décrit les étapes manuelles à effectuer dans le tableau de bord Supabase pour mettre en place le système de vote.

---

## 1. Créer un projet Supabase

1. Aller sur [supabase.com](https://supabase.com) et se connecter/créer un compte
2. Cliquer sur **"New Project"**
3. Choisir une organisation (ou en créer une)
4. Remplir :
   - **Name** : `vote-citoyen` (ou votre choix)
   - **Database Password** : générer un mot de passe fort (le noter !)
   - **Region** : choisir la plus proche (ex: `Europe (Paris)` pour la France)
5. Cliquer sur **"Create new project"**
6. Attendre 2-3 minutes que le projet soit prêt

---

## 2. Récupérer les clés API

Dans le tableau de bord du projet :
1. Aller dans **Settings** (icône engrenage) → **API**
2. Copier :
   - **Project URL** (ex: `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key (clé publique, longue chaîne commençant par `eyJ...`)

Ces deux valeurs doivent être mises dans `script.js` :
```javascript
const SUPABASE_URL = 'https://VOTRE_PROJET.supabase.co';
const SUPABASE_ANON_KEY = 'VOTRE_CLE_ANON_PUBLIQUE';
```

---

## 3. Exécuter le schéma SQL

1. Dans le tableau de bord, aller dans **SQL Editor** (icône base de données)
2. Cliquer sur **"New query"**
3. Copier-coller le contenu du fichier `supabase/schema.sql`
4. Cliquer sur **"Run"** (ou Ctrl+Enter)
5. Vérifier qu'il n'y a pas d'erreurs

Le script crée :
- Table `scrutin` (état ouvert/fermé)
- Table `votes` (votes avec contrainte unique par utilisateur)
- Politiques RLS (protection lecture/écriture)
- Fonctions `enregistrer_vote()` et `reinitialiser_scrutin()`
- Ligne initiale dans `scrutin` (fermé par défaut)

---

## 4. Ajouter le secret administrateur

1. Aller dans **Settings** → **Edge Functions** → **Secrets**
2. Cliquer sur **"Add secret"**
3. **Name** : `ADMIN_CODE`
4. **Value** : votre code secret (ex: `MonCodeSecret2024!`)
5. Cliquer sur **"Add secret"**

⚠️ Ce code ne sera **jamais visible** dans le frontend ni en base de données. Il est stocké chiffré dans les secrets Supabase.

---

## 5. Déployer l'Edge Function

### Option A : Via Supabase CLI (recommandé)

```bash
# 1. Installer la CLI
npm install -g supabase

# 2. Se connecter
supabase login

# 3. Lier le projet (remplacer VOTRE_REF par le Project Ref visible dans Settings > General)
supabase link --project-ref VOTRE_REF

# 4. Déployer la fonction
supabase functions deploy admin-actions
```

### Option B : Via le Dashboard (sans CLI)

1. Aller dans **Edge Functions** (icône éclair)
2. Cliquer sur **"Create a new function"**
3. **Name** : `admin-actions`
4. Copier-coller le contenu de `supabase/functions/admin-actions/index.ts`
5. Cliquer sur **"Deploy"**

---

## 6. Vérifier le déploiement

1. Dans **Edge Functions**, cliquer sur `admin-actions`
2. Onglet **"Logs"** pour voir les éventuelles erreurs
3. Tester avec un appel HTTP (via curl, Postman, ou la page `admin.html` une fois déployée)

---

## 7. Tester le système complet

1. Héberger le site (GitHub Pages, Netlify, Vercel, ou en local avec `npx serve`)
2. Ouvrir la page d'accueil
3. Parcourir : Connexion → Vérification → Vote
4. Vérifier que le vote est enregistré (page d'attente)
5. Aller sur `admin.html`, entrer le code admin
6. Cliquer "Actualiser le compteur" → doit afficher 1 vote
7. Cliquer "Fermer le scrutin"
8. Retourner sur la page d'attente → redirection auto vers résultats
9. Vérifier que les résultats affichent le bon vote

---

## 8. Réinitialiser pour un nouveau scrutin

Depuis `admin.html` avec le code admin :
1. Cliquer "Réinitialiser les votes" (demande confirmation)
2. Le scrutin est remis à zéro et fermé

Ou via SQL :
```sql
SELECT reinitialiser_scrutin();
```

---

## 9. Limites du plan gratuit Supabase

| Ressource | Limite | Impact pour ~10 votants |
|-----------|--------|------------------------|
| Base de données | 500 Mo | Négligeable |
| Bande passante | 2 Go/mois | Négligeable |
| Auth (MAU) | 50 000 | Négligeable |
| Edge Functions | 500 000 invocations/mois | Négligeable |
| Fonctions DB | Incluses | Incluses |

**Aucun coût prévisible** pour ce projet.

---

## 10. Dépannage courant

### "supabase-js non chargé"
- Vérifier que `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>` est présent dans toutes les pages HTML

### "Erreur auth anonyme"
- Vérifier que l'authentification anonyme est activée : **Authentication** → **Providers** → **Anonymous** → **Enabled**

### "RLS bloque l'insertion"
- Vérifier que les politiques sont bien créées (étape 3)
- Vérifier que `scrutin.ouvert = true` avant de voter

### "Edge Function retourne 401"
- Vérifier que le secret `ADMIN_CODE` est bien défini (étape 4)
- Vérifier que le code saisi dans `admin.html` correspond exactement

### "CORS error"
- L'Edge Function inclut les headers CORS nécessaires
- Si erreur persiste, vérifier que l'URL de la fonction est correcte : `https://VOTRE_PROJET.supabase.co/functions/v1/admin-actions`

---

## 11. Fichiers à déployer

Tous les fichiers du projet (à la racine) :
- `index.html`
- `connexion.html`
- `verification.html`
- `vote.html`
- `resultat.html`
- `waiting.html` (nouveau)
- `admin.html` (nouveau)
- `script.js` (modifié)
- `style.css` (inchangé)
- `assets/` (dossier complet)

Les fichiers dans `supabase/` ne sont **pas** à déployer sur l'hébergement statique :
- `supabase/schema.sql` (pour référence)
- `supabase/functions/admin-actions/index.ts` (déployé via CLI/Dashboard)

---

## 12. Mise à jour du code admin

Pour changer le code administrateur :
1. Aller dans **Settings** → **Edge Functions** → **Secrets**
2. Modifier la valeur de `ADMIN_CODE`
3. Sauvegarder
4. Redéployer la fonction (ou attendre quelques secondes, les secrets sont rechargés à chaud)

---

**Le système est prêt !** 🎉