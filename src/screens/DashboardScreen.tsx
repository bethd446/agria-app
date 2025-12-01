import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatCard } from '../components/StatCard';
import { AlertCard } from '../components/AlertCard';
import { QuickAccessCard } from '../components/QuickAccessCard';
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

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>AGRIA Éleveur CI</Text>
        <Text style={styles.subtitle}>Suivi multi-élevage</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alertes urgentes</Text>
          {data?.alerts && data.alerts.length > 0 ? (
            data.alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                title={alert.message}
                description={new Date(alert.scheduled_date).toLocaleDateString('fr-FR')}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>Aucune alerte urgente</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ton cheptel</Text>
          <View style={styles.row}>
            <StatCard
              label="🐷 Porcs"
              value={data?.porcs.count || 0}
              hint={`Mortalité ${data?.porcs.mortality_rate.toFixed(1) || 0}%`}
            />
            <StatCard
              label="🐔 Volailles"
              value={data?.volailles.count || 0}
              hint={`Ponte ${data?.volailles.production_rate.toFixed(0) || 0}%`}
            />
          </View>
          <View style={styles.row}>
            <StatCard
              label="🐄 Bovins"
              value={data?.bovins.count || 0}
              hint={`Lait ${data?.bovins.daily_production.toFixed(0) || 0} L/j`}
            />
            <StatCard
              label="Marge"
              value={`+${data?.margin.toFixed(0) || 0}%`}
              hint="Derniers 30 jours"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accès rapide</Text>
          <View style={styles.row}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.text.secondary,
    marginTop: layout.spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.spacing.xl,
  },
  errorText: {
    color: colors.status.error,
    fontSize: typography.sizes.lg,
    textAlign: 'center',
    marginBottom: layout.spacing.sm,
  },
  errorHint: {
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
    textAlign: 'center',
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: layout.spacing.xl,
    paddingBottom: layout.spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
  },
  subtitle: {
    color: colors.text.secondary,
    marginTop: layout.spacing.xs,
    fontSize: typography.sizes.base,
  },
  content: {
    padding: layout.spacing.xl,
    paddingBottom: 40,
  },
  section: {
    marginBottom: layout.spacing['2xl'],
  },
  sectionTitle: {
    color: colors.text.primary,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    marginBottom: layout.spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: layout.spacing.md,
    marginBottom: layout.spacing.md,
  },
  emptyText: {
    color: colors.text.tertiary,
    fontSize: typography.sizes.sm,
    textAlign: 'center',
    padding: layout.spacing.lg,
  },
});
