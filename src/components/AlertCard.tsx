import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, layout } from '../theme';

interface AlertCardProps {
  title: string;
  description: string;
}

export function AlertCard({ title, description }: AlertCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: layout.radius.lg,
    padding: layout.spacing.md,
    backgroundColor: colors.cardBackground,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.border.alert,
    marginBottom: layout.spacing.md,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    marginBottom: layout.spacing.xs,
  },
  description: {
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
  },
});
