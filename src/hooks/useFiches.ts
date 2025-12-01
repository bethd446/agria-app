import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Fiche, Species } from '../types';

export function useFiches(species?: Species) {
  const [data, setData] = useState<Fiche[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const fiches = await api.getFiches(species);
      setData(fiches);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [species]);

  return { data, loading, error, refetch: fetchData };
}
