import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PigsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Porcs - Liste des lots</Text>
      <Text style={styles.subtitle}>Écran placeholder, prêt à être branché.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B1120', padding: 20, justifyContent: 'center' },
  title: { color: 'white', fontSize: 20, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: '#94A3B8' },
});
