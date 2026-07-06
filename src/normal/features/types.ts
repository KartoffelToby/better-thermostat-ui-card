import { HomeAssistant } from "mushroom-cards/src/ha";

export interface LovelaceCardFeatureContext {
  entity_id?: string;
}

// Restrict the entity's modes to the ones the feature config selects.
export const filterModes = (
  modes: string[] | undefined,
  configured?: string[],
): string[] => {
  if (!modes) {
    return [];
  }
  return configured ? configured.filter((mode) => modes.includes(mode)) : modes;
};

export type LovelaceCardFeaturePosition = "bottom" | "inline";

export interface LovelaceCardFeatureConfig {
  type: string;
  [key: string]: any;
}

export interface ClimateHvacModesCardFeatureConfig {
  type: "climate-hvac-modes";
  style?: "dropdown" | "icons";
  hvac_modes?: string[];
}

export interface ClimatePresetModesCardFeatureConfig {
  type: "climate-preset-modes";
  style?: "dropdown" | "icons";
  preset_modes?: string[];
}

export interface LovelaceCardFeature extends HTMLElement {
  hass?: HomeAssistant;
  context?: LovelaceCardFeatureContext;
  color?: string;
  setConfig(config: LovelaceCardFeatureConfig): void;
}
