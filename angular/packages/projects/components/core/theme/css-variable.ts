import { MlTheme, MlPalette } from '../theming';

export const ML_CSS_VARIABLE_THEME: MlTheme = {
  base: 'var(--ml-base)',
  oppositeBase: 'var(--ml-oppositeBase)',

  background: 'var(--ml-background)',
  primaryContainer: 'var(--ml-primaryContainer)',
  secondaryContainer: 'var(--ml-secondaryContainer)',
  tertiaryContainer: 'var(--ml-tertiaryContainer)',
  disabledContainer: 'var(--ml-disabledContainer)',

  divider: 'var(--ml-divider)',
  elevation: 'var(--ml-elevation)',
  scrollbar: 'var(--ml-scrollbar)',

  icon: 'var(--ml-icon)',
  sliderMin: 'var(--ml-sliderMin)',
  sliderOff: 'var(--ml-sliderOff)',
  sliderOffActive: 'var(--ml-sliderOffActive)',
  sliderThumb: 'var(--ml-sliderThumb)',

  text: 'var(--ml-text)',
  secondaryText: 'var(--ml-secondaryText)',
  hintText: 'var(--ml-hintText)',
  disabledText: 'var(--ml-disabledText)'
} as const;


export const ML_CSS_VARIABLE_PALETTE: MlPalette = {
  primary: {
    color: 'var(--ml-primary)',
    contrast: 'var(--ml-primary-contrast)'
  },
  accent: {
    color: 'var(--ml-accent)',
    contrast: 'var(--ml-accent-contrast)'
  },
  warn: {
    color: 'var(--ml-warn)',
    contrast: 'var(--ml-warn-contrast)'
  }
} as const;
