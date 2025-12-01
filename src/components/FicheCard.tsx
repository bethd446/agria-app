import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, layout } from '../theme';
import type { Fiche } from '../types';

interface FicheCardProps {
  fiche: Fiche;
  onPress: () => void;
}

export function FicheCard({ fiche, onPress }: FicheCardProps) {
  const speciesEmoji = {
    porc: '🐷',
    volaille: '🐔',
    bovin: '🐄',
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
      stars += '⭐';
    }
    if (hasHalfStar) {
      stars += '⭐';
    }

    return stars;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{speciesEmoji[fiche.species]}</Text>
        <View style={styles.headerText}>
          <Text style={styles.title}>{fiche.title}</Text>
          <Text style={styles.species}>
            {fiche.species.charAt(0).toUpperCase() + fiche.species.slice(1)}
          </Text>
        </View>
      </View>
      <View style={styles.rating}>
        <Text style={styles.stars}>{renderStars(fiche.rating)}</Text>
        <Text style={styles.ratingText}>{fiche.rating.toFixed(1)}/5</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: layout.radius.lg,
    padding: layout.spacing.lg,
    backgroundColor: colors.cardBackground,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.border.default,
    marginBottom: layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.md,
    marginBottom: layout.spacing.sm,
  },
  emoji: {
    fontSize: typography.sizes['3xl'],
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginBottom: layout.spacing.xs / 2,
  },
  species: {
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm,
  },
  stars: {
    fontSize: typography.sizes.sm,
  },
  ratingText: {
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
  },
});
