import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MapPin, Calendar, TrendingUp, Settings, LogOut } from 'lucide-react-native';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { useAuth } from '../contexts/AuthContext';
import { colors, typography, layout } from '../theme';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <BackgroundPattern variant="subtle" />
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase() || 'A'}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.name}>{user?.name || 'Utilisateur'}</Text>
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
              <Text style={styles.infoLabel}>Téléphone</Text>
            </View>
            <Text style={styles.infoValue}>{user?.phone || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <MapPin size={16} color={colors.textSecondary} strokeWidth={2} />
              <Text style={styles.infoLabel}>Région</Text>
            </View>
            <Text style={styles.infoValue}>{user?.region || 'Non renseignée'}</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Calendar size={16} color={colors.textSecondary} strokeWidth={2} />
              <Text style={styles.infoLabel}>Membre depuis</Text>
            </View>
            <Text style={styles.infoValue}>
              {user?.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : '-'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.signOutButton, layout.shadows.button]}
          onPress={handleSignOut}
          activeOpacity={0.8}
        >
          <LogOut size={20} color={colors.white} strokeWidth={2} />
          <Text style={styles.signOutButtonText}>Se déconnecter</Text>
        </TouchableOpacity>
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
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: layout.spacing.sm,
    backgroundColor: colors.status.error,
    paddingVertical: layout.spacing.lg,
    borderRadius: layout.borderRadius.md,
    marginTop: layout.spacing.base,
  },
  signOutButtonText: {
    color: colors.white,
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
  },
});
