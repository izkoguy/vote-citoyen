# Vote Citoyen

Prototype scolaire d'un système de vote citoyen avec backend Supabase : Accueil → Connexion → Vérification → Vote → Résultat.

## Fichiers

- `index.html` — Page d'accueil
- `connexion.html` — Formulaire de connexion
- `verification.html` — Vérification d'identité et d'éligibilité
- `vote.html` — Bulletin de vote
- `resultat.html` — Résultats du scrutin
- `waiting.html` — Attente de la fermeture du scrutin
- `admin.html` — Administration du scrutin
- `style.css` — Styles globaux et responsive
- `script.js` — Interactions avec Supabase (authentification anonyme, vote réel, résultats en temps réel)
- `references/` — Images de référence visuelle
- `supabase/` — Schéma SQL et Edge Functions

## Utilisation

Configurer Supabase selon `SUPABASE_SETUP.md`, puis déployer les fichiers HTML/CSS/JS sur un hébergement statique.

## Parcours
 
 1. Accueil (`index.html`)
 2. Connexion (`connexion.html`) — authentification anonyme Supabase
 3. Vérification (`verification.html`) — vérification d'identité et d'éligibilité
 4. Vote (`vote.html`) — sélection d'une réforme, vote enregistré dans Supabase
 5. Attente (`waiting.html`) — polling de l'état du scrutin
 6. Résultat (`resultat.html`) — affichage des résultats réels depuis la base de données
