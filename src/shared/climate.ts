import type {
  ClimateEntity,
  HomeAssistant,
  LovelaceCardConfig,
} from "mushroom-cards/src/ha";

// Deep import: the ha barrel touches `window` at module scope, which would
// break Node-side consumers (bun test).
export {
  supportsFeature,
  supportsFeatureFromAttributes,
} from "mushroom-cards/src/ha/common/entity/supports-feature";

// Events the cards fire via mushroom's typed fireEvent; mushroom itself only
// declares value-changed/change.
declare global {
  interface HASSDomEvents {
    "hass-more-info": { entityId: string | null };
    "config-changed": { config: LovelaceCardConfig };
  }
}

export const UNAVAILABLE = "unavailable";
export const UNKNOWN = "unknown";

// Climate feature bits, mirroring HA core's ClimateEntityFeature
// (homeassistant/components/climate/const.py).
export const ClimateEntityFeature = {
  TARGET_TEMPERATURE: 1,
  TARGET_TEMPERATURE_RANGE: 2,
  TARGET_HUMIDITY: 4,
  FAN_MODE: 8,
  PRESET_MODE: 16,
  SWING_MODE: 32,
  AUX_HEAT: 64,
  TURN_OFF: 128,
  TURN_ON: 256,
  SWING_HORIZONTAL_MODE: 512,
} as const;

// Attributes the Better Thermostat integration adds on top of a plain climate
// entity. Numeric setpoints are re-declared as nullable: integrations
// (e.g. daikin_onecta in fan_only/dry) report them as null or drop them.
export type BtClimateAttributes = Omit<
  ClimateEntity["attributes"],
  "temperature" | "current_temperature" | "min_temp" | "max_temp"
> & {
  temperature?: number | null;
  current_temperature?: number | null;
  min_temp?: number;
  max_temp?: number;
  call_for_heat?: boolean;
  window_open?: boolean | string;
  batteries?: string;
  errors?: string;
  degraded_mode?: boolean;
  eco_mode?: boolean;
  [key: string]: any;
};

export type BtClimateEntity = Omit<ClimateEntity, "attributes"> & {
  attributes: BtClimateAttributes;
};

export function isEcoModeActive(stateObj: BtClimateEntity): boolean {
  return (
    stateObj.attributes.preset_mode === "eco" ||
    stateObj.attributes.eco_mode === true
  );
}

// Set an hvac mode or preset by name. A name matching one of the entity's
// hvac_modes wins; otherwise it is treated as a preset (selecting the active
// preset again clears it back to "none"). Returns whether a service was called.
export function setClimateMode(
  hass: HomeAssistant,
  stateObj: BtClimateEntity,
  mode: string,
): boolean {
  if (
    (stateObj.attributes.hvac_modes as string[] | undefined)?.includes(mode)
  ) {
    hass.callService("climate", "set_hvac_mode", {
      entity_id: stateObj.entity_id,
      hvac_mode: mode,
    });
    return true;
  }
  if (stateObj.attributes.preset_modes?.includes(mode)) {
    hass.callService("climate", "set_preset_mode", {
      entity_id: stateObj.entity_id,
      preset_mode: mode === stateObj.attributes.preset_mode ? "none" : mode,
    });
    return true;
  }
  return false;
}
