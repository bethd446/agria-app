import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, typography, layout } from '../theme';

export default function VetScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={[styles.iconCircle, { backgroundColor: colors.accent }]}>
          <Text style={styles.headerIcon}>🩺</Text>
        </View>
        <View>
          <Text style={styles.title}>Vétérinaire IA</Text>
          <Text style={styles.subtitle}>Assistant santé animale</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={[styles.placeholderCard, layout.shadows.card]}>
          <Text style={styles.placeholderIcon}>🤖</Text>
          <Text style={styles.placeholderTitle}>Bientôt disponible</Text>
          <Text style={styles.placeholderText}>
            Le vétérinaire IA vous aidera à diagnostiquer et traiter vos animaux
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.base,
    paddingTop: layout.spacing.xl,
    paddingBottom: layout.spacing.lg,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: layout.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: layout.spacing.base,
    opacity: 0.95,
  },
  headerIcon: {
    fontSize: 28,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: layout.spacing.xs / 2,
  },
  subtitle: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: layout.spacing.base,
    justifyContent: 'center',
  },
  placeholderCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: layout.cardRadius,
    padding: layout.spacing['2xl'],
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: layout.spacing.lg,
  },
  placeholderTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: layout.spacing.md,
  },
  placeholderText: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
