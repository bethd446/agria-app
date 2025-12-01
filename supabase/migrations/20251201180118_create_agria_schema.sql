/*
  # Create AGRIA Database Schema

  1. New Tables
    - `users` (éleveurs)
      - `id` (uuid, primary key)
      - `phone` (text, unique) - numéro de téléphone pour auth
      - `name` (text) - nom de l'éleveur
      - `region` (text) - région en Côte d'Ivoire
      - `species_types` (text[]) - types d'élevage (porc, volaille, bovin)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `lots` (lots d'animaux par espèce)
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `species` (text) - porc, volaille, bovin
      - `name` (text) - nom du lot (ex: "Lot Alpha")
      - `start_date` (date) - date de début du lot
      - `current_count` (integer) - nombre actuel d'animaux
      - `initial_count` (integer) - nombre initial
      - `mortality_count` (integer) - nombre de morts
      - `avg_weight` (numeric) - poids moyen en kg
      - `avg_daily_gain` (numeric) - gain moyen quotidien en g
      - `production_value` (numeric) - production (lait L/j, ponte %, etc.)
      - `feed_cost` (numeric) - coût alimentation en FCFA
      - `vet_cost` (numeric) - coût vétérinaire en FCFA
      - `other_cost` (numeric) - autres coûts en FCFA
      - `estimated_revenue` (numeric) - revenu estimé en FCFA
      - `margin_percent` (numeric) - marge en %
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `fiches` (fiches techniques)
      - `id` (uuid, primary key)
      - `species` (text) - porc, volaille, bovin
      - `title` (text) - titre de la fiche
      - `housing` (text) - section logement
      - `feeding` (text) - section alimentation
      - `health` (text) - section santé
      - `rating` (numeric) - note de la fiche (pour l'avenir)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `notifications` (alertes et rappels)
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `type` (text) - vaccination, controle, alerte_mortalite, etc.
      - `message` (text) - contenu de la notification
      - `lot_id` (uuid, nullable, foreign key to lots)
      - `scheduled_date` (timestamptz) - date prévue
      - `is_read` (boolean) - lu/non lu
      - `created_at` (timestamptz)

    - `vet_consultations` (consultations IA vétérinaire)
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `question` (text) - question posée
      - `answer` (text) - réponse de l'IA
      - `species` (text) - espèce concernée
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Users can only see their own lots, notifications, consultations
    - Fiches are public (read-only for all authenticated users)
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text UNIQUE NOT NULL,
  name text NOT NULL,
  region text DEFAULT '',
  species_types text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create lots table
CREATE TABLE IF NOT EXISTS lots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  species text NOT NULL CHECK (species IN ('porc', 'volaille', 'bovin')),
  name text NOT NULL,
  start_date date DEFAULT CURRENT_DATE,
  current_count integer DEFAULT 0,
  initial_count integer DEFAULT 0,
  mortality_count integer DEFAULT 0,
  avg_weight numeric DEFAULT 0,
  avg_daily_gain numeric DEFAULT 0,
  production_value numeric DEFAULT 0,
  feed_cost numeric DEFAULT 0,
  vet_cost numeric DEFAULT 0,
  other_cost numeric DEFAULT 0,
  estimated_revenue numeric DEFAULT 0,
  margin_percent numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE lots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own lots"
  ON lots FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lots"
  ON lots FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lots"
  ON lots FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own lots"
  ON lots FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create fiches table (public read for all authenticated)
CREATE TABLE IF NOT EXISTS fiches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  species text NOT NULL CHECK (species IN ('porc', 'volaille', 'bovin')),
  title text NOT NULL,
  housing text DEFAULT '',
  feeding text DEFAULT '',
  health text DEFAULT '',
  rating numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE fiches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fiches are readable by authenticated users"
  ON fiches FOR SELECT
  TO authenticated
  USING (true);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL,
  message text NOT NULL,
  lot_id uuid REFERENCES lots(id) ON DELETE SET NULL,
  scheduled_date timestamptz DEFAULT now(),
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notifications"
  ON notifications FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create vet_consultations table
CREATE TABLE IF NOT EXISTS vet_consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text DEFAULT '',
  species text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE vet_consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own consultations"
  ON vet_consultations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own consultations"
  ON vet_consultations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_lots_user_id ON lots(user_id);
CREATE INDEX IF NOT EXISTS idx_lots_species ON lots(species);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_fiches_species ON fiches(species);
CREATE INDEX IF NOT EXISTS idx_vet_consultations_user_id ON vet_consultations(user_id);

-- Insert sample fiches techniques
INSERT INTO fiches (species, title, housing, feeding, health, rating) VALUES
  ('porc', 'Guide complet élevage porcs en CI', 
   'Logement ventilé, 2m² par porc adulte. Sol bétonné avec pente 3% pour drainage. Séparation maternité/engraissement.',
   'Phase démarrage (0-2 mois): aliment 18% protéines, 3200 kcal/kg. Phase croissance: 16% protéines. Eau à volonté.',
   'Vaccination obligatoire: peste porcine africaine, rouget. Déparasitage tous les 3 mois. Surveillance quotidienne.',
   4.5),
  ('volaille', 'Élevage pondeuses - Techniques modernes',
   'Densité: 6-8 poules/m². Perchoirs à 40cm du sol. Pondoirs 1 pour 4 poules. Litière de copeaux 10cm.',
   'Aliment ponte 16-17% protéines, 2700 kcal. Calcium coquiller séparé. 120g/jour/poule. Lumière 16h/jour.',
   'Vaccin Newcastle + Gumboro obligatoires. Contrôle coccidiose. Isolement malades immédiat.',
   4.8),
  ('bovin', 'Zébu et métis - Élevage laitier CI',
   'Stabulation libre ou semi-ouverte. Abreuvoir automatique. Aire de traite propre. Séparation veaux.',
   'Fourrage: 50kg/jour herbe fraîche ou foin. Concentré: 1kg pour 3L de lait produit. Minéraux en libre service.',
   'Vaccination fièvre aphteuse annuelle. Déparasitage externe/interne tous les 6 mois. Suivi mammites.',
   4.2);
