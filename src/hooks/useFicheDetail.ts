import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Fiche } from '../types';

export function useFicheDetail(id: string) {
  const [data, setData] = useState<Fiche | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const fiche = await api.getFicheById(id);
      setData(fiche);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return { data, loading, error, refetch: fetchData };
}
