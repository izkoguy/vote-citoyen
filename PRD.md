# PRD — Vote Citoyen

**Version :** 3.0
**Type :** Prototype scolaire full-stack (frontend statique + backend Supabase)
**Contexte :** Devoir d'EMC — Réformer la démocratie en France — Prototype scolaire

**Références visuelles :** `references/Accueil.png`, `references/connexion.png` (accessibles et examinées ; utilisées uniquement comme guide de conception, jamais intégrées dans le site final)

**Identité :** Vote Citoyen — identité originale, sans logos institutionnels ni apparence trompeuse de site officiel. Mention visible obligatoire : « Prototype scolaire ».

## 1. Vision du produit

Créer un système de vote citoyen fonctionnel avec backend Supabase, illustrant une plateforme de vote à distance pour un **prototype scolaire**. Le système permet au professeur et aux élèves de découvrir un véritable parcours de vote numérique moderne avec authentification anonyme, enregistrement des votes en base de données, fermeture du scrutin par un administrateur et affichage des résultats réels.

L'objectif est de présenter une proposition politique de manière concrète avec un système réellement fonctionnel. Le parcours inclut une **vérification d'identité** illustrative, un vote réel enregistré dans Supabase, et l'affichage de **résultats différés réels** calculés depuis la base de données.

## 2. Objectifs

- Présenter la réforme du vote en ligne dans le cadre d'un **prototype scolaire**.
- Illustrer une connexion (authentification anonyme Supabase) et une **vérification d'identité** (illustratrice).
- Montrer un bulletin de vote numérique pour le scrutin Vote Citoyen.
- Afficher une page de **résultats différés réels** (données calculées depuis les votes enregistrés dans Supabase).
- Obtenir une interface visuellement crédible et soignée, inspirée des **références visuelles** (`references/Accueil.png`, `references/connexion.png`).
- Permettre de naviguer facilement entre les écrans pendant une présentation en classe.
- Démontrer un système complet : frontend statique + backend Supabase (DB, Auth, Edge Functions, RLS).

## 3. Périmètre fonctionnel

Le système comporte sept écrans principaux pour un **prototype scolaire** :

1. **Accueil :** présentation de Vote Citoyen, contexte du prototype scolaire et bouton pour commencer.
2. **Connexion :** formulaire avec authentification anonyme Supabase.
3. **Vérification :** étapes illustratives de **vérification d'identité** (contrôle de l'identité et de l'éligibilité).
4. **Vote :** présentation du bulletin du scrutin citoyen avec quatre propositions de réformes et le vote blanc, vote réel enregistré via RPC Supabase.
5. **Attente :** écran d'attente de la fermeture du scrutin avec polling automatique.
6. **Résultats :** **résultats différés réels** — statistiques calculées depuis les votes enregistrés dans Supabase, affichées uniquement après fermeture du scrutin.
7. **Administration :** interface protégée par code secret pour ouvrir/fermer/réinitialiser le scrutin et compter les votes.

Prévoir également une section informative sur les avantages et les limites du vote en ligne.

### B. Scrutin citoyen
 
 Le bulletin présente un **scrutin citoyen** avec quatre propositions de réformes et le vote blanc :
 
 - Vote numérique
 - Vote par préférence
 - Vote par courrier
 - Rendre le vote blanc significatif
 - Vote blanc
 
 Le bulletin permet de sélectionner une réforme et d'enregistrer le vote dans Supabase via la fonction RPC `enregistrer_vote` (atomique, protégée par RLS). Une confirmation de vote doit être visible.

### C. Vérification d'identité

Créer une étape dédiée, visuellement crédible, montrant deux contrôles distincts :

1. **Lecture de la carte d'identité** — panneau ou écran dédié, avec indicateur de progression, état en attente, puis état réussi déclenché par un bouton de simulation. Libellé expliquant clairement qu'il s'agit d'un prototype scolaire.
2. **Vérification du visage** — panneau ou écran dédié, avec indicateur de progression, état en attente, puis état réussi déclenché par un bouton de simulation. Libellé expliquant clairement qu'il s'agit d'un prototype scolaire.

Chaque contrôle doit avoir son propre écran ou panneau, un indicateur de progression, un état en attente, puis un état réussi déclenché par un bouton de simulation. Aucune caméra n'est activée, aucun document d'identité réel n'est demandé, aucun document n'est téléversé, aucune donnée biométrique n'est collectée et aucune information personnelle n'est stockée. La simulation doit être facile à passer via des boutons de démonstration.

### D. Résultats différés réels

Après le vote, présenter un écran de confirmation, puis un écran d'attente verrouillé jusqu'à la fermeture du scrutin par l'administrateur.

Les résultats sont calculés en temps réel à partir des votes enregistrés dans la table `votes` de Supabase (RLS : lecture autorisée seulement si scrutin fermé) et totalisent exactement 100 %.

Après la fermeture du scrutin, afficher une page de résultats claire avec les quatre réformes + vote blanc, leurs pourcentages et un diagramme lisible représentant exactement ces pourcentages et totalisant 100 %.

Les **références visuelles** (`references/Accueil.png`, `references/connexion.png`) guident la structure de l'en-tête, la navigation, la présentation des formulaires et la hiérarchie typographique.

## 4. Comportement

- La connexion utilise l'authentification anonyme Supabase (un utilisateur anonyme par session).
- Le vote est réellement enregistré dans Supabase via la fonction RPC `enregistrer_vote` (atomique, contrainte unique par utilisateur, RLS).
- Les choix du bulletin modifient les **résultats différés réels** (calculés depuis la DB).
- Les résultats sont calculés dynamiquement, réels et différés (affichés seulement après fermeture du scrutin).
- La **vérification est illustrative** (pas d'authentification réelle, pas de collecte biométrique).
- Un bouton permet de revenir à l'accueil et de recommencer le parcours.
- Les étapes de vérification peuvent être passées afin de faciliter la présentation.
- Aucun compte utilisateur permanent n'est créé (authentification anonyme temporaire).
- L'interface s'inspire des **références visuelles** (`references/Accueil.png`, `references/connexion.png`) sans reproduire de logos ou contenus protégés.
- Administration via Edge Function `admin-actions` avec code secret stocké dans les secrets Supabase.

## 5. Contraintes techniques

- HTML, CSS et JavaScript natifs (frontend statique).
- Backend : Supabase (PostgreSQL, Auth anonyme, RLS, Edge Functions, RPC).
- Schéma DB : tables `scrutin` (singleton) et `votes` (contrainte unique user_id, RLS).
- Fonctions SQL : `enregistrer_vote()` (SECURITY DEFINER), `reinitialiser_scrutin()`.
- Edge Function : `admin-actions` (open, close, reset, count).
- Déploiement frontend : hébergement statique (GitHub Pages, Netlify, Vercel, etc.).
- Déploiement backend : Supabase Dashboard / CLI.
- Aucune donnée personnelle collectée ni stockée (seuls identifiants techniques anonymes et votes).
- Interface responsive sur ordinateur, tablette et smartphone.

## 6. Direction visuelle

Créer une identité originale de service civique numérique français, inspirée des conventions ergonomiques des services publics, sans reproduire une identité gouvernementale officielle.

L'interface doit être sobre, accessible, professionnelle, lisible et cohérente d'un écran à l'autre.

Les captures de référence et le document `DESIGN.md` précisent la direction artistique.

## 7. Critères d'acceptation

- Les sept écrans sont présents (Accueil, Connexion, Vérification, Vote, Attente, Résultats, Administration).
- La navigation fonctionne intégralement.
- La **vérification d'identité** peut être passée.
- Les **résultats différés réels** sont calculés dynamiquement depuis Supabase.
- Les votes sont réellement enregistrés dans Supabase (un par utilisateur anonyme).
- L'administrateur peut ouvrir/fermer/réinitialiser le scrutin via `admin.html`.
- Aucune donnée personnelle n'est collectée ni stockée.
- Le prototype fonctionne sur hébergement statique + Supabase.
- La mention « Prototype scolaire » est visible.
- L'interface est utilisable sur ordinateur et smartphone.
- Les **références visuelles** (`references/Accueil.png`, `references/connexion.png`) sont utilisées comme guide sans reproduction directe.

## 8. Livrables

- `index.html`
- `connexion.html`
- `verification.html`
- `vote.html`
- `waiting.html`
- `resultat.html`
- `admin.html`
- `style.css`
- `script.js`
- `supabase/schema.sql`
- `supabase/functions/admin-actions/index.ts`
- `SUPABASE_SETUP.md`
- `PRD.md`
- `DESIGN.md`
- `IMPLEMENTATION_PLAN.md`
- Dossier `references/` contenant les captures de référence éventuelles.