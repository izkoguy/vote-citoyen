# PRD — Vote Citoyen

**Version :** 2.1
**Type :** Prototype scolaire front-end
**Contexte :** Devoir d'EMC — Réformer la démocratie en France — Élection présidentielle fictive

**Références visuelles :** `references/Accueil.png`, `references/connexion.png` (accessibles et examinées ; utilisées uniquement comme guide de conception, jamais intégrées dans le site final)

**Identité :** Vote Citoyen — identité originale, sans logos institutionnels ni apparence trompeuse de site officiel. Mention visible obligatoire : « Prototype scolaire — démonstration fictive ».

## 1. Vision du produit

Créer une maquette web navigable illustrant une plateforme fictive de vote à distance pour une **élection présidentielle fictive**. Le prototype doit permettre au professeur et aux élèves de découvrir à quoi pourrait ressembler un parcours de vote numérique moderne.

L'objectif est de présenter une proposition politique de manière concrète, pas de développer un véritable système électoral. Le parcours inclut une **vérification fictive** de l'identité et de l'éligibilité, et affiche des **résultats différés et fictifs**.

## 2. Objectifs

- Présenter la réforme du vote en ligne dans le cadre d'une **élection présidentielle fictive**.
- Illustrer une connexion et des **vérifications fictives** (identité et éligibilité).
- Montrer un bulletin de vote numérique pour l'élection présidentielle fictive.
- Afficher une page de **résultats différés et fictifs** (données fixes, non liées au vote de l'utilisateur).
- Obtenir une interface visuellement crédible et soignée, inspirée des **références visuelles** (`references/Accueil.png`, `references/connexion.png`).
- Permettre de naviguer facilement entre les écrans pendant une présentation en classe.

## 3. Périmètre fonctionnel

Le prototype comporte cinq écrans principaux pour une **élection présidentielle fictive** :

1. **Accueil :** présentation de Vote Citoyen, contexte de l'élection présidentielle fictive et bouton pour commencer.
2. **Connexion :** formulaire fictif avec possibilité de continuer sans saisir de données réelles.
3. **Vérification :** étapes illustratives de **vérification fictive** (contrôle de l'identité et de l'éligibilité).
4. **Bulletin :** présentation d'une question fictive (élection présidentielle) et de ses choix.
5. **Résultats :** **résultats différés et fictifs** — statistiques fixes préremplies, affichées uniquement lorsqu'on accède à cet écran, sans lien avec le vote de l'utilisateur.

Prévoir également une section informative sur les avantages et les limites du vote en ligne.

### B. Élection présidentielle fictive

Le bulletin présente une **élection présidentielle simulée** avec six candidats, présentés chacun comme une personne candidate à la présidence (et non comme un parti politique) :

- Monsieur Delarbre
- Jérémy
- Nahil
- Léa Moreau
- Thomas Vidal
- Camille Bernard

Le bulletin doit permettre de visualiser le choix d'un candidat et une confirmation de vote simulée, sans enregistrer de véritable vote. Tous les noms et résultats sont fictifs ; une mention visible doit le préciser.

### C. Vérification fictive

Créer une étape dédiée, visuellement crédible, montrant deux contrôles distincts :

1. **Lecture simulée d'une carte d'identité** — panneau ou écran dédié, avec indicateur de progression, état en attente, puis état réussi déclenché par un bouton de simulation.
2. **Vérification simulée du visage** — panneau ou écran dédié, avec indicateur de progression, état en attente, puis état réussi déclenché par un bouton de simulation.

Chaque contrôle doit avoir son propre écran ou panneau, un indicateur de progression, un état en attente, puis un état réussi déclenché par un bouton de simulation. Des libellés doivent expliquer clairement qu'il s'agit d'une démonstration fictive.

Aucune caméra n'est activée, aucun document d'identité réel n'est demandé, aucun document n'est téléversé, aucune donnée biométrique n'est collectée et aucune information personnelle n'est stockée. La simulation doit être facile à passer via des boutons de démonstration.

### D. Résultats différés et fictifs

Après le bulletin, présenter un écran de confirmation, puis un écran de résultats verrouillés pendant un délai purement simulé. Un bouton visible doit permettre de passer immédiatement ce délai pour la présentation scolaire.

Les résultats sont fixes, non calculés à partir d'un vrai vote, et totalisent exactement 100 % :

- Monsieur Delarbre : 40 %
- Michael Jackson : 20 %
- Nahil : 12 %
- Jérémy : 12 %
- Michou : 9 %
- Alexandre : 7 %

Après le délai simulé (ou l'action permettant de le passer), afficher une page de résultats claire avec les six candidats, leurs pourcentages et un diagramme statique lisible représentant exactement ces pourcentages et totalisant 100 %.

Les **références visuelles** (`references/Accueil.png`, `references/connexion.png`) guident la structure de l'en-tête, la navigation, la présentation des formulaires et la hiérarchie typographique.

## 4. Comportement

- Les boutons servent uniquement à naviguer entre les écrans.
- Aucun vote n'est réellement enregistré.
- Les choix du bulletin ne modifient jamais les **résultats différés et fictifs**.
- Les résultats sont fixes, fictifs et différés (non calculés en temps réel).
- Les **vérifications sont purement fictives** et visuelles (pas d'authentification réelle).
- Un bouton permet de revenir à l'accueil et de recommencer la démonstration.
- Les étapes peuvent être passées afin de faciliter la présentation.
- Aucun compte utilisateur n'est créé.
- L'interface s'inspire des **références visuelles** (`references/Accueil.png`, `references/connexion.png`) sans reproduire de logos ou contenus protégés.

## 5. Contraintes techniques

- HTML, CSS et JavaScript natifs.
- Aucun back-end, aucune base de données et aucune API.
- Aucun stockage persistant nécessaire.
- Fonctionnement local dans un navigateur moderne.
- Trois fichiers principaux : `index.html`, `style.css` et `script.js`.
- Aucun document d'identité réel ni donnée personnelle à saisir.
- Interface responsive sur ordinateur, tablette et smartphone.

## 6. Direction visuelle

Créer une identité originale de service civique numérique français, inspirée des conventions ergonomiques des services publics, sans reproduire une identité gouvernementale officielle.

L'interface doit être sobre, accessible, professionnelle, lisible et cohérente d'un écran à l'autre.

Les captures de référence et le document `DESIGN.md` précisent la direction artistique.

## 7. Critères d'acceptation

- Les cinq écrans sont présents.
- La navigation fonctionne intégralement.
- La **vérification fictive** peut être passée.
- Les **résultats différés et fictifs** restent identiques à chaque visite.
- Aucun vote n'est comptabilisé.
- Aucune donnée n'est envoyée ni enregistrée.
- Le prototype fonctionne localement.
- La mention « Prototype scolaire — démonstration fictive — **Élection présidentielle fictive** » est visible.
- L'interface est utilisable sur ordinateur et smartphone.
- Les **références visuelles** (`references/Accueil.png`, `references/connexion.png`) sont utilisées comme guide sans reproduction directe.

## 8. Livrables

- `index.html`
- `style.css`
- `script.js`
- `PRD.md`
- `DESIGN.md`
- Dossier `references/` contenant les captures de référence éventuelles.