import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FicheCard } from '../components/FicheCard';
import { useFiches } from '../hooks/useFiches';
import { colors, typography, layout } from '../theme';
import type { Species } from '../types';

export default function FichesScreen() {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | undefined>(undefined);
  const { data: fiches, loading, error } = useFiches(selectedSpecies);

  const filters: Array<{ label: string; value: Species | undefined }> = [
    { label: 'Toutes', value: undefined },
    { label: '🐷 Porcs', value: 'porc' },
    { label: '🐔 Volailles', value: 'volaille' },
    { label: '🐄 Bovins', value: 'bovin' },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>📋 Fiches techniques</Text>
        <Text style={styles.subtitle}>Guides pratiques d'élevage</Text>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.label}
              style={[
                styles.filterChip,
                selectedSpecies === filter.value && styles.filterChipActive,
              ]}
              onPress={() => setSelectedSpecies(filter.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedSpecies === filter.value && styles.filterChipTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        {fiches.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>Aucune fiche disponible</Text>
            <Text style={styles.emptyHint}>Essayez un autre filtre</Text>
          </View>
        ) : (
          fiches.map((fiche) => (
            <FicheCard key={fiche.id} fiche={fiche} onPress={() => {}} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.text.secondary,
    marginTop: layout.spacing.md,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: layout.spacing.xl,
    paddingBottom: layout.spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
  },
  subtitle: {
    color: colors.text.secondary,
    marginTop: layout.spacing.xs,
    fontSize: typography.sizes.base,
  },
  filtersContainer: {
    paddingVertical: layout.spacing.md,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.border.default,
  },
  filters: {
    paddingHorizontal: layout.spacing.xl,
    gap: layout.spacing.sm,
  },
  filterChip: {
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.sm,
    borderRadius: layout.radius.xl,
    backgroundColor: colors.cardBackground,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.border.default,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  filterChipTextActive: {
    color: colors.white,
    fontWeight: typography.weights.semibold,
  },
  content: {
    padding: layout.spacing.xl,
    paddingBottom: 40,
  },
  errorBanner: {
    backgroundColor: colors.status.error,
    padding: layout.spacing.md,
    borderRadius: layout.radius.md,
    marginBottom: layout.spacing.lg,
  },
  errorText: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: layout.spacing['4xl'],
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: layout.spacing.lg,
  },
  emptyText: {
    color: colors.text.primary,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    marginBottom: layout.spacing.sm,
  },
  emptyHint: {
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
    textAlign: 'center',
  },
});
