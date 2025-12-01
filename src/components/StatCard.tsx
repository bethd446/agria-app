import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { colors, typography, layout } from '../theme';

interface StatCardProps {
  icon?: string;
  IconComponent?: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
  iconColor?: string;
}

export function StatCard({ icon, IconComponent, label, value, hint, iconColor = colors.primary }: StatCardProps) {
  return (
    <View style={[styles.card, layout.shadows.card]}>
      <View style={[styles.iconCircle, { backgroundColor: `${iconColor}26` }]}>
        {IconComponent ? (
          <IconComponent size={24} color={iconColor} strokeWidth={2.5} />
        ) : (
          <Text style={styles.icon}>{icon}</Text>
        )}
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
    padding: layout.spacing.lg,
    minHeight: 140,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: layout.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: layout.spacing.base,
  },
  icon: {
    fontSize: 24,
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
