import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>AGRIA Éleveur CI</Text>
        <Text style={styles.subtitle}>Suivi multi-élevage</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Section alertes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alertes urgentes</Text>
          <View style={[styles.card, styles.cardAlert]}>
            <Text style={styles.cardTitle}>Vaccination porcs - Lot Alpha</Text>
            <Text style={styles.cardText}>Demain à 08h00</Text>
          </View>
          <View style={[styles.card, styles.cardAlert]}>
            <Text style={styles.cardTitle}>Contrôle ponte pondeuses</Text>
            <Text style={styles.cardText}>Aujourd’hui avant 18h00</Text>
          </View>
        </View>

        {/* Section stats cheptel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ton cheptel</Text>
          <View style={styles.row}>
            <View style={[styles.card, styles.cardStat]}>
              <Text style={styles.cardLabel}>🐷 Porcs</Text>
              <Text style={styles.cardValue}>245</Text>
              <Text style={styles.cardHint}>Mortalité 3,1%</Text>
            </View>
            <View style={[styles.card, styles.cardStat]}>
              <Text style={styles.cardLabel}>🐔 Volailles</Text>
              <Text style={styles.cardValue}>1 280</Text>
              <Text style={styles.cardHint}>Ponte 89%</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.card, styles.cardStat]}>
              <Text style={styles.cardLabel}>🐄 Bovins</Text>
              <Text style={styles.cardValue}>42</Text>
              <Text style={styles.cardHint}>Lait 18 L/j</Text>
            </View>
            <View style={[styles.card, styles.cardStat]}>
              <Text style={styles.cardLabel}>Marge</Text>
              <Text style={styles.cardValue}>+54%</Text>
              <Text style={styles.cardHint}>Derniers 30 jours</Text>
            </View>
          </View>
        </View>

        {/* Boutons accès espèces */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accès rapide</Text>
          <View style={styles.row}>
            <View style={[styles.card, styles.cardButton]}>
              <Text style={styles.cardButtonIcon}>🐷</Text>
              <Text style={styles.cardButtonText}>Porcs</Text>
            </View>
            <View style={[styles.card, styles.cardButton]}>
              <Text style={styles.cardButtonIcon}>🐔</Text>
              <Text style={styles.cardButtonText}>Volailles</Text>
            </View>
            <View style={[styles.card, styles.cardButton]}>
              <Text style={styles.cardButtonIcon}>🐄</Text>
              <Text style={styles.cardButtonText}>Bovins</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const PRIMARY = '#2D5A2D';
const ACCENT = '#D97706';
const BG = '#0B1120';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: BG,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: '#94A3B8',
    marginTop: 4,
    fontSize: 14,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    backgroundColor: '#020617',
  },
  cardAlert: {
    borderWidth: 1,
    borderColor: '#F97316',
  },
  cardStat: {
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  cardTitle: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 4,
  },
  cardText: {
    color: '#E5E7EB',
    fontSize: 13,
  },
  cardLabel: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 4,
  },
  cardValue: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  cardHint: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
  },
  cardButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY,
    borderWidth: 0,
  },
  cardButtonIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  cardButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
