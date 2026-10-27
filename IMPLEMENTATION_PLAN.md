# IMPLEMENTATION_PLAN.md — Vote Citoyen

## 1. Écrans requis et parcours de navigation
- **Accueil** (`index.html`) : présentation du projet Vote Citoyen, contexte de l'**élection présidentielle fictive**, bouton pour commencer. Fidélité visuelle à `references/Accueil.png` (structure header, navigation horizontale, hiérarchie typographique) sans intégration des captures dans la page finale.
- **Connexion** (`connexion.html`) : formulaire simulé (email + mot de passe) inspiré de `references/connexion.png` (proportions, champs, bouton principal, liens secondaires) ; bouton "Se connecter". Aucune capture intégrée.
- **Vérification** (`verification.html`) : deux étapes simulées distinctes — lecture simulée d'une carte d'identité et vérification simulée du visage — avec indicateur de progression, état en attente, bouton de simulation et libellé "démonstration fictive".
- **Bulletin** (`vote.html`) : bulletin de l'**élection présidentielle fictive** avec six candidats (Monsieur Delarbre, Jérémy, Nahil, Léa Moreau, Thomas Vidal, Camille Bernard). Choix illustratif, non comptabilisé. Confirmation du bulletin visible.
- **Résultats** (`resultat.html`) : confirmation du bulletin, écran d'attente des résultats avec délai simulé, bouton visible pour passer le délai, puis affichage des résultats fixes avec diagramme statique totalisant 100 %.

Parcours : Accueil → Connexion → Vérification → Bulletin → Résultats. Navigation simple via liens `<a>` dans un header commun.

## 2. Structure et rôle des fichiers
- `index.html` : structure sémantique (header, main, footer), liens vers CSS/JS, navigation, mention visible « Prototype scolaire — démonstration fictive — Élection présidentielle fictive ».
- `connexion.html` : formulaire de connexion simulé, fidèle à `references/connexion.png` sans intégration de la capture.
- `verification.html` : deux panneaux/écrans de vérification fictive (identité + visage), indicateurs de progression, boutons de simulation.
- `vote.html` : bulletin avec six candidats, confirmation simulée, mention des données fictives.
- `resultat.html` : confirmation du vote, délai simulé avec bouton pour le passer, résultats fixes et diagramme statique (100 % total).
- `style.css` : styles globaux, variables de couleur (identité Vote Citoyen), mise en page responsive, composants réutilisables, diagramme statique lisible.
- `script.js` : gestion des interactions simulées (navigation, validation formulaire, simulation vérification, confirmation bulletin, passage du délai, affichage résultat fixe), aucun stockage persistant.

## 3. Composants visuels réutilisables et identité
- **Header** : logo Vote Citoyen (texte stylisé ou SVG simple), navigation (Accueil, Connexion, Vérification, Bulletin, Résultats), langue FR.
- **Carte de vote** : composant réutilisable pour chaque candidat (nom, présentation, bouton sélection).
- **Indicateur de progression** : pour les étapes de vérification fictive.
- **Bouton primaire** : style cohérent (couleur identitaire, hover, focus visible).
- **Diagramme statique** : représentation visuelle des résultats fixes totalisant 100 %.
- **Identité originale** : palette sobre (bleu profond, blanc, gris clair), typographie sans-serif, icônes simples. Pas de copie du design France Titres au-delà de l'inspiration structurelle. Aucune capture de référence intégrée dans le rendu final.

## 4. Utilisation des références
- `references/Accueil.png` : inspiration pour la structure du header, la navigation horizontale et la mise en page d'accueil. Non intégrée dans la page finale.
- `references/connexion.png` : inspiration pour le formulaire de connexion (champs email/mot de passe, bouton principal, liens secondaires). Non intégrée dans la page finale.

Aucune copie directe des logos ou contenus protégés. Les références servent uniquement de guide visuel et ne sont pas affichées dans le site.

## 5. Interactions simulées et résultats fixes
- **Connexion** : validation côté client (champs non vides) ; si OK, redirection vers `verification.html` via `window.location`.
- **Vérification** : deux contrôles distincts (identité et visage), chacun avec indicateur de progression, état en attente, bouton de simulation déclenchant l'état réussi. Libellés expliquant le caractère fictif.
- **Bulletin** : sélection d'un candidat parmi six ; validation (un choix sélectionné) ; confirmation du bulletin visible ; redirection vers `resultat.html`.
- **Résultats** : confirmation du bulletin affichée ; écran d'attente avec délai purement simulé ; bouton visible pour passer immédiatement le délai ; affichage des résultats fixes non calculés, totalisant exactement 100 % :
  - Monsieur Delarbre : 40 %
  - Michael Jackson : 20 %
  - Nahil : 12 %
  - Jérémy : 12 %
  - Michou : 9 %
  - Alexandre : 7 %
- Aucun backend, aucune API, aucun `localStorage`/`sessionStorage`, aucun cookie de session. Aucune donnée personnelle collectée ou stockée.

## 6. Responsive design, accessibilité et tests manuels
- **Responsive** : media queries pour mobile (< 768px) et tablette ; navigation en colonne sur petit écran ; tailles de texte fluides (`rem`) ; diagramme statique lisible sur mobile.
- **Accessibilité** : attributs `alt` sur images, `label` associés aux inputs, `aria-label` sur boutons, contraste suffisant, focus visible (`outline`), navigation au clavier.
- **Tests manuels** : vérifier le parcours complet (Accueil → Connexion → Vérification → Bulletin → Résultats) sur Chrome/Firefox (desktop + mobile simulé), vérifier la navigation clavier, vérifier que le résultat est toujours le même (fixe), vérifier que les captures de référence ne sont pas intégrées dans la page finale, vérifier la mention du prototype et le caractère fictif de l'élection.

## 7. Compatibilité hébergement statique gratuit
- Projet 100% statique : HTML, CSS, JS uniquement.
- Aucun serveur requis ; compatible GitHub Pages, Netlify, Vercel, ou tout hébergeur statique.
- Pas de dépendances externes (pas de CDN obligatoire, pas de build).

## 8. Fichiers à créer ou conserver
- **Conserver** : `PRD.md`, `DESIGN.md`, `references/Accueil.png`, `references/connexion.png` (non intégrées dans le rendu final).
- **Créer / mettre à jour** :
  - `index.html`
  - `connexion.html`
  - `verification.html` (nouveau)
  - `vote.html`
  - `resultat.html`
  - `style.css`
  - `script.js`
  - `IMPLEMENTATION_PLAN.md` (ce fichier)

Aucun autre fichier (pas de `package.json`, pas de framework, pas de dossier `node_modules`).

---

## Points à valider avant implémentation
1. Confirmer que `PRD.md` et `DESIGN.md` sont intégrés (contenu actuel validé).
2. Valider que le parcours inclut bien Vérification entre Connexion et Bulletin.
3. Confirmer que les six candidats et leurs pourcentages fixes sont exacts et que le diagramme totalise 100 %.
4. Vérifier que le mode Code ne doit pas intégrer `references/Accueil.png` ou `references/connexion.png` dans le rendu final.
5. Vérifier que le mode Code doit créer `verification.html` et mettre à jour `vote.html` et `resultat.html` selon le parcours présidentiel fictif.

## Ordre des changements
1. `index.html` — mise à jour du parcours et mention du prototype.
2. `connexion.html` — fidélité visuelle à `connexion.png` sans intégration de la capture.
3. `verification.html` — création des deux étapes de vérification simulée.
4. `vote.html` — bulletin présidentiel fictif (6 candidats) + confirmation.
5. `resultat.html` — confirmation, délai simulé, bouton pour passer le délai, résultats fixes + diagramme 100 %.
6. `style.css` — styles cohérents, responsive, diagramme statique.
7. `script.js` — interactions simulées, navigation, simulation vérification, passage du délai.
8. `IMPLEMENTATION_PLAN.md` — mise à jour (ce fichier).
9. Tests : parcours complet, mobile, confidentialité (aucune capture intégrée, aucune donnée collectée).
