# DESIGN.md — Vote Citoyen

**Références visuelles :** `references/Accueil.png`, `references/connexion.png`

**Élection présidentielle fictive** — **Vérification fictive** — **Résultats différés et fictifs**

## 1. Intention visuelle

Concevoir une interface de service numérique civique français qui inspire la confiance grâce à sa clarté, sa sobriété et sa facilité d'utilisation, dans le cadre d'une **élection présidentielle fictive**.

Le rendu doit ressembler à un produit web professionnel réellement conçu pour les citoyens, et non à une page générée automatiquement à partir de composants génériques.

Le design doit être inspiré des bonnes pratiques ergonomiques des services publics, tout en possédant une identité originale. Il doit refléter le caractère **fictif** du prototype : **élection présidentielle fictive**, **vérification fictive**, **résultats différés et fictifs**.

## 2. Principes graphiques

### Couleurs

- Bleu foncé pour les titres et les éléments structurants.
- Bleu moyen pour les actions principales.
- Fond blanc ou gris très clair.
- Gris neutres pour les bordures et les textes secondaires.
- Rouge utilisé avec parcimonie pour les avertissements.
- Vert réservé aux confirmations fictives.

Éviter les dégradés décoratifs, les couleurs saturées, les ombres excessives et les effets de verre.

### Typographie

- Police sans-serif moderne et très lisible.
- Hiérarchie claire entre titre, sous-titre, texte et libellés.
- Titres suffisamment grands, sans être surdimensionnés.
- Paragraphes courts et espacements réguliers.

### Mise en page

- En-tête sobre avec le nom « Vote Citoyen ».
- Navigation simple.
- Contenu centré dans une largeur confortable.
- Cartes et formulaires alignés sur une grille cohérente.
- Espaces généreux entre les sections.
- Pied de page discret avec la mention du prototype.
- Adaptation automatique aux écrans mobiles.

## 3. Éléments d'interface

Créer des composants cohérents pour :

- En-tête et navigation.
- Boutons principaux et secondaires.
- Champs de formulaire.
- Indicateur de progression.
- Cartes d'information.
- Messages de validation.
- Étapes de **vérification fictive**.
- Choix de bulletin (élection présidentielle fictive).
- Graphiques de **résultats différés et fictifs**.
- Liens de retour et de réinitialisation.

Tous les éléments doivent avoir des états visuels cohérents : normal, survol, sélectionné et désactivé lorsque nécessaire.

## 4. Écrans

### Accueil

Une introduction claire, un titre principal, une courte explication de la réforme et un bouton d'action dominant. L'accueil doit présenter le contexte de l'**élection présidentielle fictive** et s'inspirer de la structure de `references/Accueil.png` (en-tête, navigation, mise en page) sans reproduire de logos ou contenus protégés.

### Connexion

Un formulaire compact, rassurant et minimaliste, avec des champs bien identifiés et une option de démonstration clairement visible. Le formulaire doit refléter le caractère **fictif** du prototype et s'inspirer de la structure de `references/connexion.png` sans reproduire de logos ou contenus protégés.

### Vérification

Une étape dédiée, visuellement crédible, montrant deux contrôles distincts :

1. **Lecture simulée d'une carte d'identité** — panneau ou écran dédié, avec indicateur de progression, état en attente, puis état réussi déclenché par un bouton de simulation. Libellé expliquant clairement qu'il s'agit d'une démonstration fictive.
2. **Vérification simulée du visage** — panneau ou écran dédié, avec indicateur de progression, état en attente, puis état réussi déclenché par un bouton de simulation. Libellé expliquant clairement qu'il s'agit d'une démonstration fictive.

Chaque contrôle doit avoir son propre écran ou panneau, un indicateur de progression, un état en attente, puis un état réussi déclenché par un bouton de simulation. Aucune caméra n'est activée, aucun document d'identité réel n'est demandé, aucun document n'est téléversé, aucune donnée biométrique n'est collectée et aucune information personnelle n'est stockée. La simulation doit être facile à passer via des boutons de démonstration.

### Bulletin

Une question clairement mise en évidence (élection présidentielle fictive), des options faciles à distinguer et un bouton de continuation. Le bulletin présente six candidats, chacun présenté comme une personne candidate à la présidence (et non comme un parti politique) : Monsieur Delarbre, Jérémy, Nahil, Léa Moreau, Thomas Vidal et Camille Bernard. Le choix reste illustratif et n'est pas comptabilisé. Une confirmation de vote simulée doit être visible. Tous les noms et résultats sont fictifs ; une mention visible doit le préciser. Les résultats affichés sont **différés et fictifs**, indépendants du choix de l'utilisateur.

### Résultats

Après le bulletin, présenter un écran de confirmation, puis un écran de résultats verrouillés pendant un délai purement simulé. Un bouton visible doit permettre de passer immédiatement ce délai pour la présentation scolaire.

Les résultats sont fixes, non calculés à partir d'un vrai vote, et totalisent exactement 100 % :

- Monsieur Delarbre : 40 %
- Michael Jackson : 20 %
- Nahil : 12 %
- Jérémy : 12 %
- Michou : 9 %
- Alexandre : 7 %

Après le délai simulé (ou l'action permettant de le passer), afficher une page de résultats claire avec les six candidats, leurs pourcentages et un diagramme statique lisible représentant exactement ces pourcentages et totalisant 100 %. Une mention visible doit indiquer que les données sont fictives et différées.

## 5. Références visuelles

Les captures `references/Accueil.png` et `references/connexion.png` servent de guide pour :

- La structure de l'en-tête et la navigation horizontale (`Accueil.png`).
- Les proportions des formulaires et la présentation des champs (`connexion.png`).
- Les espacements, la hiérarchie typographique et les styles de boutons.
- La présentation des étapes et des confirmations.

Ne pas reproduire à l'identique les logos, les éléments de marque, les textes ou les identifiants institutionnels d'un site existant (ex. France Titres, FranceConnect). Les références servent uniquement d'inspiration structurelle et ergonomique.

## 6. À éviter

- Design générique de tableau de bord SaaS.
- Dégradés violets ou bleus décoratifs.
- Multiplication des cartes et des encadrés.
- Icônes emoji à la place de véritables icônes d'interface.
- Animations inutiles.
- Texte fictif en anglais.
- Boutons décoratifs sans action.
- Logos ou mentions pouvant faire croire à un site officiel.
- Résultats électoraux présentés comme réels (les résultats doivent être clairement **différés et fictifs**).
- Vérification présentée comme une authentification réelle (elle doit rester **fictive** et illustratrice).
- Texte ou visuels suggérant une élection présidentielle réelle au lieu d'une **élection présidentielle fictive**.

## 7. Priorités

1. Cohérence visuelle entre les écrans et avec les **références visuelles** (`references/Accueil.png`, `references/connexion.png`).
2. Lisibilité et simplicité du parcours.
3. Ressemblance avec les conventions ergonomiques des services publics.
4. Clarté du caractère **fictif** : **élection présidentielle fictive**, **vérification fictive**, **résultats différés et fictifs**.
5. Qualité du rendu sur ordinateur.
6. Adaptation mobile.
7. Finitions et animations discrètes.