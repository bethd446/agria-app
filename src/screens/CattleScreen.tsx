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
import { Milk } from 'lucide-react-native';
import { LotCard } from '../components/LotCard';
import { SectionHeader } from '../components/SectionHeader';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { useLots } from '../hooks/useLots';
import { colors, typography, layout } from '../theme';
import type { CreateLotInput } from '../types';

export default function CattleScreen() {
  const { data: lots, loading, error, createLot } = useLots('bovin');
  const [modalVisible, setModalVisible] = useState(false);
  const [newLotName, setNewLotName] = useState('');
  const [newLotCount, setNewLotCount] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateLot = async () => {
    if (!newLotName.trim() || !newLotCount.trim()) {
      return;
    }

    setIsCreating(true);
    try {
      const input: CreateLotInput = {
        species: 'bovin',
        name: newLotName.trim(),
        start_date: new Date().toISOString().split('T')[0],
        initial_count: parseInt(newLotCount, 10),
      };
      await createLot(input);
      setModalVisible(false);
      setNewLotName('');
      setNewLotCount('');
    } catch (err) {
      console.error('Error creating lot:', err);
    } finally {
      setIsCreating(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primaryLight} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <BackgroundPattern variant="subtle" />
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={[styles.iconCircle, { backgroundColor: `${colors.primaryLight}26` }]}>
          <Milk size={28} color={colors.primaryLight} strokeWidth={2.5} />
        </View>
        <View>
          <Text style={styles.title}>Bovins</Text>
          <Text style={styles.subtitle}>{lots.length} lot(s) actif(s)</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.addButton, layout.shadows.button]}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+ Ajouter un lot</Text>
        </TouchableOpacity>

        {lots.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🐄</Text>
            <Text style={styles.emptyText}>Aucun lot de bovins</Text>
            <Text style={styles.emptyHint}>Appuyez sur "Ajouter un lot" pour commencer</Text>
          </View>
        ) : (
          <>
            <SectionHeader title="Mes lots" />
            {lots.map((lot) => <LotCard key={lot.id} lot={lot} onPress={() => {}} />)}
          </>
        )}

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
            <Text style={styles.modalTitle}>Nouveau lot de bovins</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nom du lot</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Troupeau Nord"
                placeholderTextColor={colors.textMuted}
                value={newLotName}
                onChangeText={setNewLotName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombre initial</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 15"
                placeholderTextColor={colors.textMuted}
                value={newLotCount}
                onChangeText={setNewLotCount}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setNewLotName('');
                  setNewLotCount('');
                }}
                disabled={isCreating}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.createButton]}
                onPress={handleCreateLot}
                disabled={isCreating || !newLotName.trim() || !newLotCount.trim()}
              >
                {isCreating ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <Text style={styles.createButtonText}>Créer</Text>
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
  loadingText: {
    color: colors.textSecondary,
    marginTop: layout.spacing.md,
    fontSize: typography.body.fontSize,
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
  errorBanner: {
    backgroundColor: colors.backgroundCard,
    padding: layout.spacing.lg,
    borderRadius: layout.cardRadius,
    marginBottom: layout.spacing.base,
    borderLeftWidth: 4,
    borderLeftColor: colors.status.error,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  errorText: {
    color: colors.status.error,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  addButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: layout.spacing.lg,
    borderRadius: layout.cardRadius,
    alignItems: 'center',
    marginBottom: layout.sectionSpacing,
  },
  addButtonText: {
    color: colors.white,
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: layout.spacing['3xl'],
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: layout.spacing.lg,
    opacity: 0.5,
  },
  emptyText: {
    color: colors.textPrimary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginBottom: layout.spacing.sm,
  },
  emptyHint: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    textAlign: 'center',
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
  createButton: {
    backgroundColor: colors.primaryLight,
  },
  createButtonText: {
    color: colors.white,
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
  },
  bottomSpacer: {
    height: layout.spacing.xl,
  },
});
