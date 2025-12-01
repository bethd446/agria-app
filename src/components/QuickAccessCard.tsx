import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { colors, typography, layout } from '../theme';

interface QuickAccessCardProps {
  icon?: string;
  IconComponent?: LucideIcon;
  label: string;
  onPress: () => void;
  iconColor?: string;
}

export function QuickAccessCard({ icon, IconComponent, label, onPress, iconColor = colors.primary }: QuickAccessCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, layout.shadows.button]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {IconComponent ? (
          <IconComponent size={32} color={iconColor} strokeWidth={2.5} />
        ) : (
          <Text style={styles.icon}>{icon}</Text>
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.backgroundCard,
    borderRadius: layout.cardRadius,
    paddingVertical: layout.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainer: {
    marginBottom: layout.spacing.md,
  },
  icon: {
    fontSize: 36,
    marginBottom: layout.spacing.md,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
});
