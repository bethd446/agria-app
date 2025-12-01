# AGRIA - Application d'Élevage pour la Côte d'Ivoire

AGRIA est une application mobile complète de gestion d'élevage pour les éleveurs en Côte d'Ivoire. Elle permet le suivi multi-espèces (porcs, volailles, bovins) avec des fonctionnalités de gestion de lots, fiches techniques et consultation vétérinaire IA.

## 🚀 Fonctionnalités

### ✅ Implémenté (MVP)

- **Dashboard** : Vue d'ensemble du cheptel avec statistiques en temps réel
- **Gestion des Porcs** : Liste des lots, ajout de nouveaux lots, suivi des performances
- **Fiches Techniques** : Guides pratiques par espèce (logement, alimentation, santé)
- **Navigation** : Bottom tabs pour accès rapide à toutes les sections
- **Base de données** : Supabase avec RLS pour sécurité des données
- **Backend complet** : API REST pour toutes les opérations CRUD

### 🚧 À venir (Phase 2)

- Détail d'un lot avec graphiques de performances
- Écran Vétérinaire IA avec chat en temps réel
- Calculateur de formulation d'aliments
- Profil éleveur avec statistiques globales
- Gestion des volailles et bovins
- Notifications push

## 📁 Structure du Projet

```
agria-app/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── StatCard.tsx
│   │   ├── AlertCard.tsx
│   │   ├── QuickAccessCard.tsx
│   │   ├── LotCard.tsx
│   │   └── FicheCard.tsx
│   ├── hooks/               # Hooks React personnalisés
│   │   ├── useDashboard.ts
│   │   ├── useLots.ts
│   │   ├── useFiches.ts
│   │   ├── useLotDetail.ts
│   │   ├── useFicheDetail.ts
│   │   └── useVetAI.ts
│   ├── lib/                 # Configuration bibliothèques
│   │   └── supabase.ts
│   ├── navigation/          # Configuration navigation
│   │   └── TabNavigator.tsx
│   ├── screens/             # Écrans de l'application
│   │   ├── DashboardScreen.tsx
│   │   ├── PigsScreen.tsx
│   │   ├── FichesScreen.tsx
│   │   ├── VetScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── services/            # Services API
│   │   └── api.ts
│   ├── theme/               # Design system
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── layout.ts
│   │   └── index.ts
│   └── types/               # Types TypeScript
│       └── index.ts
├── App.tsx
├── package.json
└── README.md
```

## 🛠 Technologies Utilisées

- **Frontend** : React Native + Expo
- **Navigation** : React Navigation (Bottom Tabs + Stack)
- **Backend** : Supabase (PostgreSQL + Auth + RLS)
- **Language** : TypeScript
- **Styling** : StyleSheet natif avec design system custom

## ⚙️ Installation

### Prérequis

- Node.js 18+
- npm ou yarn
- Expo CLI

### Étapes

1. **Cloner le repository**
   ```bash
   git clone https://github.com/bethd446/agria-app.git
   cd agria-app
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration Supabase**

   Les variables d'environnement Supabase sont déjà configurées dans `.env` :
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://ubrnpghgxqkvonqakqeq.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=...
   ```

4. **Lancer l'application**
   ```bash
   npm start
   ```

   Puis choisir :
   - `w` pour ouvrir dans le navigateur web
   - `a` pour Android (avec émulateur ou appareil)
   - `i` pour iOS (Mac uniquement)

## 📊 Base de Données

### Schema Supabase

L'application utilise 5 tables principales :

1. **users** : Profils des éleveurs
2. **lots** : Lots d'animaux par espèce
3. **fiches** : Fiches techniques
4. **notifications** : Alertes et rappels
5. **vet_consultations** : Historique consultations IA

### Données de Test

Des données de démo sont automatiquement créées :
- 1 utilisateur test
- 6 lots (3 porcs, 2 volailles, 1 bovin)
- 3 fiches techniques
- 3 notifications

**Note** : Pour utiliser l'app avec ces données, créez d'abord un utilisateur dans Supabase Auth avec l'ID `00000000-0000-0000-0000-000000000001`.

### Sécurité (RLS)

Toutes les tables utilisent Row Level Security :
- Les utilisateurs ne voient que leurs propres données
- Les fiches techniques sont publiques (lecture seule)
- Authentification requise pour toute opération

## 🎨 Design System

### Palette de Couleurs

- **Primaire** : `#2D5A2D` (Vert forêt)
- **Accent** : `#D97706` (Orange terre)
- **Fond** : `#0B1120` (Bleu nuit)
- **Cartes** : `#020617` (Bleu très foncé)

### Typographie

- Titres : 24-28px, Bold
- Sous-titres : 18-20px, Semibold
- Corps : 14-16px, Regular
- Petits : 12-13px, Regular

### Espacements

Système d'espacement de 4px :
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 20px
- 2xl: 24px

## 🔌 API Services

### Endpoints principaux

```typescript
// Dashboard
api.getDashboardStats() → DashboardStats

// Lots
api.getLots(species?) → Lot[]
api.getLotById(id) → Lot
api.createLot(input) → Lot
api.updateLot(id, input) → Lot
api.deleteLot(id) → void

// Fiches
api.getFiches(species?) → Fiche[]
api.getFicheById(id) → Fiche

// Vétérinaire IA
api.askVet(question, species) → VetConsultation
api.getVetConsultations() → VetConsultation[]
```

## 🧪 Tests

Pour tester l'application :

1. Lancez l'app : `npm start`
2. Naviguez dans les différents onglets
3. Testez l'ajout d'un lot dans "Porcs"
4. Filtrez les fiches techniques par espèce
5. Vérifiez que les stats du Dashboard se mettent à jour

## 📝 TODO / Roadmap

### Phase 2 - Détails & Interactions
- [ ] Écran détail d'un lot (graphiques, historique)
- [ ] Mise à jour des données d'un lot (poids, mortalité, coûts)
- [ ] Écran détail d'une fiche technique
- [ ] Graphiques de performances (Chart.js ou Victory Native)

### Phase 3 - IA & Avancé
- [ ] Intégration IA vétérinaire (OpenAI GPT)
- [ ] Chat en temps réel avec historique
- [ ] Calculateur formulation aliments porcs
- [ ] Recommandations personnalisées

### Phase 4 - Profil & Social
- [ ] Écran profil complet avec édition
- [ ] Stats globales sur tous les lots
- [ ] Export des données (PDF/Excel)
- [ ] Partage de fiches entre éleveurs

### Phase 5 - Production
- [ ] Auth complète (OTP par SMS)
- [ ] Notifications push
- [ ] Mode offline avec synchronisation
- [ ] Déploiement App Store / Play Store

## 👨‍💻 Développement

### Structure des Composants

Chaque écran suit ce pattern :
1. Imports et types
2. Hook de données (use...)
3. États locaux
4. Gestion du loading/error
5. Render principal
6. Styles StyleSheet

### Bonnes Pratiques

- Toujours typer avec TypeScript
- Utiliser les hooks custom pour la logique métier
- Extraire les composants réutilisables
- Respecter le design system (colors, typography, layout)
- Gérer les états de chargement et d'erreur

### Ajout d'une Nouvelle Fonctionnalité

1. Créer les types dans `src/types/index.ts`
2. Ajouter les méthodes API dans `src/services/api.ts`
3. Créer un hook custom dans `src/hooks/`
4. Développer l'écran dans `src/screens/`
5. Ajouter la navigation si nécessaire

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📧 Contact

Pour toute question ou suggestion :
- GitHub : [@bethd446](https://github.com/bethd446)
- Email : (à compléter)

---

**AGRIA** - Élevage moderne pour l'Afrique de l'Ouest 🌍🐷🐔🐄
