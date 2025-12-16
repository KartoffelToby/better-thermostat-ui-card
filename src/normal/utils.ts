import { HvacAction, HvacMode } from "mushroom-cards/src/ha";


export const CLIMATE_HVAC_MODE_COLORS: Record<any, string> = {
  auto: "var(--rgb-state-climate-auto)",
  cool: "var(--rgb-state-climate-cool)",
  dry: "var(--rgb-state-climate-dry)",
  fan_only: "var(--rgb-state-climate-fan-only)",
  heat: "var(--rgb-state-climate-heat)",
  heat_cool: "var(--rgb-state-climate-heat-cool)",
  off: "var(--rgb-state-climate-off)",
  eco: "165, 214, 167",
  away: "176, 190, 197",
  boost: "239, 83, 80",
  sleep: "63, 81, 181",
  comfort: "121, 85, 72",
  activity: "230, 74, 25",
  home: "76, 175, 80",
};

export const CLIMATE_HVAC_ACTION_COLORS: Record<HvacAction, string> = {
  cooling: "var(--rgb-state-climate-cool)",
  drying: "var(--rgb-state-climate-dry)",
  heating: "var(--rgb-state-climate-heat)",
  idle: "var(--rgb-state-climate-idle)",
  off: "var(--rgb-state-climate-off)",
};

export const CLIMATE_HVAC_MODE_ICONS: Record<any, string> = {
  none: "mdi:auto-mode",
  auto: "mdi:thermostat-auto",
  cool: "mdi:snowflake",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  heat: "mdi:fire",
  heat_cool: "mdi:sun-snowflake-variant",
  off: "mdi:power",
  eco: "mdi:leaf",
  away: "mdi:airplane-off",
  boost: "mdi:rocket",
  sleep: "mdi:sleep",
  comfort: "mdi:sofa",
  activity: "mdi:run",
  home: "mdi:home-outline",
};

export const CLIMATE_HVAC_ACTION_ICONS: Record<HvacAction, string> = {
  cooling: "mdi:snowflake",
  drying: "mdi:water-percent",
  heating: "mdi:fire",
  idle: "mdi:clock-outline",
  off: "mdi:power",
};

export function getHvacModeColor(hvacMode: HvacMode): string {
  return CLIMATE_HVAC_MODE_COLORS[hvacMode] ?? CLIMATE_HVAC_MODE_COLORS.off;
}

export function getHvacActionColor(hvacAction: HvacAction): string {
  return (
    CLIMATE_HVAC_ACTION_COLORS[hvacAction] ?? CLIMATE_HVAC_ACTION_COLORS.off
  );
}

export function getHvacModeIcon(hvacMode: HvacMode): string {
  return CLIMATE_HVAC_MODE_ICONS[hvacMode] ?? "mdi:thermostat";
}

export function getHvacActionIcon(hvacAction: HvacAction): string | undefined {
  return CLIMATE_HVAC_ACTION_ICONS[hvacAction] ?? "";
}
