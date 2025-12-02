import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Lot, UpdateLotInput } from '../types';

export function useLotDetail(id: string) {
  const [lot, setLot] = useState<Lot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getLotById(id);
      setLot(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const updateLot = async (input: UpdateLotInput) => {
    try {
      const updated = await api.updateLot(id, input);
      setLot(updated);
    } catch (err) {
      throw err;
    }
  };

  const deleteLot = async () => {
    try {
      await api.deleteLot(id);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return { lot, loading, error, updateLot, deleteLot, refetch: fetchData };
}
