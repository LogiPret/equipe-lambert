# Scripts Vidéo - Guide d'utilisation

## Vue d'ensemble

Le système de gestion des scripts vidéo a été créé pour répondre à l'issue #10 "Rédaction des 31 scripts vidéo". Cette fonctionnalité ajoute une nouvelle collection Payload CMS dédiée à la gestion des scripts vidéo immobiliers.

## Structure des scripts

Chaque script vidéo contient les éléments suivants :

### 1. **Titre** 
Le titre accrocheur de la vidéo (ex: "Les secrets d'un premier achat immobilier réussi")

### 2. **Hook**
L'accroche d'ouverture pour captiver l'audience (ex: "Votre premier appartement vous attend... mais connaissez-vous VRAIMENT ces 3 erreurs qui ruinent 80% des premières acquisitions ?")

### 3. **Idée générale de l'histoire/du contenu**
Description détaillée du contenu de la vidéo, incluant le fil narratif et les points clés à aborder

### 4. **CTA (Call To Action)**
L'appel à l'action pour engager l'audience (ex: "Téléchargez gratuitement notre checklist complète du primo-accédant !")

### 5. **Mise en scène**
Instructions techniques pour la réalisation : décor, ton, outils visuels, style de montage

### 6. **Numéro du script**
Numérotation de 1 à 31 pour l'organisation

## Scripts créés

31 scripts complets ont été créés couvrant tous les aspects de l'immobilier :

1. **Scripts Achat/Vente** : Premier achat, négociation, vente rapide, estimation
2. **Scripts Investissement** : Locatif, SCPI, viager, location saisonnière  
3. **Scripts Fiscalité** : Défiscalisation, plus-values, SCI, succession
4. **Scripts Financement** : Crédit immobilier, assurance emprunteur, prêt in fine
5. **Scripts Spécialisés** : Copropriété, rénovation, marchés émergents, PropTech

## Accès via l'interface d'administration

1. Se connecter à l'admin Payload CMS (`/admin`)
2. Naviguer vers la collection "Scripts Vidéo" 
3. Consulter, modifier ou créer de nouveaux scripts
4. Utiliser les filtres par numéro de script pour navigation rapide

## Utilisation pour le seeding

Les scripts sont automatiquement créés lors du seeding de la base de données :

```bash
# Via l'interface admin
Cliquer sur "Seed Database" dans le dashboard admin

# Ou via la commande
npm run payload seed
```

## Structure technique

- **Collection** : `video-scripts` 
- **Fichier** : `/src/collections/VideoScripts/index.ts`
- **Données** : `/src/endpoints/seed/video-scripts-simple.ts`
- **Types** : Générés automatiquement dans `payload-types.ts`

## Fonctionnalités disponibles

- ✅ Contrôle d'accès (authentification requise pour création/modification)
- ✅ Système de slug automatique
- ✅ Versioning et brouillons
- ✅ Interface d'administration intuitive
- ✅ Export/import de données
- ✅ API REST et GraphQL automatiques

## Extension future

Le système peut facilement être étendu avec :
- Catégorisation des scripts (débutant, intermédiaire, expert)
- Système de tags et mots-clés
- Intégration avec calendrier de publication
- Métriques de performance des vidéos
- Templates de scripts personnalisables