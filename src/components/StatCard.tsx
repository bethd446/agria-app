import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, layout } from '../theme';

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
}

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: layout.radius.lg,
    padding: layout.spacing.md,
    backgroundColor: colors.cardBackground,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.border.default,
  },
  label: {
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
    marginBottom: layout.spacing.xs,
  },
  value: {
    color: colors.text.primary,
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
  },
  hint: {
    color: colors.text.tertiary,
    fontSize: typography.sizes.xs,
    marginTop: layout.spacing.xs,
  },
});
