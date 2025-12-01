import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, typography, layout } from '../theme';

interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: layout.spacing.base,
  },
});
