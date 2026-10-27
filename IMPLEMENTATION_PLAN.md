# IMPLEMENTATION_PLAN.md — Vote Citoyen

## 1. Écrans requis et parcours de navigation
- **Accueil** (`index.html`) : page d'entrée avec présentation du projet Vote Citoyen, navigation vers Connexion et Vote.
- **Connexion** (`connexion.html`) : formulaire simulé (email + mot de passe) inspiré de la référence `connexion.png` ; bouton "Se connecter".
- **Vote** (`vote.html`) : interface de vote simulée avec choix fixes (ex. 3 options) ; bouton "Valider".
- **Résultat** (`resultat.html`) : affichage d'un résultat fixe prédéfini après validation du vote.

Parcours : Accueil → Connexion → Vote → Résultat. Navigation simple via liens `<a>` dans un header commun.

## 2. Structure et rôle des fichiers
- `index.html` : structure sémantique (header, main, footer), liens vers CSS/JS, navigation.
- `style.css` : styles globaux, variables de couleur (identité Vote Citoyen), mise en page responsive, composants réutilisables.
- `script.js` : gestion des interactions simulées (navigation, validation formulaire, affichage résultat fixe), aucun stockage persistant.

## 3. Composants visuels réutilisables et identité
- **Header** : logo Vote Citoyen (texte stylisé ou SVG simple), navigation (Accueil, Connexion, Vote), langue FR.
- **Carte de vote** : composant réutilisable pour chaque option (titre, description, bouton sélection).
- **Bouton primaire** : style cohérent (couleur identitaire, hover, focus visible).
- **Identité originale** : palette sobre (bleu profond, blanc, gris clair), typographie sans-serif, icônes simples (pas d'images externes sauf références locales si nécessaire). Pas de copie du design France Titres au-delà de l'inspiration structurelle.

## 4. Utilisation des références
- `references/Accueil.png` : inspiration pour la structure du header, la navigation horizontale et la mise en page d'accueil (titre + contenu + image illustrative optionnelle).
- `references/connexion.png` : inspiration pour le formulaire de connexion (champs email/mot de passe, bouton principal, liens secondaires).

Aucune copie directe des logos ou contenus protégés. Les références servent uniquement de guide visuel.

## 5. Interactions simulées et résultats fixes
- **Connexion** : validation côté client (champs non vides) ; si OK, redirection vers `vote.html` via `window.location`.
- **Vote** : sélection d'une option (radio ou bouton) ; validation (une option sélectionnée) ; redirection vers `resultat.html`.
- **Résultat** : affichage d'un texte fixe prédéfini (ex. "Résultat simulé : Option A — 62%") sans calcul réel ni persistance.
- Aucun backend, aucune API, aucun `localStorage`/`sessionStorage`, aucun cookie de session.

## 6. Responsive design, accessibilité et tests manuels
- **Responsive** : media queries pour mobile (< 768px) et tablette ; navigation en colonne sur petit écran ; tailles de texte fluides (`rem`).
- **Accessibilité** : attributs `alt` sur images, `label` associés aux inputs, `aria-label` sur boutons, contraste suffisant, focus visible (`outline`), navigation au clavier.
- **Tests manuels** : vérifier le parcours complet sur Chrome/Firefox (desktop + mobile simulé), vérifier la navigation clavier, vérifier que le résultat est toujours le même (fixe).

## 7. Compatibilité hébergement statique gratuit
- Projet 100% statique : HTML, CSS, JS uniquement.
- Aucun serveur requis ; compatible GitHub Pages, Netlify, Vercel, ou tout hébergeur statique.
- Pas de dépendances externes (pas de CDN obligatoire, pas de build).

## 8. Fichiers à créer ou conserver
- **Conserver** : `PRD.md`, `DESIGN.md`, `references/Accueil.png`, `references/connexion.png`.
- **Créer** :
  - `index.html`
  - `connexion.html`
  - `vote.html`
  - `resultat.html`
  - `style.css`
  - `script.js`
  - `IMPLEMENTATION_PLAN.md` (ce fichier)

Aucun autre fichier (pas de `package.json`, pas de framework, pas de dossier `node_modules`).

---

## Points à valider avant implémentation
1. Confirmer que `PRD.md` et `DESIGN.md` sont bien vides ou s'il existe un contenu caché à intégrer.
2. Valider le nombre exact d'options de vote et le texte du résultat fixe souhaité.
3. Confirmer si une image illustrative est requise sur l'accueil (utilisation de `references/Accueil.png` comme source ou création d'un visuel original).
4. Vérifier que le mode Code doit créer uniquement ces 6 fichiers HTML/CSS/JS + le plan, sans modifier `references/`.
