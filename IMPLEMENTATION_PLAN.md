# IMPLEMENTATION_PLAN.md — Vote Citoyen

## 1. Écrans requis et parcours de navigation
- **Accueil** (`index.html`) : présentation du projet Vote Citoyen, contexte du **prototype scolaire**, bouton pour commencer. Fidélité visuelle à `references/Accueil.png` (structure header, navigation horizontale, hiérarchie typographique) sans intégration des captures dans la page finale.
- **Connexion** (`connexion.html`) : formulaire de connexion (email + mot de passe) inspiré de `references/connexion.png` (proportions, champs, bouton principal, liens secondaires) ; authentification anonyme Supabase. Aucune capture intégrée.
- **Vérification** (`verification.html`) : deux étapes distinctes — lecture de la carte d'identité et vérification du visage — avec indicateur de progression, état en attente, bouton de simulation et libellé "prototype scolaire".
- **Bulletin** (`vote.html`) : bulletin du **scrutin Vote Citoyen** avec six candidats (Monsieur Delarbre, Jérémy, Nahil, Michou, Michael Jackson, Jul). Vote réel enregistré dans Supabase. Confirmation du bulletin visible.
- **Attente** (`waiting.html`) : écran d'attente de la fermeture du scrutin, polling de l'état du scrutin.
- **Résultats** (`resultat.html`) : affichage des résultats réels calculés depuis la base de données Supabase avec diagramme dynamique.
- **Administration** (`admin.html`) : gestion du scrutin (ouvrir/fermer/réinitialiser/compter les votes) via Edge Function.

Parcours : Accueil → Connexion → Vérification → Vote → Attente → Résultats. Navigation simple via liens `<a>` dans un header commun.

## 2. Structure et rôle des fichiers
- `index.html` : structure sémantique (header, main, footer), liens vers CSS/JS, navigation, mention visible « Prototype scolaire ».
- `connexion.html` : formulaire de connexion, fidèle à `references/connexion.png` sans intégration de la capture.
- `verification.html` : deux panneaux/écrans de vérification (identité + visage), indicateurs de progression, boutons de simulation.
- `vote.html` : bulletin avec six candidats, vote réel via Supabase RPC `enregistrer_vote`.
- `waiting.html` : écran d'attente avec polling de l'état du scrutin.
- `resultat.html` : affichage des résultats réels depuis la table `votes` de Supabase.
- `admin.html` : interface d'administration via Edge Function `admin-actions`.
- `style.css` : styles globaux, variables de couleur (identité Vote Citoyen), mise en page responsive, composants réutilisables, diagramme dynamique lisible.
- `script.js` : interactions réelles avec Supabase (authentification anonyme, vote via RPC, résultats depuis DB, polling, admin via Edge Function).

## 3. Composants visuels réutilisables et identité
- **Header** : logo Vote Citoyen (texte stylisé ou SVG simple), navigation (Accueil, Connexion, Résultats, Profil), langue FR.
- **Carte de vote** : composant réutilisable pour chaque candidat (nom, présentation, bouton sélection).
- **Indicateur de progression** : pour les étapes de vérification.
- **Bouton primaire** : style cohérent (couleur identitaire, hover, focus visible).
- **Diagramme dynamique** : représentation visuelle des résultats calculés depuis la DB totalisant 100 %.
- **Identité originale** : palette sobre (bleu profond, blanc, gris clair), typographie sans-serif, icônes simples. Pas de copie du design France Titres au-delà de l'inspiration structurelle. Aucune capture de référence intégrée dans le rendu final.

## 4. Utilisation des références
- `references/Accueil.png` : inspiration pour la structure du header, la navigation horizontale et la mise en page d'accueil. Non intégrée dans la page finale.
- `references/connexion.png` : inspiration pour le formulaire de connexion (champs email/mot de passe, bouton principal, liens secondaires). Non intégrée dans la page finale.

Aucune copie directe des logos ou contenus protégés. Les références servent uniquement de guide visuel et ne sont pas affichées dans le site.

## 5. Interactions réelles avec Supabase
- **Connexion** : authentification anonyme Supabase (`signInAnonymously`) ; si OK, redirection vers `verification.html`.
- **Vérification** : deux contrôles distincts (identité et visage), chacun avec indicateur de progression, état en attente, bouton de simulation déclenchant l'état réussi. Libellés expliquant le caractère prototype scolaire.
- **Vote** : sélection d'un candidat parmi six ; validation (un choix sélectionné) ; enregistrement via RPC `enregistrer_vote` (atomique, RLS) ; redirection vers `waiting.html`.
- **Attente** : polling de l'état du scrutin (`scrutin.ouvert`) toutes les 5 secondes ; redirection auto vers `resultat.html` quand fermé.
- **Résultats** : lecture des votes depuis la table `votes` (RLS : lecture seulement si scrutin fermé) ; calcul dynamique des pourcentages ; affichage diagramme.
- **Administration** : actions via Edge Function `admin-actions` (open/close/reset/count) avec code admin stocké dans les secrets Supabase.

## 6. Responsive design, accessibilité et tests manuels
- **Responsive** : media queries pour mobile (< 768px) et tablette ; navigation en colonne sur petit écran ; tailles de texte fluides (`rem`) ; diagramme lisible sur mobile.
- **Accessibilité** : attributs `alt` sur images, `label` associés aux inputs, `aria-label` sur boutons, contraste suffisant, focus visible (`outline`), navigation au clavier.
- **Tests manuels** : vérifier le parcours complet (Accueil → Connexion → Vérification → Vote → Attente → Résultats) sur Chrome/Firefox (desktop + mobile simulé), vérifier la navigation clavier, vérifier que les résultats sont calculés dynamiquement, vérifier que les captures de référence ne sont pas intégrées dans la page finale, vérifier la mention du prototype et la confidentialité.

## 7. Compatibilité hébergement statique gratuit
- Projet 100% statique : HTML, CSS, JS uniquement (backend Supabase géré séparément).
- Aucun serveur requis pour le frontend ; compatible GitHub Pages, Netlify, Vercel, ou tout hébergeur statique.
- Dépendance CDN : `@supabase/supabase-js@2` via jsDelivr.

## 8. Fichiers à créer ou conserver
- **Conserver** : `PRD.md`, `DESIGN.md`, `references/Accueil.png`, `references/connexion.png` (non intégrées dans le rendu final).
- **Créer / mettre à jour** :
  - `index.html`
  - `connexion.html`
  - `verification.html`
  - `vote.html`
  - `waiting.html` (nouveau)
  - `resultat.html`
  - `admin.html` (nouveau)
  - `style.css`
  - `script.js`
  - `supabase/schema.sql`
  - `supabase/functions/admin-actions/index.ts`
  - `SUPABASE_SETUP.md`
  - `IMPLEMENTATION_PLAN.md` (ce fichier)

---

## Points à valider avant implémentation
1. Confirmer que `PRD.md` et `DESIGN.md` sont intégrés (contenu actuel validé).
2. Valider que le parcours inclut bien Vérification entre Connexion et Vote.
3. Confirmer que les six candidats sont exacts et que le diagramme totalise 100 %.
4. Vérifier que le mode Code ne doit pas intégrer `references/Accueil.png` ou `references/connexion.png` dans le rendu final.
5. Vérifier que le mode Code doit créer `verification.html`, `waiting.html`, `admin.html` et mettre à jour `vote.html` et `resultat.html` selon le parcours avec Supabase.

## Ordre des changements
1. `supabase/schema.sql` — schéma de base de données (tables, RLS, fonctions).
2. `supabase/functions/admin-actions/index.ts` — Edge Function d'administration.
3. `index.html` — mise à jour du parcours et mention du prototype.
4. `connexion.html` — fidélité visuelle à `connexion.png` sans intégration de la capture.
5. `verification.html` — création des deux étapes de vérification.
6. `vote.html` — bulletin du scrutin (6 candidats) + vote réel via RPC.
7. `waiting.html` — écran d'attente avec polling.
8. `resultat.html` — résultats réels depuis la DB + diagramme dynamique.
9. `admin.html` — interface d'administration.
10. `style.css` — styles cohérents, responsive, diagramme dynamique.
11. `script.js` — interactions réelles Supabase (auth, vote, résultats, polling, admin).
12. `SUPABASE_SETUP.md` — instructions de configuration.
13. `IMPLEMENTATION_PLAN.md` — mise à jour (ce fichier).
14. Tests : parcours complet, mobile, confidentialité (aucune capture intégrée, données personnelles non stockées).
