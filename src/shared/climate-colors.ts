import { css } from "lit";
import { HvacAction, HvacMode } from "mushroom-cards/src/ha";
import { computeCssColor } from "./color";

// Modes the card colors/icons: hvac modes plus BT preset modes.
export type ClimateMode =
  | HvacMode
  | "none"
  | "eco"
  | "away"
  | "boost"
  | "sleep"
  | "comfort"
  | "activity"
  | "home";

// Keyed by string: HA reports actions beyond mushroom's HvacAction union
// (preheating, defrosting, fan).
export const CLIMATE_HVAC_ACTION_TO_MODE: Record<string, HvacMode> = {
  cooling: "cool",
  defrosting: "heat",
  drying: "dry",
  fan: "fan_only",
  heating: "heat",
  idle: "off",
  off: "off",
  preheating: "heat",
};

// Every color the cards render — 7 hvac modes + 7 BT presets. Each key has a
// --bt-color-<key> CSS variable (underscores become dashes) that themes and
// the `colors:` card config can override.
export const CLIMATE_HVAC_COLOR_KEYS = [
  "auto",
  "cool",
  "dry",
  "fan_only",
  "heat",
  "heat_cool",
  "off",
] as const;

export const CLIMATE_PRESET_COLOR_KEYS = [
  "eco",
  "away",
  "boost",
  "sleep",
  "comfort",
  "activity",
  "home",
] as const;

export const CLIMATE_COLOR_KEYS = [
  ...CLIMATE_HVAC_COLOR_KEYS,
  ...CLIMATE_PRESET_COLOR_KEYS,
] as const;

export type ClimateColorKey = (typeof CLIMATE_COLOR_KEYS)[number];

// Card config: color per mode/preset — a theme token (`deep-orange`), or any
// raw CSS color (`#ff00ff`, `rgb(1,2,3)`) as escape hatch.
export type ClimateColorsConfig = Partial<Record<ClimateColorKey, string>>;

const colorVar = (key: string) => `var(--bt-color-${key.replace(/_/g, "-")})`;

export function climateColor(mode: ClimateMode | string): string {
  const key = (CLIMATE_COLOR_KEYS as readonly string[]).includes(mode)
    ? mode
    : "off";
  return colorVar(key);
}

// Action → color key; "idle" has its own color (core's --state-climate-idle),
// unknown actions fall back to "off" like the old triplet map did.
const CLIMATE_ACTION_COLOR_KEYS: Record<HvacAction, string> = {
  cooling: "cool",
  drying: "dry",
  heating: "heat",
  idle: "idle",
  off: "off",
};

export function climateActionColor(action: HvacAction | string): string {
  return colorVar(CLIMATE_ACTION_COLOR_KEYS[action as HvacAction] ?? "off");
}

// Color for the entity's current state: the themeable --bt-color-* layer for
// known modes (so the `colors:` config and themes apply everywhere — dial,
// buttons, features alike), HA's unavailable color for unavailable entities.
export function climateStateColor(stateObj: { state: string }): string {
  if (stateObj.state === "unavailable") {
    return "var(--state-unavailable-color)";
  }
  return climateColor(stateObj.state);
}

// Inline style overrides for the ha-card element from the `colors:` config.
export function climateColorOverrides(
  colors?: ClimateColorsConfig,
): Record<string, string> {
  const styles: Record<string, string> = {};
  if (!colors) return styles;
  for (const [key, value] of Object.entries(colors)) {
    if (!value || !(CLIMATE_COLOR_KEYS as readonly string[]).includes(key)) {
      continue;
    }
    styles[`--bt-color-${key.replace(/_/g, "-")}`] = computeCssColor(value);
  }
  return styles;
}

// Defaults defined in terms of the legacy RGB-triplet chain
// (--rgb-state-climate-* from mushroom/HA themes, --bt-state-* from
// btStateColorsStyle) so default rendering stays pixel-identical and existing
// theme overrides keep working. Added to the two cards' static styles only —
// inner controls consume the inherited variables.
export const climateColorDefaultStyles = css`
  :host {
    --bt-color-auto: rgb(var(--rgb-state-climate-auto));
    --bt-color-cool: rgb(var(--rgb-state-climate-cool));
    --bt-color-dry: rgb(var(--rgb-state-climate-dry));
    --bt-color-fan-only: rgb(var(--rgb-state-climate-fan-only));
    --bt-color-heat: rgb(var(--rgb-state-climate-heat));
    --bt-color-heat-cool: rgb(var(--rgb-state-climate-heat-cool));
    --bt-color-off: rgb(var(--rgb-state-climate-off));
    --bt-color-idle: rgb(var(--rgb-state-climate-idle));
    --bt-color-eco: rgb(var(--bt-state-eco));
    --bt-color-away: rgb(var(--bt-state-away));
    --bt-color-boost: rgb(var(--bt-state-boost));
    --bt-color-sleep: rgb(var(--bt-state-sleep));
    --bt-color-comfort: rgb(var(--bt-state-comfort));
    --bt-color-activity: rgb(var(--bt-state-activity));
    --bt-color-home: rgb(var(--bt-state-home));
    --bt-color-grey: rgb(var(--rgb-grey));
    --bt-color-summer: #ffb300;
    --bt-color-humidity: #6fa3d6;
    --bt-badge-background: #202020;
  }
`;

export const CLIMATE_HVAC_MODE_ICONS: Partial<Record<ClimateMode, string>> = {
  none: "mdi:auto-mode",
  auto: "mdi:thermostat-auto",
  cool: "mdi:snowflake",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  heat: "mdi:fire",
  heat_cool: "mdi:sun-snowflake-variant",
  off: "mdi:power",
  eco: "mdi:leaf",
  away: "mdi:account-arrow-right",
  boost: "mdi:rocket-launch",
  sleep: "mdi:bed",
  comfort: "mdi:sofa",
  activity: "mdi:motion-sensor",
  home: "mdi:home",
};

export const CLIMATE_HVAC_ACTION_ICONS: Record<HvacAction, string> = {
  cooling: "mdi:snowflake",
  drying: "mdi:water-percent",
  heating: "mdi:fire",
  idle: "mdi:clock-outline",
  off: "mdi:power",
};

export function getHvacModeIcon(hvacMode: ClimateMode | string): string {
  return CLIMATE_HVAC_MODE_ICONS[hvacMode as ClimateMode] ?? "mdi:thermostat";
}

export function getHvacActionIcon(hvacAction: HvacAction): string {
  return CLIMATE_HVAC_ACTION_ICONS[hvacAction] ?? "";
}
