# DESIGN.md — Vote Citoyen

**Références visuelles :** `references/Accueil.png`, `references/connexion.png`

**Prototype scolaire** — **Vérification d'identité** — **Résultats différés réels**

## 1. Intention visuelle

Concevoir une interface de service numérique civique français qui inspire la confiance grâce à sa clarté, sa sobriété et sa facilité d'utilisation, dans le cadre d'un **prototype scolaire**.

Le rendu doit ressembler à un produit web professionnel réellement conçu pour les citoyens, et non à une page générée automatiquement à partir de composants génériques.

Le design doit être inspiré des bonnes pratiques ergonomiques des services publics, tout en possédant une identité originale. Il reflète le caractère **prototype scolaire** du projet : **vérification d'identité**, **résultats différés réels**.

## 2. Principes graphiques

### Couleurs

- Bleu foncé pour les titres et les éléments structurants.
- Bleu moyen pour les actions principales.
- Fond blanc ou gris très clair.
- Gris neutres pour les bordures et les textes secondaires.
- Rouge utilisé avec parcimonie pour les avertissements.
- Vert réservé aux confirmations.

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
- Étapes de **vérification d'identité**.
- Choix de bulletin (scrutin Vote Citoyen).
- Graphiques de **résultats différés réels**.
- Liens de retour et de réinitialisation.

Tous les éléments doivent avoir des états visuels cohérents : normal, survol, sélectionné et désactivé lorsque nécessaire.

## 4. Écrans

### Accueil

Une introduction claire, un titre principal, une courte explication de la réforme et un bouton d'action dominant. L'accueil doit présenter le contexte du **prototype scolaire** et s'inspirer de la structure de `references/Accueil.png` (en-tête, navigation, mise en page) sans reproduire de logos ou contenus protégés.

### Connexion

Un formulaire compact, rassurant et minimaliste, avec des champs bien identifiés. Le formulaire doit refléter le caractère **prototype scolaire** du projet et s'inspirer de la structure de `references/connexion.png` sans reproduire de logos ou contenus protégés.

### Vérification

Une étape dédiée, visuellement crédible, montrant deux contrôles distincts :

1. **Lecture de la carte d'identité** — panneau ou écran dédié, avec indicateur de progression, état en attente, puis état réussi déclenché par un bouton de simulation. Libellé expliquant clairement qu'il s'agit d'un prototype scolaire.
2. **Vérification du visage** — panneau ou écran dédié, avec indicateur de progression, état en attente, puis état réussi déclenché par un bouton de simulation. Libellé expliquant clairement qu'il s'agit d'un prototype scolaire.

Chaque contrôle doit avoir son propre écran ou panneau, un indicateur de progression, un état en attente, puis un état réussi déclenché par un bouton de simulation. Aucune caméra n'est activée, aucun document d'identité réel n'est demandé, aucun document n'est téléversé, aucune donnée biométrique n'est collectée et aucune information personnelle n'est stockée. La simulation doit être facile à passer via des boutons de démonstration.

### Bulletin
 
 Une question clairement mise en évidence (scrutin citoyen), des options faciles à distinguer et un bouton de continuation. Le bulletin présente quatre propositions de réformes et le vote blanc : Vote numérique, Vote par préférence, Vote par courrier, Rendre le vote blanc significatif. Le choix est enregistré dans Supabase. Une confirmation de vote doit être visible. Les résultats affichés sont **différés et réels**, calculés à partir des votes enregistrés.

### Résultats

Après le bulletin, présenter un écran de confirmation, puis un écran d'attente verrouillé jusqu'à la fermeture du scrutin par l'administrateur. Un bouton visible permet de passer immédiatement à l'attente pour la présentation scolaire.

Les résultats sont calculés en temps réel à partir des votes enregistrés dans Supabase et totalisent exactement 100 %.

Après la fermeture du scrutin, afficher une page de résultats claire avec les quatre réformes + vote blanc, leurs pourcentages et un diagramme lisible représentant exactement ces pourcentages et totalisant 100 %.

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
- Résultats électoraux présentés comme fictifs (les résultats sont **réels et calculés** depuis Supabase).
- Vérification présentée comme une authentification réelle (elle reste **illustratrice** dans le prototype).
- Texte ou visuels suggérant une élection présidentielle réelle au lieu d'un **prototype scolaire**.

## 7. Priorités

1. Cohérence visuelle entre les écrans et avec les **références visuelles** (`references/Accueil.png`, `references/connexion.png`).
2. Lisibilité et simplicité du parcours.
3. Ressemblance avec les conventions ergonomiques des services publics.
4. Clarté du caractère **prototype scolaire** : **vérification d'identité**, **résultats différés réels**.
5. Qualité du rendu sur ordinateur.
6. Adaptation mobile.
7. Finitions et animations discrètes.