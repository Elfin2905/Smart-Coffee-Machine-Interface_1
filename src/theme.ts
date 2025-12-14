// Theme configuration for different interface styles

export interface Theme {
  name: string;
  background: string;
  backgroundGradient?: string;
  accent: string;
  accentTo: string;
  accentGlow: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  glassEffect: string;
  buttonGradient: string;
  headerGradient?: string;
  fontFamily: string;
  specialEffects?: {
    snowfall?: boolean;
    particles?: boolean;
    glow?: boolean;
  };
}

export const themes: Record<string, Theme> = {
  Modern: {
    name: 'Modern',
    background: '#0F0F11',
    accent: '#D4A373',
    accentTo: '#B58553',
    accentGlow: 'rgba(212, 163, 115, 0.3)',
    cardBg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    glassEffect: 'backdrop-blur-xl',
    buttonGradient: 'linear-gradient(to bottom right, #D4A373, #C49563, #B58553)',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
  
  Elegant: {
    name: 'Elegant',
    background: '#000000',
    backgroundGradient: 'radial-gradient(ellipse at top, rgba(255, 215, 0, 0.12) 0%, rgba(0, 0, 0, 1) 40%, rgba(139, 69, 19, 0.08) 100%)',
    accent: '#FFD700',
    accentTo: '#FFA500',
    accentGlow: 'rgba(255, 215, 0, 0.6)',
    cardBg: 'linear-gradient(135deg, rgba(255, 215, 0, 0.12) 0%, rgba(139, 69, 19, 0.08) 50%, rgba(255, 255, 255, 0.03) 100%)',
    cardBorder: 'rgba(255, 215, 0, 0.35)',
    textPrimary: '#FFFAF0',
    textSecondary: 'rgba(255, 250, 240, 0.65)',
    glassEffect: 'backdrop-blur-3xl',
    buttonGradient: 'linear-gradient(135deg, #FFD700, #FFC700, #FFB700, #FFA500)',
    headerGradient: 'linear-gradient(to right, rgba(255, 215, 0, 0.15) 0%, rgba(139, 69, 19, 0.08) 50%, transparent 100%)',
    specialEffects: {
      glow: true,
    },
    fontFamily: "'Playfair Display', Georgia, serif",
  },
  
  Verspielt: {
    name: 'Verspielt',
    background: '#1A0F2E',
    backgroundGradient: 'radial-gradient(ellipse at bottom, rgba(168, 85, 247, 0.15) 0%, rgba(26, 15, 46, 1) 60%)',
    accent: '#F472B6',
    accentTo: '#EC4899',
    accentGlow: 'rgba(244, 114, 182, 0.5)',
    cardBg: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(244, 114, 182, 0.05) 100%)',
    cardBorder: 'rgba(244, 114, 182, 0.3)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    glassEffect: 'backdrop-blur-xl',
    buttonGradient: 'linear-gradient(135deg, #F472B6, #EC4899, #A855F7)',
    specialEffects: {
      particles: true,
    },
    fontFamily: "'Quicksand', 'Comic Sans MS', cursive",
  },
  
  Vintage: {
    name: 'Vintage',
    background: '#2C2416',
    backgroundGradient: 'radial-gradient(ellipse at center, rgba(139, 90, 43, 0.2) 0%, rgba(44, 36, 22, 1) 70%)',
    accent: '#CD853F',
    accentTo: '#A0652E',
    accentGlow: 'rgba(205, 133, 63, 0.4)',
    cardBg: 'linear-gradient(135deg, rgba(139, 90, 43, 0.15) 0%, rgba(205, 133, 63, 0.05) 100%)',
    cardBorder: 'rgba(205, 133, 63, 0.3)',
    textPrimary: '#F5DEB3',
    textSecondary: 'rgba(245, 222, 179, 0.6)',
    glassEffect: 'backdrop-blur-md',
    buttonGradient: 'linear-gradient(to bottom, #CD853F, #B8723A, #A0652E)',
    headerGradient: 'linear-gradient(to bottom, rgba(139, 90, 43, 0.3) 0%, transparent 100%)',
    fontFamily: "'Georgia', serif",
  },
  
  Weihnachten: {
    name: 'Weihnachten',
    background: '#0F1A0F',
    backgroundGradient: 'radial-gradient(ellipse at top right, rgba(220, 38, 38, 0.1) 0%, rgba(15, 26, 15, 1) 40%, rgba(21, 128, 61, 0.1) 100%)',
    accent: '#DC2626',
    accentTo: '#991B1B',
    accentGlow: 'rgba(220, 38, 38, 0.5)',
    cardBg: 'linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(21, 128, 61, 0.08) 100%)',
    cardBorder: 'rgba(220, 38, 38, 0.3)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    glassEffect: 'backdrop-blur-xl',
    buttonGradient: 'linear-gradient(135deg, #DC2626, #EF4444, #15803D)',
    headerGradient: 'linear-gradient(to right, rgba(220, 38, 38, 0.2) 0%, rgba(21, 128, 61, 0.2) 100%)',
    specialEffects: {
      snowfall: true,
    },
    fontFamily: "'Mountains of Christmas', 'Brush Script MT', cursive",
  },
};

export function getTheme(styleName: string): Theme {
  return themes[styleName] || themes.Modern;
}