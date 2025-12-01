import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sprout } from 'lucide-react-native';
import { colors, typography, layout } from '../theme';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export function Logo({ size = 'medium', showText = true }: LogoProps) {
  const sizes = {
    small: { icon: 20, text: 16, container: 32 },
    medium: { icon: 28, text: 24, container: 48 },
    large: { icon: 36, text: 32, container: 64 },
  };

  const currentSize = sizes[size];

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, {
        width: currentSize.container,
        height: currentSize.container
      }]}>
        <View style={styles.iconBackground} />
        <Sprout
          size={currentSize.icon}
          color={colors.white}
          strokeWidth={2.5}
        />
      </View>
      {showText && (
        <Text style={[styles.text, { fontSize: currentSize.text }]}>
          AGRIA
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.md,
  },
  iconContainer: {
    borderRadius: layout.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  iconBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    opacity: 1,
  },
  text: {
    fontWeight: typography.weights.bold,
    color: colors.primary,
    letterSpacing: 2,
  },
});
