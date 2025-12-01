import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme';

interface BackgroundPatternProps {
  variant?: 'dots' | 'gradient' | 'subtle';
}

export function BackgroundPattern({ variant = 'subtle' }: BackgroundPatternProps) {
  if (variant === 'gradient') {
    return (
      <View style={styles.gradientContainer}>
        <View style={[styles.gradientCircle, styles.gradientCircle1]} />
        <View style={[styles.gradientCircle, styles.gradientCircle2]} />
        <View style={[styles.gradientCircle, styles.gradientCircle3]} />
      </View>
    );
  }

  if (variant === 'subtle') {
    return (
      <View style={styles.subtleContainer}>
        <View style={styles.subtleOverlay} />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  gradientCircle: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.03,
  },
  gradientCircle1: {
    width: 400,
    height: 400,
    backgroundColor: colors.primary,
    top: -200,
    right: -100,
  },
  gradientCircle2: {
    width: 300,
    height: 300,
    backgroundColor: colors.accent,
    bottom: -150,
    left: -50,
  },
  gradientCircle3: {
    width: 250,
    height: 250,
    backgroundColor: colors.primaryLight,
    top: '40%',
    left: '50%',
  },
  subtleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  subtleOverlay: {
    flex: 1,
    backgroundColor: 'rgba(74, 124, 89, 0.02)',
  },
});
