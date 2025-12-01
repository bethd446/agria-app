import { supabase } from '../lib/supabase';
import type {
  User,
  Lot,
  Fiche,
  Notification,
  VetConsultation,
  DashboardStats,
  CreateLotInput,
  UpdateLotInput,
  Species,
} from '../types';

export const api = {
  async getDashboardStats(): Promise<DashboardStats> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: lots, error: lotsError } = await supabase
      .from('lots')
      .select('*')
      .eq('user_id', user.id);

    if (lotsError) throw lotsError;

    const { data: notifications, error: notifError } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_read', false)
      .order('scheduled_date', { ascending: true })
      .limit(5);

    if (notifError) throw notifError;

    const porcs = lots?.filter((l) => l.species === 'porc') || [];
    const volailles = lots?.filter((l) => l.species === 'volaille') || [];
    const bovins = lots?.filter((l) => l.species === 'bovin') || [];

    const totalCount = (arr: any[]) =>
      arr.reduce((sum, l) => sum + (l.current_count || 0), 0);
    const avgMortalityRate = (arr: any[]) => {
      if (arr.length === 0) return 0;
      const total = arr.reduce((sum, l) => {
        const rate =
          l.initial_count > 0 ? (l.mortality_count / l.initial_count) * 100 : 0;
        return sum + rate;
      }, 0);
      return total / arr.length;
    };
    const avgProduction = (arr: any[]) => {
      if (arr.length === 0) return 0;
      const total = arr.reduce((sum, l) => sum + (l.production_value || 0), 0);
      return total / arr.length;
    };

    const totalMargin = lots?.reduce((sum, l) => sum + (l.margin_percent || 0), 0) || 0;
    const avgMargin = lots && lots.length > 0 ? totalMargin / lots.length : 0;

    return {
      porcs: {
        count: totalCount(porcs),
        mortality_rate: avgMortalityRate(porcs),
      },
      volailles: {
        count: totalCount(volailles),
        production_rate: avgProduction(volailles),
      },
      bovins: {
        count: totalCount(bovins),
        daily_production: avgProduction(bovins),
      },
      margin: avgMargin,
      alerts: notifications as Notification[],
    };
  },

  async getLots(species?: Species): Promise<Lot[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    let query = supabase
      .from('lots')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (species) {
      query = query.eq('species', species);
    }

    const { data, error } = await query;
    if (error) throw error;

    return data as Lot[];
  },

  async getLotById(id: string): Promise<Lot> {
    const { data, error } = await supabase
      .from('lots')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error('Lot not found');

    return data as Lot;
  },

  async createLot(input: CreateLotInput): Promise<Lot> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('lots')
      .insert({
        user_id: user.id,
        ...input,
        current_count: input.initial_count,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Lot;
  },

  async updateLot(id: string, input: UpdateLotInput): Promise<Lot> {
    const { data, error } = await supabase
      .from('lots')
      .update({
        ...input,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Lot;
  },

  async deleteLot(id: string): Promise<void> {
    const { error } = await supabase.from('lots').delete().eq('id', id);
    if (error) throw error;
  },

  async getFiches(species?: Species): Promise<Fiche[]> {
    let query = supabase
      .from('fiches')
      .select('*')
      .order('rating', { ascending: false });

    if (species) {
      query = query.eq('species', species);
    }

    const { data, error } = await query;
    if (error) throw error;

    return data as Fiche[];
  },

  async getFicheById(id: string): Promise<Fiche> {
    const { data, error } = await supabase
      .from('fiches')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error('Fiche not found');

    return data as Fiche;
  },

  async getNotifications(): Promise<Notification[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('scheduled_date', { ascending: false });

    if (error) throw error;
    return data as Notification[];
  },

  async markNotificationRead(id: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);

    if (error) throw error;
  },

  async askVet(question: string, species: string): Promise<VetConsultation> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const answer = `Réponse simulée pour la question: "${question}". En production, ceci sera connecté à une IA vétérinaire.`;

    const { data, error } = await supabase
      .from('vet_consultations')
      .insert({
        user_id: user.id,
        question,
        answer,
        species,
      })
      .select()
      .single();

    if (error) throw error;
    return data as VetConsultation;
  },

  async getVetConsultations(): Promise<VetConsultation[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('vet_consultations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as VetConsultation[];
  },
};
