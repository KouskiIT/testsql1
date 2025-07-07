
# 📦 Système de Gestion d'Inventaire

Une application web complète de gestion d'inventaire avec interface moderne, fonctionnalités avancées et optimisation mobile.

## ✨ Fonctionnalités Principales

### 🔍 **Gestion d'Inventaire Complète**
- Ajout, modification et suppression d'articles
- Codes-barres uniques et numéros d'inventaire
- Organisation par département et bureau
- Gestion des conditions et catégories

### 📱 **Scanner de Codes-Barres Avancé**
- Scanner caméra en temps réel
- Saisie manuelle de codes-barres
- Scanner par lots pour traitement multiple
- Mode de recherche continue

### 📊 **Dashboard et Rapports**
- Statistiques instantanées avec Quick Insights
- Graphiques interactifs et métriques
- Export PDF personnalisé "Fiche Bureau"
- Rapports détaillés par département

### 📁 **Import/Export de Données**
- Import Excel avec validation intelligente
- Export Excel complet avec formatage
- Génération PDF avec mise en page personnalisée
- Sauvegarde automatique quotidienne

### 🔍 **Recherche et Filtrage Avancés**
- Recherche textuelle sur tous les champs
- Filtres par département, catégorie, condition
- Opérateurs de recherche flexibles
- Historique des recherches non trouvées

### 📱 **Optimisation Mobile Complète**
- Interface responsive et tactile
- Mode hors ligne avec synchronisation
- Scanner mobile rapide
- Commandes vocales intégrées

### 🛡️ **Sécurité et Fiabilité**
- Authentification utilisateur sécurisée
- Limitations de taux API
- Journal d'audit complet
- Sauvegardes automatisées

### 🎨 **Interface Utilisateur Moderne**
- Design moderne avec thèmes clair/sombre
- Tour guidé interactif détaillé
- Notifications contextuelles
- Navigation intuitive

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le développement rapide
- **TanStack Query** pour la gestion d'état
- **Shadcn/ui** + **Tailwind CSS** pour l'interface
- **React Hook Form** + **Zod** pour les formulaires

### Backend
- **Node.js** + **Express.js**
- **TypeScript** pour la sécurité des types
- **Drizzle ORM** pour la base de données
- **PostgreSQL** pour la persistance des données

### Fonctionnalités Avancées
- **Scanner de codes-barres** avec API caméra
- **Traitement Excel** avec XLSX
- **Génération PDF** avec jsPDF
- **Interface vocale** avec Web Speech API
- **Mode hors ligne** avec IndexedDB

## 🚀 Installation et Déploiement

### Prérequis
- Node.js 18+ 
- PostgreSQL
- Navigateur moderne avec support caméra

### Installation Locale
```bash
# Cloner le repository
git clone https://github.com/votre-username/inventory-management
cd inventory-management

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos configurations

# Pousser le schéma de base de données
npm run db:push

# Démarrer en mode développement
npm run dev
```

### Variables d'Environnement Requises
```env
DATABASE_URL=postgresql://username:password@host:port/database
SESSION_SECRET=your-super-secret-session-key-32-chars-min
NODE_ENV=production
```

### Déploiement Recommandé

#### Option 1: Vercel (Recommandé)
1. Connecter votre repository GitHub à Vercel
2. Ajouter les variables d'environnement
3. Configurer une base de données PostgreSQL (PlanetScale)
4. Déployer automatiquement

#### Option 2: Railway
1. Connecter votre repository à Railway
2. Ajouter le service PostgreSQL
3. Configurer les variables d'environnement
4. Déployer

#### Option 3: Render
1. Utiliser le fichier `render.yaml` inclus
2. Base de données PostgreSQL automatiquement configurée
3. Variables d'environnement générées automatiquement

## 📖 Guide d'Utilisation

### 1. **Tour Guidé**
- Cliquer sur "Tour guidé" pour une introduction complète
- 12 étapes interactives couvrant toutes les fonctionnalités
- Raccourcis clavier intégrés (Échap, Espace, flèches)

### 2. **Gestion d'Articles**
- **Ajouter**: Bouton "Nouveau Article" avec formulaire complet
- **Modifier**: Clic sur un article pour édition rapide
- **Supprimer**: Suppression avec possibilité de restauration
- **Scanner**: Utiliser le scanner pour recherche rapide

### 3. **Import/Export**
- **Excel Import**: Glisser-déposer ou sélectionner fichier
- **Excel Export**: Export complet avec formatage personnalisé
- **PDF**: Génération "Fiche Bureau" avec données filtrées

### 4. **Mobile**
- **Scanner Rapide**: `/mobile-scan` pour interface tactile
- **Mode Hors Ligne**: Synchronisation automatique
- **Commandes Vocales**: Support français intégré

## 🔧 Scripts Disponibles

```bash
npm run dev        # Développement avec hot reload
npm run build      # Build de production
npm start          # Démarrer en production
npm run db:push    # Pousser le schéma de base de données
npm run check      # Vérification TypeScript
```

## 📊 Architecture

```
├── client/           # Application React frontend
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   ├── hooks/         # Hooks personnalisés
│   │   ├── pages/         # Pages de l'application
│   │   └── lib/           # Utilitaires et configuration
├── server/           # API Express backend
│   ├── middleware/        # Middleware personnalisé
│   ├── services/          # Services métier
│   └── routes.ts          # Routes API
├── shared/           # Types et schémas partagés
└── uploads/          # Stockage de fichiers
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème:
1. Consulter la documentation dans `/docs`
2. Utiliser le tour guidé intégré
3. Vérifier les issues GitHub existantes
4. Créer une nouvelle issue si nécessaire

## 🔄 Changelog

Voir `replit.md` pour l'historique détaillé des changements et améliorations.
