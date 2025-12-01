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
    <TouchableOpacity
      style={[styles.card, layout.shadows.button]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: layout.cardRadius,
    paddingVertical: layout.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  icon: {
    fontSize: 32,
    marginBottom: layout.spacing.sm,
  },
  label: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
    color: colors.white,
  },
});
