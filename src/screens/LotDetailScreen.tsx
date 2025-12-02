import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Edit, Trash2, TrendingUp, DollarSign, Activity } from 'lucide-react-native';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { StatCard } from '../components/StatCard';
import { SectionHeader } from '../components/SectionHeader';
import { useLotDetail } from '../hooks/useLotDetail';
import { colors, typography, layout } from '../theme';
import type { UpdateLotInput } from '../types';

interface Props {
  lotId: string;
  onBack: () => void;
}

export default function LotDetailScreen({ lotId, onBack }: Props) {
  const { lot, loading, error, updateLot, deleteLot } = useLotDetail(lotId);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    current_count: '',
    mortality_count: '',
    avg_weight: '',
    feed_cost: '',
    vet_cost: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const input: UpdateLotInput = {};
      if (formData.current_count) input.current_count = parseInt(formData.current_count, 10);
      if (formData.mortality_count) input.mortality_count = parseInt(formData.mortality_count, 10);
      if (formData.avg_weight) input.avg_weight = parseFloat(formData.avg_weight);
      if (formData.feed_cost) input.feed_cost = parseFloat(formData.feed_cost);
      if (formData.vet_cost) input.vet_cost = parseFloat(formData.vet_cost);

      await updateLot(input);
      setModalVisible(false);
      setFormData({
        current_count: '',
        mortality_count: '',
        avg_weight: '',
        feed_cost: '',
        vet_cost: '',
      });
    } catch (err) {
      console.error('Error updating lot:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLot();
      onBack();
    } catch (err) {
      console.error('Error deleting lot:', err);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !lot) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'Lot introuvable'}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const mortalityRate = lot.initial_count > 0
    ? ((lot.mortality_count / lot.initial_count) * 100).toFixed(1)
    : '0';

  const totalCosts = lot.feed_cost + lot.vet_cost + lot.other_cost;
  const daysSinceStart = Math.floor(
    (new Date().getTime() - new Date(lot.start_date).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <SafeAreaView style={styles.safe}>
      <BackgroundPattern variant="subtle" />
      <StatusBar style="light" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>{lot.name}</Text>
          <Text style={styles.subtitle}>Lot de {lot.species}</Text>
        </View>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Trash2 size={20} color={colors.status.error} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <SectionHeader title="Statistiques principales" />
          <View style={styles.statsGrid}>
            <StatCard
              IconComponent={Activity}
              label="Effectif actuel"
              value={lot.current_count}
              hint={`Initial: ${lot.initial_count}`}
              iconColor={colors.primary}
            />
            <StatCard
              IconComponent={TrendingUp}
              label="Mortalité"
              value={`${mortalityRate}%`}
              hint={`${lot.mortality_count} décès`}
              iconColor={colors.status.error}
            />
          </View>
          <View style={styles.statsGrid}>
            <StatCard
              IconComponent={Activity}
              label="Poids moyen"
              value={`${lot.avg_weight.toFixed(1)} kg`}
              hint={`GMQ: ${lot.avg_daily_gain.toFixed(0)}g/j`}
              iconColor={colors.accent}
            />
            <StatCard
              IconComponent={DollarSign}
              label="Marge"
              value={`${lot.margin_percent.toFixed(0)}%`}
              hint={`${daysSinceStart} jours`}
              iconColor={colors.status.success}
            />
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Analyse financière" />
          <View style={[styles.financeCard, layout.shadows.card]}>
            <View style={styles.financeRow}>
              <Text style={styles.financeLabel}>Alimentation</Text>
              <Text style={styles.financeValue}>{lot.feed_cost.toFixed(0)} FCFA</Text>
            </View>
            <View style={styles.financeRow}>
              <Text style={styles.financeLabel}>Vétérinaire</Text>
              <Text style={styles.financeValue}>{lot.vet_cost.toFixed(0)} FCFA</Text>
            </View>
            <View style={styles.financeRow}>
              <Text style={styles.financeLabel}>Autres coûts</Text>
              <Text style={styles.financeValue}>{lot.other_cost.toFixed(0)} FCFA</Text>
            </View>
            <View style={[styles.financeRow, styles.financeTotalRow]}>
              <Text style={styles.financeTotalLabel}>Total dépenses</Text>
              <Text style={styles.financeTotalValue}>{totalCosts.toFixed(0)} FCFA</Text>
            </View>
            <View style={styles.financeRow}>
              <Text style={styles.financeTotalLabel}>Revenu estimé</Text>
              <Text style={[styles.financeTotalValue, { color: colors.status.success }]}>
                {lot.estimated_revenue.toFixed(0)} FCFA
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.editButton, layout.shadows.button]}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Edit size={20} color={colors.white} />
          <Text style={styles.editButtonText}>Mettre à jour</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, layout.shadows.cardLarge]}>
            <Text style={styles.modalTitle}>Mettre à jour le lot</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Effectif actuel</Text>
              <TextInput
                style={styles.input}
                placeholder={lot.current_count.toString()}
                placeholderTextColor={colors.textMuted}
                value={formData.current_count}
                onChangeText={(text) => setFormData({ ...formData, current_count: text })}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mortalité totale</Text>
              <TextInput
                style={styles.input}
                placeholder={lot.mortality_count.toString()}
                placeholderTextColor={colors.textMuted}
                value={formData.mortality_count}
                onChangeText={(text) => setFormData({ ...formData, mortality_count: text })}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Poids moyen (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder={lot.avg_weight.toString()}
                placeholderTextColor={colors.textMuted}
                value={formData.avg_weight}
                onChangeText={(text) => setFormData({ ...formData, avg_weight: text })}
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Coût alimentation (FCFA)</Text>
              <TextInput
                style={styles.input}
                placeholder={lot.feed_cost.toString()}
                placeholderTextColor={colors.textMuted}
                value={formData.feed_cost}
                onChangeText={(text) => setFormData({ ...formData, feed_cost: text })}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Coût vétérinaire (FCFA)</Text>
              <TextInput
                style={styles.input}
                placeholder={lot.vet_cost.toString()}
                placeholderTextColor={colors.textMuted}
                value={formData.vet_cost}
                onChangeText={(text) => setFormData({ ...formData, vet_cost: text })}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
                disabled={isUpdating}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.updateButton]}
                onPress={handleUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <Text style={styles.updateButtonText}>Enregistrer</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.base,
    paddingTop: layout.spacing.xl,
    paddingBottom: layout.spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    marginLeft: layout.spacing.sm,
  },
  deleteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: layout.spacing.xs / 2,
  },
  subtitle: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    textTransform: 'capitalize',
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
  financeCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: layout.cardRadius,
    padding: layout.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  financeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  financeTotalRow: {
    marginTop: layout.spacing.sm,
    borderTopWidth: 2,
    borderTopColor: colors.primary,
    borderBottomWidth: 0,
  },
  financeLabel: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
  financeValue: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  financeTotalLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  financeTotalValue: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: layout.spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: layout.spacing.lg,
    borderRadius: layout.cardRadius,
    marginTop: layout.spacing.base,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  editButtonText: {
    color: colors.white,
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
  },
  bottomSpacer: {
    height: layout.spacing.xl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.backgroundCard,
    borderTopLeftRadius: layout.cardRadius,
    borderTopRightRadius: layout.cardRadius,
    padding: layout.spacing.xl,
    paddingBottom: layout.spacing['2xl'],
    maxHeight: '80%',
  },
  modalTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: layout.spacing.xl,
  },
  inputGroup: {
    marginBottom: layout.spacing.base,
  },
  inputLabel: {
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
    color: colors.textSecondary,
    marginBottom: layout.spacing.sm,
  },
  input: {
    backgroundColor: colors.backgroundPrimary,
    borderRadius: layout.borderRadius.md,
    padding: layout.spacing.base,
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: layout.spacing.md,
    marginTop: layout.spacing.lg,
  },
  modalButton: {
    flex: 1,
    paddingVertical: layout.spacing.base,
    borderRadius: layout.borderRadius.md,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.backgroundPrimary,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
  },
  updateButton: {
    backgroundColor: colors.primary,
  },
  updateButtonText: {
    color: colors.white,
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
  },
});
