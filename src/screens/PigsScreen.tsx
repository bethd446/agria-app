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
import { LotCard } from '../components/LotCard';
import { useLots } from '../hooks/useLots';
import { colors, typography, layout } from '../theme';
import type { CreateLotInput } from '../types';

export default function PigsScreen() {
  const { data: lots, loading, error, createLot } = useLots('porc');
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
        species: 'porc',
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
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>🐷 Porcs</Text>
        <Text style={styles.subtitle}>Gestion des lots</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+ Ajouter un lot</Text>
        </TouchableOpacity>

        {lots.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🐷</Text>
            <Text style={styles.emptyText}>Aucun lot de porcs</Text>
            <Text style={styles.emptyHint}>Appuyez sur "Ajouter un lot" pour commencer</Text>
          </View>
        ) : (
          lots.map((lot) => <LotCard key={lot.id} lot={lot} onPress={() => {}} />)
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nouveau lot de porcs</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nom du lot</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Lot Alpha"
                placeholderTextColor={colors.text.tertiary}
                value={newLotName}
                onChangeText={setNewLotName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombre initial</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 50"
                placeholderTextColor={colors.text.tertiary}
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
  errorBanner: {
    backgroundColor: colors.status.error,
    padding: layout.spacing.md,
    borderRadius: layout.radius.md,
    marginBottom: layout.spacing.lg,
  },
  errorText: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: layout.spacing.lg,
    borderRadius: layout.radius.lg,
    alignItems: 'center',
    marginBottom: layout.spacing.xl,
  },
  addButtonText: {
    color: colors.white,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: layout.spacing['4xl'],
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: layout.spacing.lg,
  },
  emptyText: {
    color: colors.text.primary,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    marginBottom: layout.spacing.sm,
  },
  emptyHint: {
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.spacing.xl,
  },
  modalContent: {
    backgroundColor: colors.cardBackground,
    borderRadius: layout.radius.lg,
    padding: layout.spacing['2xl'],
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    color: colors.text.primary,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    marginBottom: layout.spacing.xl,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: layout.spacing.lg,
  },
  inputLabel: {
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
    marginBottom: layout.spacing.sm,
    fontWeight: typography.weights.medium,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.border.default,
    borderRadius: layout.radius.md,
    padding: layout.spacing.md,
    color: colors.text.primary,
    fontSize: typography.sizes.md,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: layout.spacing.md,
    marginTop: layout.spacing.lg,
  },
  modalButton: {
    flex: 1,
    paddingVertical: layout.spacing.md,
    borderRadius: layout.radius.md,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.background,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.border.default,
  },
  cancelButtonText: {
    color: colors.text.secondary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  createButton: {
    backgroundColor: colors.primary,
  },
  createButtonText: {
    color: colors.white,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
});
