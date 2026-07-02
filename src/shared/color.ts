// Clone of HA core's src/common/color/compute-color.ts: theme color tokens
// map to their CSS variables; anything else (hex, rgb(), named CSS colors)
// passes through as raw CSS — that is the YAML escape hatch.
export const THEME_COLORS = new Set([
  "primary",
  "accent",
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "light-grey",
  "grey",
  "dark-grey",
  "blue-grey",
  "black",
  "white",
  "disabled",
]);

export function computeCssColor(color: string): string {
  if (THEME_COLORS.has(color)) {
    return `var(--${color}-color)`;
  }
  return color;
}

// Alpha for any color value (including var() chains), without needing the
// legacy RGB-triplet variables. alpha is a fraction, e.g. 0.2.
export function alphaColor(color: string, alpha: number): string {
  return `color-mix(in srgb, ${color} ${alpha * 100}%, transparent)`;
}
