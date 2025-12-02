import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Calculator, Wheat, DollarSign } from 'lucide-react-native';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { SectionHeader } from '../components/SectionHeader';
import { colors, typography, layout } from '../theme';
import type { FeedFormulationResult } from '../types';

export default function FeedCalculatorScreen() {
  const [selectedPhase, setSelectedPhase] = useState<'demarrage' | 'croissance' | 'finition'>('demarrage');
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<FeedFormulationResult | null>(null);

  const handleCalculate = async () => {
    setCalculating(true);

    setTimeout(() => {
      const mockResult: FeedFormulationResult = {
        ingredients: [
          { name: 'Maïs', quantity: 45, unit: 'kg' },
          { name: 'Tourteau de soja', quantity: 20, unit: 'kg' },
          { name: 'Son de blé', quantity: 15, unit: 'kg' },
          { name: 'Farine de poisson', quantity: 10, unit: 'kg' },
          { name: 'Prémix vitamines', quantity: 5, unit: 'kg' },
          { name: 'Sel', quantity: 3, unit: 'kg' },
          { name: 'Lysine', quantity: 2, unit: 'kg' },
        ],
        total_cost: selectedPhase === 'demarrage' ? 28500 : selectedPhase === 'croissance' ? 24000 : 21500,
        nutritional_values: {
          protein: selectedPhase === 'demarrage' ? 18.5 : selectedPhase === 'croissance' ? 16.0 : 14.5,
          energy: selectedPhase === 'demarrage' ? 3200 : selectedPhase === 'croissance' ? 3100 : 3000,
          calcium: 0.85,
        },
      };
      setResult(mockResult);
      setCalculating(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <BackgroundPattern variant="subtle" />
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={[styles.iconCircle, { backgroundColor: `${colors.primary}26` }]}>
          <Calculator size={28} color={colors.primary} strokeWidth={2.5} />
        </View>
        <View>
          <Text style={styles.title}>Calculateur Aliments</Text>
          <Text style={styles.subtitle}>Formulation pour porcs</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <SectionHeader title="Sélectionner la phase" />
          <View style={styles.phaseContainer}>
            {[
              { key: 'demarrage' as const, label: 'Démarrage', desc: '0-2 mois' },
              { key: 'croissance' as const, label: 'Croissance', desc: '2-4 mois' },
              { key: 'finition' as const, label: 'Finition', desc: '4-6 mois' },
            ].map((phase) => (
              <TouchableOpacity
                key={phase.key}
                style={[
                  styles.phaseButton,
                  layout.shadows.card,
                  selectedPhase === phase.key && styles.phaseButtonActive,
                ]}
                onPress={() => setSelectedPhase(phase.key)}
                activeOpacity={0.8}
              >
                <Text style={[styles.phaseLabel, selectedPhase === phase.key && styles.phaseLabelActive]}>
                  {phase.label}
                </Text>
                <Text style={[styles.phaseDesc, selectedPhase === phase.key && styles.phaseDescActive]}>
                  {phase.desc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.calculateButton, layout.shadows.button]}
          onPress={handleCalculate}
          disabled={calculating}
          activeOpacity={0.8}
        >
          {calculating ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <>
              <Calculator size={20} color={colors.white} />
              <Text style={styles.calculateButtonText}>Calculer la formule</Text>
            </>
          )}
        </TouchableOpacity>

        {result && (
          <>
            <View style={styles.section}>
              <SectionHeader title="Composition (pour 100kg)" />
              <View style={[styles.resultCard, layout.shadows.card]}>
                {result.ingredients.map((ingredient, index) => (
                  <View key={index} style={styles.ingredientRow}>
                    <View style={styles.ingredientLeft}>
                      <Wheat size={16} color={colors.primary} />
                      <Text style={styles.ingredientName}>{ingredient.name}</Text>
                    </View>
                    <Text style={styles.ingredientValue}>
                      {ingredient.quantity} {ingredient.unit}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <SectionHeader title="Valeurs nutritionnelles" />
              <View style={[styles.resultCard, layout.shadows.card]}>
                <View style={styles.nutritionRow}>
                  <Text style={styles.nutritionLabel}>Protéines brutes</Text>
                  <Text style={styles.nutritionValue}>{result.nutritional_values.protein}%</Text>
                </View>
                <View style={styles.nutritionRow}>
                  <Text style={styles.nutritionLabel}>Énergie métabolisable</Text>
                  <Text style={styles.nutritionValue}>{result.nutritional_values.energy} kcal/kg</Text>
                </View>
                <View style={styles.nutritionRow}>
                  <Text style={styles.nutritionLabel}>Calcium</Text>
                  <Text style={styles.nutritionValue}>{result.nutritional_values.calcium}%</Text>
                </View>
              </View>
            </View>

            <View style={[styles.costCard, layout.shadows.cardLarge]}>
              <View style={styles.costHeader}>
                <DollarSign size={24} color={colors.status.success} />
                <Text style={styles.costTitle}>Coût total</Text>
              </View>
              <Text style={styles.costValue}>{result.total_cost.toLocaleString()} FCFA</Text>
              <Text style={styles.costHint}>Pour 100kg d'aliment</Text>
            </View>
          </>
        )}

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
  phaseContainer: {
    gap: layout.spacing.md,
  },
  phaseButton: {
    backgroundColor: colors.backgroundCard,
    borderRadius: layout.cardRadius,
    padding: layout.spacing.lg,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  phaseButtonActive: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}15`,
  },
  phaseLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: layout.spacing.xs,
  },
  phaseLabelActive: {
    color: colors.primary,
  },
  phaseDesc: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  phaseDescActive: {
    color: colors.primary,
  },
  calculateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: layout.spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: layout.spacing.lg,
    borderRadius: layout.cardRadius,
    marginBottom: layout.sectionSpacing,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  calculateButtonText: {
    color: colors.white,
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
  },
  resultCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: layout.cardRadius,
    padding: layout.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  ingredientLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm,
    flex: 1,
  },
  ingredientName: {
    fontSize: typography.body.fontSize,
    color: colors.textPrimary,
  },
  ingredientValue: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  nutritionLabel: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
  nutritionValue: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  costCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: layout.cardRadius,
    padding: layout.spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.status.success,
    marginTop: layout.spacing.base,
  },
  costHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm,
    marginBottom: layout.spacing.md,
  },
  costTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  costValue: {
    fontSize: 32,
    fontWeight: typography.weights.bold,
    color: colors.status.success,
    marginBottom: layout.spacing.xs,
  },
  costHint: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  bottomSpacer: {
    height: layout.spacing.xl,
  },
});
