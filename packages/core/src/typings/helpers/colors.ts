export enum ColorSchema {
  britecharts,
  grey,
  orange,
  blueGreen,
  teal,
  green,
  yellow,
  pink,
  purple,
  red
}

export type ColorsSchemaHumanType = {
  [key in keyof typeof ColorSchema]: string
}

export type ColorsSchemasType = string[]
export type ColorGradientType = [string, string]

export type ColorSchemas = {
  [key in keyof typeof ColorSchema]: ColorsSchemasType
}

export enum ColorGradient {
  greenBlue,
  orangePink,
  bluePurple
}

export type ColorGradients = {
  [key in keyof typeof ColorGradient]: ColorGradientType
}

export type ColorGradientsHuman = {
  [key in keyof typeof ColorGradient]: string
}

export enum SingleColor {
  aloeGreen,
  greenColor,
  blueColor,
  yellowColor,
  orangeColor,
  pinkColor,
  purpleColor
}

export type SingleColors = {
  [key in keyof typeof SingleColor]: ColorsSchemasType
}

export type SingleColorsHuman = {
  [key in keyof typeof SingleColor]: string
}

// The `colors` object the package exports used to be declared here, as an
// ambient `const`. Gone for the same reason as `constants`: the real one is
// `charts/helpers/color.ts`'s default export, which `src/index.ts` exports as
// `colors`, and its generated declaration says what it is. The six types above
// stay -- `color.ts` annotates itself with them, so they are still the shared
// vocabulary rather than a parallel description of it.
