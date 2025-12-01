import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography, layout } from '../theme';

interface QuickAccessCardProps {
  icon: string;
  label: string;
  onPress: () => void;
}

export function QuickAccessCard({ icon, label, onPress }: QuickAccessCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.radius.lg,
    padding: layout.spacing.md,
    backgroundColor: colors.primary,
    minHeight: 90,
  },
  icon: {
    fontSize: typography.sizes['3xl'],
    marginBottom: layout.spacing.xs,
  },
  label: {
    color: colors.text.primary,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
});
