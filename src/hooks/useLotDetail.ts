import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Lot } from '../types';

export function useLotDetail(id: string) {
  const [data, setData] = useState<Lot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const lot = await api.getLotById(id);
      setData(lot);
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
