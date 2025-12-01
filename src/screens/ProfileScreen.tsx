import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MapPin, Calendar, TrendingUp, Settings } from 'lucide-react-native';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { colors, typography, layout } from '../theme';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <BackgroundPattern variant="subtle" />
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>K</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.name}>Kouadio</Text>
          <Text style={styles.subtitle}>Éleveur</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.infoCard, layout.shadows.card]}>
          <Text style={styles.cardTitle}>Informations</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <MapPin size={16} color={colors.textSecondary} strokeWidth={2} />
              <Text style={styles.infoLabel}>Localisation</Text>
            </View>
            <Text style={styles.infoValue}>Côte d'Ivoire</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Calendar size={16} color={colors.textSecondary} strokeWidth={2} />
              <Text style={styles.infoLabel}>Membre depuis</Text>
            </View>
            <Text style={styles.infoValue}>Décembre 2025</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <TrendingUp size={16} color={colors.textSecondary} strokeWidth={2} />
              <Text style={styles.infoLabel}>Total animaux</Text>
            </View>
            <Text style={styles.infoValue}>127</Text>
          </View>
        </View>

        <View style={[styles.placeholderCard, layout.shadows.card]}>
          <View style={styles.placeholderIconContainer}>
            <Settings size={40} color={colors.primary} strokeWidth={2} />
          </View>
          <Text style={styles.placeholderTitle}>Profil complet bientôt</Text>
          <Text style={styles.placeholderText}>
            Paramètres, statistiques et historique à venir
          </Text>
        </View>
      </ScrollView>
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
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: layout.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: layout.spacing.base,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  headerText: {
    flex: 1,
  },
  name: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: layout.spacing.xs / 2,
  },
  subtitle: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: layout.spacing.base,
    paddingBottom: layout.spacing['2xl'],
  },
  infoCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: layout.cardRadius,
    padding: layout.spacing.lg,
    marginBottom: layout.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: layout.spacing.base,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm,
  },
  infoLabel: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  placeholderCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: layout.cardRadius,
    padding: layout.spacing['2xl'],
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  placeholderIconContainer: {
    marginBottom: layout.spacing.base,
  },
  placeholderTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: layout.spacing.sm,
  },
  placeholderText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
