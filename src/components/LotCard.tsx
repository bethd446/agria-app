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
    <TouchableOpacity
      style={[styles.card, layout.shadows.card]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconCircle, { backgroundColor: colors.primary }]}>
            <Text style={styles.emoji}>{speciesEmoji[lot.species]}</Text>
          </View>
          <View style={styles.headerText}>
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
          <Text style={[styles.statValue, { color: colors.status.success }]}>
            {lot.margin_percent > 0 ? '+' : ''}
            {lot.margin_percent.toFixed(0)}%
          </Text>
        </View>
      </View>

      <View style={styles.arrow}>
        <Text style={styles.arrowText}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundCard,
    borderRadius: layout.cardRadius,
    padding: layout.spacing.base,
    marginBottom: layout.spacing.md,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.base,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: layout.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: layout.spacing.md,
  },
  emoji: {
    fontSize: 22,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: layout.spacing.xs / 2,
  },
  species: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
    borderRadius: layout.borderRadius.full,
  },
  badgeText: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: layout.spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: layout.spacing.xs / 2,
  },
  statValue: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  arrow: {
    position: 'absolute',
    right: layout.spacing.base,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  arrowText: {
    fontSize: 24,
    color: colors.textMuted,
  },
});
