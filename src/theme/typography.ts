export const typography = {
  sizes: {
    xs: 11,
    sm: 12,
    base: 16,
    md: 18,
    lg: 22,
    xl: 28,
    '2xl': 32,
  },

  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
  },

  h2: {
    fontSize: 22,
    fontWeight: '600' as const,
  },

  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },

  label: {
    fontSize: 13,
    fontWeight: '500' as const,
  },
};
