# DESIGN.md — Vote Citoyen

## 1. Intention visuelle

Concevoir une interface de service numérique civique français qui inspire la confiance grâce à sa clarté, sa sobriété et sa facilité d'utilisation.

Le rendu doit ressembler à un produit web professionnel réellement conçu pour les citoyens, et non à une page générée automatiquement à partir de composants génériques.

Le design doit être inspiré des bonnes pratiques ergonomiques des services publics, tout en possédant une identité originale.

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
- Étapes de vérification.
- Choix de bulletin.
- Graphiques de résultats.
- Liens de retour et de réinitialisation.

Tous les éléments doivent avoir des états visuels cohérents : normal, survol, sélectionné et désactivé lorsque nécessaire.

## 4. Écrans

### Accueil

Une introduction claire, un titre principal, une courte explication de la réforme et un bouton d'action dominant.

### Connexion

Un formulaire compact, rassurant et minimaliste, avec des champs bien identifiés et une option de démonstration clairement visible.

### Vérification

Une liste d'étapes avec icônes, indicateurs d'état et textes explicatifs. Le parcours doit sembler fluide sans prétendre effectuer une authentification réelle.

### Bulletin

Une question clairement mise en évidence, des options faciles à distinguer et un bouton de continuation. Le choix reste illustratif et n'est pas comptabilisé.

### Résultats

Un tableau de résultats fixes avec nombres de suffrages fictifs, pourcentages cohérents et représentation graphique lisible. Ajouter une mention visible indiquant que les données sont fictives.

## 5. Références visuelles

Si des captures d'écran sont disponibles dans `references/`, les examiner pour comprendre :

- La structure de l'en-tête.
- Les proportions des formulaires.
- Les espacements.
- Les styles de boutons.
- La hiérarchie typographique.
- La présentation des étapes et des confirmations.

Ne pas reproduire à l'identique les logos, les éléments de marque, les textes ou les identifiants institutionnels d'un site existant.

## 6. À éviter

- Design générique de tableau de bord SaaS.
- Dégradés violets ou bleus décoratifs.
- Multiplication des cartes et des encadrés.
- Icônes emoji à la place de véritables icônes d'interface.
- Animations inutiles.
- Texte fictif en anglais.
- Boutons décoratifs sans action.
- Logos ou mentions pouvant faire croire à un site officiel.
- Résultats électoraux présentés comme réels.

## 7. Priorités

1. Cohérence visuelle entre les écrans.
2. Lisibilité et simplicité du parcours.
3. Ressemblance avec les conventions ergonomiques des services publics.
4. Qualité du rendu sur ordinateur.
5. Adaptation mobile.
6. Finitions et animations discrètes.