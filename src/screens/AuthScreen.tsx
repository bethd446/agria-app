import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LogIn, UserPlus } from 'lucide-react-native';
import { Logo } from '../components/Logo';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { useAuth } from '../contexts/AuthContext';
import { colors, typography, layout } from '../theme';

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!phone || !password || (isSignUp && !name)) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await signUp(phone, password, name);
      } else {
        await signIn(phone, password);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <BackgroundPattern variant="gradient" />
      <StatusBar style="light" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Logo size="large" showText={true} />
          <Text style={styles.tagline}>Gestion d'élevage moderne pour la Côte d'Ivoire</Text>
        </View>

        <View style={[styles.formCard, layout.shadows.cardLarge]}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, !isSignUp && styles.tabActive]}
              onPress={() => setIsSignUp(false)}
            >
              <LogIn size={20} color={!isSignUp ? colors.primary : colors.textSecondary} />
              <Text style={[styles.tabText, !isSignUp && styles.tabTextActive]}>
                Connexion
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, isSignUp && styles.tabActive]}
              onPress={() => setIsSignUp(true)}
            >
              <UserPlus size={20} color={isSignUp ? colors.primary : colors.textSecondary} />
              <Text style={[styles.tabText, isSignUp && styles.tabTextActive]}>
                Inscription
              </Text>
            </TouchableOpacity>
          </View>

          {error && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {isSignUp && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nom complet</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Kouadio Jean"
                placeholderTextColor={colors.textMuted}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Téléphone</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 0707070707"
              placeholderTextColor={colors.textMuted}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, layout.shadows.button]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.submitButtonText}>
                {isSignUp ? 'Créer mon compte' : 'Se connecter'}
              </Text>
            )}
          </TouchableOpacity>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: layout.spacing.base,
  },
  header: {
    alignItems: 'center',
    marginBottom: layout.spacing['2xl'],
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    textAlign: 'center',
    marginTop: layout.spacing.base,
    paddingHorizontal: layout.spacing.xl,
  },
  formCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: layout.cardRadius,
    padding: layout.spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundPrimary,
    borderRadius: layout.borderRadius.md,
    padding: layout.spacing.xs,
    marginBottom: layout.spacing.xl,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: layout.spacing.md,
    gap: layout.spacing.sm,
    borderRadius: layout.borderRadius.md,
  },
  tabActive: {
    backgroundColor: colors.backgroundCard,
  },
  tabText: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
  errorBanner: {
    backgroundColor: `${colors.status.error}15`,
    padding: layout.spacing.md,
    borderRadius: layout.borderRadius.md,
    marginBottom: layout.spacing.base,
    borderLeftWidth: 3,
    borderLeftColor: colors.status.error,
  },
  errorText: {
    color: colors.status.error,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
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
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: layout.spacing.lg,
    borderRadius: layout.borderRadius.md,
    alignItems: 'center',
    marginTop: layout.spacing.base,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: typography.body.fontSize,
    fontWeight: typography.weights.semibold,
  },
});
