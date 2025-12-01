import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, layout } from '../theme';
import type { Fiche } from '../types';

interface FicheCardProps {
  fiche: Fiche;
  onPress: () => void;
}

export function FicheCard({ fiche, onPress }: FicheCardProps) {
  const speciesEmoji = {
    porc: '🐷',
    volaille: '🐔',
    bovin: '🐄',
  };

  return (
    <TouchableOpacity
      style={[styles.card, layout.shadows.card]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={[styles.iconCircle, { backgroundColor: colors.primary }]}>
          <Text style={styles.icon}>{speciesEmoji[fiche.species]}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{fiche.title}</Text>
          <Text style={styles.species}>
            {fiche.species.charAt(0).toUpperCase() + fiche.species.slice(1)}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.rating}>⭐ {fiche.rating.toFixed(1)}</Text>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundCard,
    borderRadius: layout.cardRadius,
    padding: layout.spacing.lg,
    marginBottom: layout.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.sm,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: layout.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: layout.spacing.md,
    opacity: 0.9,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: layout.spacing.xs / 2,
  },
  species: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: layout.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  rating: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  arrow: {
    fontSize: 20,
    color: colors.textMuted,
  },
});
