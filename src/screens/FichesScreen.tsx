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
import { SectionHeader } from '../components/SectionHeader';
import { useFiches } from '../hooks/useFiches';
import { colors, typography, layout } from '../theme';
import type { Species } from '../types';

export default function FichesScreen() {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | undefined>(undefined);
  const { data: fiches, loading, error } = useFiches(selectedSpecies);

  const filters: Array<{ label: string; value: Species | undefined; emoji: string }> = [
    { label: 'Toutes', value: undefined, emoji: '📋' },
    { label: 'Porcs', value: 'porc', emoji: '🐷' },
    { label: 'Volailles', value: 'volaille', emoji: '🐔' },
    { label: 'Bovins', value: 'bovin', emoji: '🐄' },
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
        <View style={[styles.iconCircle, { backgroundColor: colors.accent }]}>
          <Text style={styles.headerIcon}>📋</Text>
        </View>
        <View>
          <Text style={styles.title}>Fiches techniques</Text>
          <Text style={styles.subtitle}>Guides pratiques d'élevage</Text>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.label}
              style={[
                styles.filterChip,
                selectedSpecies === filter.value && styles.filterChipActive,
              ]}
              onPress={() => setSelectedSpecies(filter.value)}
              activeOpacity={0.8}
            >
              <Text style={styles.filterEmoji}>{filter.emoji}</Text>
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

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
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
          <>
            <SectionHeader title={`${fiches.length} fiche(s)`} />
            {fiches.map((fiche) => (
              <FicheCard key={fiche.id} fiche={fiche} onPress={() => {}} />
            ))}
          </>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textSecondary,
    marginTop: layout.spacing.md,
    fontSize: typography.body.fontSize,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.base,
    paddingTop: layout.spacing.xl,
    paddingBottom: layout.spacing.lg,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: layout.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: layout.spacing.base,
    opacity: 0.95,
  },
  headerIcon: {
    fontSize: 28,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: layout.spacing.xs / 2,
  },
  subtitle: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
  filtersContainer: {
    paddingVertical: layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  filters: {
    paddingHorizontal: layout.spacing.base,
    gap: layout.spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xs,
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.md,
    borderRadius: layout.borderRadius.full,
    backgroundColor: colors.backgroundCard,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterChipActive: {
    backgroundColor: 'rgba(74, 124, 89, 0.2)',
    borderColor: colors.primary,
  },
  filterEmoji: {
    fontSize: 16,
  },
  filterChipText: {
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: layout.spacing.base,
    paddingTop: layout.spacing.lg,
    paddingBottom: layout.spacing['2xl'],
  },
  errorBanner: {
    backgroundColor: colors.backgroundCard,
    padding: layout.spacing.lg,
    borderRadius: layout.cardRadius,
    marginBottom: layout.spacing.base,
    borderLeftWidth: 4,
    borderLeftColor: colors.status.error,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  errorText: {
    color: colors.status.error,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: layout.spacing['3xl'],
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: layout.spacing.lg,
    opacity: 0.5,
  },
  emptyText: {
    color: colors.textPrimary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginBottom: layout.spacing.sm,
  },
  emptyHint: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: layout.spacing.xl,
  },
});
