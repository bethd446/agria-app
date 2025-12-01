export type Species = 'porc' | 'volaille' | 'bovin';

export type NotificationType =
  | 'vaccination'
  | 'controle'
  | 'alerte_mortalite'
  | 'rappel_alimentation'
  | 'visite_veterinaire'
  | 'autre';

export interface User {
  id: string;
  phone: string;
  name: string;
  region: string;
  species_types: Species[];
  created_at: string;
  updated_at: string;
}

export interface Lot {
  id: string;
  user_id: string;
  species: Species;
  name: string;
  start_date: string;
  current_count: number;
  initial_count: number;
  mortality_count: number;
  avg_weight: number;
  avg_daily_gain: number;
  production_value: number;
  feed_cost: number;
  vet_cost: number;
  other_cost: number;
  estimated_revenue: number;
  margin_percent: number;
  created_at: string;
  updated_at: string;
}

export interface Fiche {
  id: string;
  species: Species;
  title: string;
  housing: string;
  feeding: string;
  health: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  message: string;
  lot_id?: string;
  scheduled_date: string;
  is_read: boolean;
  created_at: string;
}

export interface VetConsultation {
  id: string;
  user_id: string;
  question: string;
  answer: string;
  species: string;
  created_at: string;
}

export interface DashboardStats {
  porcs: {
    count: number;
    mortality_rate: number;
  };
  volailles: {
    count: number;
    production_rate: number;
  };
  bovins: {
    count: number;
    daily_production: number;
  };
  margin: number;
  alerts: Notification[];
}

export interface CreateLotInput {
  species: Species;
  name: string;
  start_date: string;
  initial_count: number;
}

export interface UpdateLotInput {
  current_count?: number;
  mortality_count?: number;
  avg_weight?: number;
  avg_daily_gain?: number;
  production_value?: number;
  feed_cost?: number;
  vet_cost?: number;
  other_cost?: number;
  estimated_revenue?: number;
}

export interface FeedFormulationInput {
  phase: 'demarrage' | 'croissance' | 'finition';
  target_weight: number;
  available_ingredients: string[];
}

export interface FeedFormulationResult {
  ingredients: Array<{
    name: string;
    quantity: number;
    unit: string;
  }>;
  total_cost: number;
  nutritional_values: {
    protein: number;
    energy: number;
    calcium: number;
  };
}
