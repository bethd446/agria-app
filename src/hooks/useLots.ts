import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Lot, Species, CreateLotInput, UpdateLotInput } from '../types';

export function useLots(species?: Species) {
  const [data, setData] = useState<Lot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const lots = await api.getLots(species);
      setData(lots);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [species]);

  const createLot = async (input: CreateLotInput) => {
    try {
      await api.createLot(input);
      await fetchData();
    } catch (err) {
      throw err;
    }
  };

  const updateLot = async (id: string, input: UpdateLotInput) => {
    try {
      await api.updateLot(id, input);
      await fetchData();
    } catch (err) {
      throw err;
    }
  };

  const deleteLot = async (id: string) => {
    try {
      await api.deleteLot(id);
      await fetchData();
    } catch (err) {
      throw err;
    }
  };

  return { data, loading, error, refetch: fetchData, createLot, updateLot, deleteLot };
}
