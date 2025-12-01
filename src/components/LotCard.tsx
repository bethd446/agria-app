import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, layout } from '../theme';
import type { Lot } from '../types';

interface LotCardProps {
  lot: Lot;
  onPress: () => void;
}

export function LotCard({ lot, onPress }: LotCardProps) {
  const mortalityRate =
    lot.initial_count > 0
      ? ((lot.mortality_count / lot.initial_count) * 100).toFixed(1)
      : '0.0';

  const speciesEmoji = {
    porc: '🐷',
    volaille: '🐔',
    bovin: '🐄',
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.emoji}>{speciesEmoji[lot.species]}</Text>
          <View>
            <Text style={styles.name}>{lot.name}</Text>
            <Text style={styles.species}>
              {lot.species.charAt(0).toUpperCase() + lot.species.slice(1)}
            </Text>
          </View>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{lot.current_count}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Mortalité</Text>
          <Text style={styles.statValue}>{mortalityRate}%</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Poids moy.</Text>
          <Text style={styles.statValue}>{lot.avg_weight} kg</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Marge</Text>
          <Text style={[styles.statValue, styles.marginValue]}>
            {lot.margin_percent > 0 ? '+' : ''}
            {lot.margin_percent.toFixed(0)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: layout.radius.lg,
    padding: layout.spacing.lg,
    backgroundColor: colors.cardBackground,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.border.default,
    marginBottom: layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.md,
  },
  emoji: {
    fontSize: typography.sizes['3xl'],
  },
  name: {
    color: colors.text.primary,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },
  species: {
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
    marginTop: layout.spacing.xs / 2,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
    borderRadius: layout.radius.md,
  },
  badgeText: {
    color: colors.text.primary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: layout.spacing.md,
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.border.default,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    color: colors.text.secondary,
    fontSize: typography.sizes.xs,
    marginBottom: layout.spacing.xs / 2,
  },
  statValue: {
    color: colors.text.primary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  marginValue: {
    color: colors.status.success,
  },
});
