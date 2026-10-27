# PRD — Vote Citoyen

**Version :** 1.1  
**Type :** Prototype scolaire front-end  
**Contexte :** Devoir d'EMC — Réformer la démocratie en France

## 1. Vision du produit

Créer une maquette web navigable illustrant une plateforme fictive de vote à distance. Le prototype doit permettre au professeur et aux élèves de découvrir à quoi pourrait ressembler un parcours de vote numérique moderne.

L'objectif est de présenter une proposition politique de manière concrète, pas de développer un véritable système électoral.

## 2. Objectifs

- Présenter la réforme du vote en ligne.
- Illustrer une connexion et des vérifications fictives.
- Montrer un bulletin de vote numérique.
- Afficher une page de résultats préremplie avec des données fictives.
- Obtenir une interface visuellement crédible et soignée.
- Permettre de naviguer facilement entre les écrans pendant une présentation en classe.

## 3. Périmètre fonctionnel

Le prototype comporte cinq écrans principaux :

1. **Accueil :** présentation de Vote Citoyen et bouton pour commencer.
2. **Connexion :** formulaire fictif avec possibilité de continuer sans saisir de données réelles.
3. **Vérification :** étapes illustratives de contrôle de l'identité et de l'éligibilité.
4. **Bulletin :** présentation d'une question fictive et de ses choix.
5. **Résultats :** statistiques fixes préremplies, affichées uniquement lorsqu'on accède à cet écran.

Prévoir également une section informative sur les avantages et les limites du vote en ligne.

## 4. Comportement

- Les boutons servent uniquement à naviguer entre les écrans.
- Aucun vote n'est réellement enregistré.
- Les choix du bulletin ne modifient jamais les résultats.
- Les résultats sont fixes et fictifs.
- Les vérifications sont purement visuelles.
- Un bouton permet de revenir à l'accueil et de recommencer la démonstration.
- Les étapes peuvent être passées afin de faciliter la présentation.
- Aucun compte utilisateur n'est créé.

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
- La vérification peut être passée.
- Les résultats restent identiques à chaque visite.
- Aucun vote n'est comptabilisé.
- Aucune donnée n'est envoyée ni enregistrée.
- Le prototype fonctionne localement.
- La mention « Prototype scolaire — démonstration fictive » est visible.
- L'interface est utilisable sur ordinateur et smartphone.

## 8. Livrables

- `index.html`
- `style.css`
- `script.js`
- `PRD.md`
- `DESIGN.md`
- Dossier `references/` contenant les captures de référence éventuelles.