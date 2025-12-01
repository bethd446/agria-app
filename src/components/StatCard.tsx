import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, layout } from '../theme';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  hint?: string;
  iconColor?: string;
}

export function StatCard({ icon, label, value, hint, iconColor = colors.primary }: StatCardProps) {
  return (
    <View style={[styles.card, layout.shadows.card]}>
      <View style={[styles.iconCircle, { backgroundColor: iconColor }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.backgroundCard,
    borderRadius: layout.cardRadius,
    padding: layout.spacing.base,
    minHeight: 140,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: layout.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: layout.spacing.md,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: layout.spacing.xs,
  },
  value: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: layout.spacing.xs,
  },
  hint: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
  },
});
