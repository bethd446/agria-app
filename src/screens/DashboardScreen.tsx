import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatCard } from '../components/StatCard';
import { AlertCard } from '../components/AlertCard';
import { QuickAccessCard } from '../components/QuickAccessCard';
import { SectionHeader } from '../components/SectionHeader';
import { useDashboard } from '../hooks/useDashboard';
import { colors, typography, layout } from '../theme';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { data, loading, error } = useDashboard();

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
          <Text style={styles.errorHint}>Vérifiez votre connexion</Text>
        </View>
      </SafeAreaView>
    );
  }

  const totalAnimals = (data?.porcs.count || 0) + (data?.volailles.count || 0) + (data?.bovins.count || 0);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>AGRIA</Text>
          <Text style={styles.appSubtitle}>Gestion d'Élevage</Text>
        </View>
      </View>

      <View style={styles.heroSection}>
        <View style={styles.heroLeft}>
          <Text style={styles.greeting}>Bonjour, Kouadio</Text>
          <Text style={styles.heroSubtext}>Vue d'ensemble de ton élevage</Text>
        </View>
        <View style={[styles.heroCard, layout.shadows.cardLarge]}>
          <Text style={styles.heroIcon}>🐄</Text>
          <Text style={styles.heroValue}>{totalAnimals}</Text>
          <Text style={styles.heroLabel}>Total cheptel</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <SectionHeader title="Tes élevages" />
          <View style={styles.statsGrid}>
            <StatCard
              icon="🐷"
              label="Porcs"
              value={data?.porcs.count || 0}
              hint={`Mortalité ${data?.porcs.mortality_rate.toFixed(1) || 0}%`}
              iconColor={colors.primary}
            />
            <StatCard
              icon="🐔"
              label="Volailles"
              value={data?.volailles.count || 0}
              hint={`Ponte ${data?.volailles.production_rate.toFixed(0) || 0}%`}
              iconColor={colors.accent}
            />
          </View>
          <View style={styles.statsGrid}>
            <StatCard
              icon="🐄"
              label="Bovins"
              value={data?.bovins.count || 0}
              hint={`Lait ${data?.bovins.daily_production.toFixed(0) || 0} L/j`}
              iconColor={colors.primaryLight}
            />
            <StatCard
              icon="📈"
              label="Marge"
              value={`+${data?.margin.toFixed(0) || 0}%`}
              hint="30 derniers jours"
              iconColor={colors.status.success}
            />
          </View>
        </View>

        {data?.alerts && data.alerts.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Alertes urgentes" />
            {data.alerts.map((alert) => {
              const scheduleDate = new Date(alert.scheduled_date);
              const today = new Date();
              const isToday = scheduleDate.toDateString() === today.toDateString();
              const tomorrow = new Date(today);
              tomorrow.setDate(tomorrow.getDate() + 1);
              const isTomorrow = scheduleDate.toDateString() === tomorrow.toDateString();

              let badgeLabel = '';
              if (isToday) badgeLabel = 'Aujourd\'hui';
              else if (isTomorrow) badgeLabel = 'Demain';

              return (
                <AlertCard
                  key={alert.id}
                  title={alert.message}
                  text={scheduleDate.toLocaleDateString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  badgeLabel={badgeLabel}
                />
              );
            })}
          </View>
        )}

        <View style={styles.section}>
          <SectionHeader title="Accès rapide" />
          <View style={styles.quickAccessGrid}>
            <QuickAccessCard
              icon="🐷"
              label="Porcs"
              onPress={() => navigation.navigate('Pigs' as never)}
            />
            <QuickAccessCard
              icon="🐔"
              label="Volailles"
              onPress={() => navigation.navigate('Pigs' as never)}
            />
            <QuickAccessCard
              icon="🐄"
              label="Bovins"
              onPress={() => navigation.navigate('Pigs' as never)}
            />
          </View>
        </View>

        <View style={styles.bottomSpacer} />
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
    paddingHorizontal: layout.spacing.base,
    paddingTop: layout.spacing.base,
    paddingBottom: layout.spacing.sm,
  },
  appTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textSecondary,
    marginTop: layout.spacing.base,
    fontSize: typography.body.fontSize,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.spacing.xl,
  },
  errorText: {
    color: colors.status.error,
    fontSize: typography.sizes.md,
    textAlign: 'center',
    marginBottom: layout.spacing.sm,
    fontWeight: typography.weights.semibold,
  },
  errorHint: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    textAlign: 'center',
  },
  heroSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.base,
    paddingTop: layout.spacing.xl,
    paddingBottom: layout.spacing.lg,
  },
  heroLeft: {
    flex: 1,
  },
  greeting: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: layout.spacing.xs,
  },
  heroSubtext: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
  heroCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: layout.cardRadius,
    padding: layout.spacing.lg,
    alignItems: 'center',
    minWidth: 110,
    marginLeft: layout.spacing.base,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  heroIcon: {
    fontSize: 28,
    marginBottom: layout.spacing.xs,
  },
  heroValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: layout.spacing.xs / 2,
  },
  heroLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: layout.spacing.base,
    paddingBottom: layout.spacing['2xl'],
  },
  section: {
    marginBottom: layout.sectionSpacing,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: layout.spacing.md,
    marginBottom: layout.spacing.md,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    gap: layout.spacing.md,
  },
  bottomSpacer: {
    height: layout.spacing.xl,
  },
});
