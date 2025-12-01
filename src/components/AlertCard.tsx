import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, layout } from '../theme';

interface AlertCardProps {
  title: string;
  text: string;
  badgeLabel?: string;
}

export function AlertCard({ title, text, badgeLabel }: AlertCardProps) {
  return (
    <View style={[styles.card, layout.shadows.card]}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
      {badgeLabel && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeLabel}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundCard,
    borderRadius: layout.cardRadius,
    padding: layout.spacing.base,
    borderWidth: 1,
    borderColor: colors.accent,
    marginBottom: layout.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: layout.spacing.xs,
  },
  text: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  badge: {
    backgroundColor: colors.accent,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.xs,
    borderRadius: layout.borderRadius.full,
    marginLeft: layout.spacing.sm,
  },
  badgeText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.white,
  },
});
