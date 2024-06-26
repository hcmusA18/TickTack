const palette = {
  neutral100: '#FFFFFF',
  neutral200: '#F4F2F1',
  neutral300: '#D7CEC9',
  neutral400: '#B6ACA6',
  neutral500: '#978F8A',
  neutral600: '#564E4A',
  neutral700: '#3C3836',
  neutral800: '#191015',
  neutral900: '#000000',

  primary100: '#F4E0D9',
  primary200: '#E8C1B4',
  primary300: '#DDA28E',
  primary400: '#D28468',
  primary500: '#C76542',
  primary600: '#A54F31',

  secondary100: '#DCDDE9',
  secondary200: '#BCC0D6',
  secondary300: '#9196B9',
  secondary400: '#626894',
  secondary500: '#41476E',

  accent100: '#FFEED4',
  accent200: '#FFE1B2',
  accent300: '#FDD495',
  accent400: '#FBC878',
  accent500: '#FFBB50',

  angry100: '#F2D6CD',
  angry500: '#C03403',

  overlay20: 'rgba(25, 16, 21, 0.2)',
  overlay50: 'rgba(25, 16, 21, 0.5)',

  button: '#ED1254'
} as const

const ttt = {
  pjRed: '#EC1254',
  pjBlue: '#12D7E7',
  pjWhite: '#FFFFFF',
  pjBlack: '#010002',

  grey75: '#F5F4F7',
  grey100: '#F6F3F7',
  grey200: '#E9E6E9',
  grey300: '#DBD8DB',
  grey400: '#BFBFBF',
  grey500: '#908C95',

  ink75: '#1A1A1A',
  ink100: '#9A979A',
  ink200: '#666366',
  ink300: '#161622',

  UIGrey: '#E9E6E9',
  UIRed: '#FF0000',
  UIGreen: '#00FF00',
  UIYellow: '#FFFF00'
} as const

export const colors = {
  ttt,
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The default color of white.
   */
  white: palette.neutral100,
  black: '#000000',
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: 'rgba(255, 255, 255, 0.6)',
  textGray: 'rgba(25, 16, 21, 0.6)',
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,

  followButton: palette.button
}
