import "./hui-climate-hvac-modes-card-feature";
import "./hui-climate-preset-modes-card-feature";
import type { LovelaceCardFeature, LovelaceCardFeatureConfig } from "./types";

const FEATURE_TAGS: Record<string, string> = {
  "climate-hvac-modes": "cts-hui-climate-hvac-modes-card-feature",
  "climate-preset-modes": "cts-hui-climate-preset-modes-card-feature",
};

export const getCardFeatureTag = (type?: string): string | undefined =>
  type ? FEATURE_TAGS[type] : undefined;

export const createCardFeatureElement = (
  config: LovelaceCardFeatureConfig
): LovelaceCardFeature | undefined => {
  const tag = getCardFeatureTag(config?.type);
  if (!tag) {
    console.warn(
      `[better-thermostat-card] feature type "${config?.type}" is not bundled; skipping. Supported: ${Object.keys(
        FEATURE_TAGS
      ).join(", ")}`
    );
    return undefined;
  }
  return document.createElement(tag) as LovelaceCardFeature;
};
