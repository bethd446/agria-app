import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function VetScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vétérinaire IA</Text>
      <Text style={styles.subtitle}>Consultation à venir</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.text.secondary,
  },
});
