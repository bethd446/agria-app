import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { VetConsultation } from '../types';

export function useVetAI() {
  const [consultations, setConsultations] = useState<VetConsultation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getVetConsultations();
      setConsultations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const askQuestion = async (question: string, species: string) => {
    try {
      setError(null);
      const newConsultation = await api.askVet(question, species);
      setConsultations((prev) => [newConsultation, ...prev]);
      return newConsultation;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      throw err;
    }
  };

  return { consultations, loading, error, askQuestion, refetch: fetchConsultations };
}
