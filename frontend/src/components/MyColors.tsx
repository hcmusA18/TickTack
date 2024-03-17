// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
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
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)'
  /**
   * The default text color in many components.
   */
  //   text: palette.neutral800,
  //   /**
  //    * Secondary text information.
  //    */
  //   textDim: palette.neutral600,
  //   /**
  //    * The default color of the screen background.
  //    */
  //   background: palette.neutral200,
  //   /**
  //    * The default border color.
  //    */
  //   border: palette.neutral400,
  //   /**
  //    * The main tinting color.
  //    */
  //   tint: palette.primary500,
  //   /**
  //    * A subtle color used for lines.
  //    */
  //   separator: palette.neutral300,
  //   /**
  //    * Error messages.
  //    */
  //   error: palette.angry500,
  //   /**
  //    * Error Background.
  //    *
  //    */
  //   errorBackground: palette.angry100
}
