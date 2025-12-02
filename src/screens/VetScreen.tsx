import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stethoscope, Send } from 'lucide-react-native';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { SectionHeader } from '../components/SectionHeader';
import { useVetAI } from '../hooks/useVetAI';
import { colors, typography, layout } from '../theme';
import type { Species } from '../types';

export default function VetScreen() {
  const { consultations, loading, askQuestion } = useVetAI();
  const [question, setQuestion] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<Species>('porc');
  const [isAsking, setIsAsking] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setIsAsking(true);
    try {
      await askQuestion(question, selectedSpecies);
      setQuestion('');
    } catch (err) {
      console.error('Error asking question:', err);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <BackgroundPattern variant="subtle" />
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={[styles.iconCircle, { backgroundColor: `${colors.accent}26` }]}>
          <Stethoscope size={28} color={colors.accent} strokeWidth={2.5} />
        </View>
        <View>
          <Text style={styles.title}>Vétérinaire IA</Text>
          <Text style={styles.subtitle}>Assistant santé animale</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.accent} />
            </View>
          ) : consultations.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🤖</Text>
              <Text style={styles.emptyText}>Aucune consultation</Text>
              <Text style={styles.emptyHint}>
                Posez votre première question au vétérinaire IA
              </Text>
            </View>
          ) : (
            <>
              <SectionHeader title="Historique des consultations" />
              {consultations.map((consultation) => (
                <View key={consultation.id} style={[styles.consultationCard, layout.shadows.card]}>
                  <View style={styles.consultationHeader}>
                    <Text style={styles.consultationSpecies}>
                      {consultation.species === 'porc' ? '🐷 Porc' : consultation.species === 'volaille' ? '🐔 Volaille' : '🐄 Bovin'}
                    </Text>
                    <Text style={styles.consultationDate}>
                      {new Date(consultation.created_at).toLocaleDateString('fr-FR')}
                    </Text>
                  </View>
                  <View style={styles.questionContainer}>
                    <Text style={styles.questionLabel}>Question:</Text>
                    <Text style={styles.questionText}>{consultation.question}</Text>
                  </View>
                  <View style={styles.answerContainer}>
                    <Text style={styles.answerLabel}>Réponse:</Text>
                    <Text style={styles.answerText}>{consultation.answer}</Text>
                  </View>
                </View>
              ))}
            </>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.speciesSelector}>
            {(['porc', 'volaille', 'bovin'] as Species[]).map((species) => (
              <TouchableOpacity
                key={species}
                style={[
                  styles.speciesButton,
                  selectedSpecies === species && styles.speciesButtonActive,
                ]}
                onPress={() => setSelectedSpecies(species)}
              >
                <Text
                  style={[
                    styles.speciesButtonText,
                    selectedSpecies === species && styles.speciesButtonTextActive,
                  ]}
                >
                  {species === 'porc' ? '🐷' : species === 'volaille' ? '🐔' : '🐄'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Posez votre question..."
              placeholderTextColor={colors.textMuted}
              value={question}
              onChangeText={setQuestion}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, (!question.trim() || isAsking) && styles.sendButtonDisabled]}
              onPress={handleAsk}
              disabled={!question.trim() || isAsking}
            >
              {isAsking ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Send size={20} color={colors.white} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: layout.spacing.base,
    paddingBottom: layout.spacing['2xl'],
  },
  loadingContainer: {
    paddingVertical: layout.spacing['3xl'],
    alignItems: 'center',
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
  consultationCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: layout.cardRadius,
    padding: layout.spacing.lg,
    marginBottom: layout.spacing.base,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  consultationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.md,
  },
  consultationSpecies: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
  },
  consultationDate: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  questionContainer: {
    marginBottom: layout.spacing.md,
  },
  questionLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.textSecondary,
    marginBottom: layout.spacing.xs,
  },
  questionText: {
    fontSize: typography.body.fontSize,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  answerContainer: {
    backgroundColor: `${colors.accent}15`,
    padding: layout.spacing.md,
    borderRadius: layout.borderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  answerLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.accent,
    marginBottom: layout.spacing.xs,
  },
  answerText: {
    fontSize: typography.body.fontSize,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  inputContainer: {
    paddingHorizontal: layout.spacing.base,
    paddingVertical: layout.spacing.base,
    backgroundColor: colors.backgroundCard,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  speciesSelector: {
    flexDirection: 'row',
    gap: layout.spacing.sm,
    marginBottom: layout.spacing.sm,
  },
  speciesButton: {
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.base,
    borderRadius: layout.borderRadius.md,
    backgroundColor: colors.backgroundPrimary,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  speciesButtonActive: {
    backgroundColor: `${colors.accent}26`,
    borderColor: colors.accent,
  },
  speciesButtonText: {
    fontSize: 20,
  },
  speciesButtonTextActive: {
    opacity: 1,
  },
  inputRow: {
    flexDirection: 'row',
    gap: layout.spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    borderRadius: layout.borderRadius.md,
    padding: layout.spacing.md,
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: layout.borderRadius.md,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
