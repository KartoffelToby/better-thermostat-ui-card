import {
  mdiAlert,
  mdiEye,
  mdiGestureTap,
  mdiPalette,
  mdiTune,
  mdiWindowOpenVariant,
} from "@mdi/js";
import memoizeOne from "memoize-one";
import { HomeAssistant } from "mushroom-cards/src/ha";
import { HaFormSchema } from "mushroom-cards/src/utils/form/ha-form";
import {
  CLIMATE_COLOR_KEYS,
  CLIMATE_HVAC_COLOR_KEYS,
  CLIMATE_PRESET_COLOR_KEYS,
} from "./climate-colors";

// The `as any` casts on the section builders below are deliberate: mushroom's
// HaFormSchema type doesn't model HA's expandable sections (type/flatten/
// expanded/iconPath), which ha-form itself supports.

// Labels resolved through the card's own translations
// (editor.card.climate.*) instead of HA's generic editor strings.
export const CLIMATE_LABELS: string[] = [
  "show_temperature_control",
  "collapsible_controls",
  "show_current_as_primary",
  "show_secondary",
  "disable_buttons",
  "disable_all_buttons",
  "disable_menu",
  "prevent_interaction_on_scroll",
  "disable_eco",
  "disable_humidity",
  "disable_presets",
  "disable_battery_warning",
  "disable_connection_lost_warning",
  "disable_degraded_warning",
  "debug_battery",
  "debug_connection",
  "debug_degraded",
  "low_battery_threshold",
  "window_sensor",
  "humidity_sensor",
  "section_display",
  "section_interaction",
  "section_features",
  "section_warnings",
  "section_sensors",
];

// External window/humidity sensors — only offered for non-BT entities, which
// don't expose that data via attributes.
export const computeSensorsSection = (): HaFormSchema =>
  ({
    name: "section_sensors",
    type: "expandable",
    flatten: true,
    expanded: true,
    iconPath: mdiWindowOpenVariant,
    schema: [
      {
        name: "window_sensor",
        selector: { entity: { domain: ["binary_sensor", "input_boolean"] } },
      },
      {
        name: "humidity_sensor",
        selector: { entity: { domain: ["sensor"], device_class: "humidity" } },
      },
    ],
  }) as any;

// Each card passes exactly the toggles it actually reads.
export const computeDisplaySection = (
  toggles: { name: string }[]
): HaFormSchema =>
  ({
    name: "section_display",
    type: "expandable",
    flatten: true,
    expanded: true,
    iconPath: mdiEye,
    schema: [
      {
        type: "grid",
        name: "",
        schema: toggles.map((t) => ({ ...t, selector: { boolean: {} } })),
      },
    ],
  }) as any;

// Expandable `colors` section: NOT flattened, so ha-form reads/writes the
// nested `colors:` config object. One clearable ui_color picker per mode /
// preset the entity actually supports (no `default_color` ⇒ clearing the
// picker restores the card default). Memoized on joined-string keys;
// undefined means "entity unknown" and falls back to all keys.
export const computeColorsSchema = memoizeOne(
  (hvacModes?: string, presetModes?: string): HaFormSchema => {
    const hvacSlots =
      hvacModes === undefined
        ? [...CLIMATE_HVAC_COLOR_KEYS]
        : CLIMATE_HVAC_COLOR_KEYS.filter((key) =>
            hvacModes.split(",").includes(key)
          );
    const presetSlots =
      presetModes === undefined
        ? [...CLIMATE_PRESET_COLOR_KEYS]
        : CLIMATE_PRESET_COLOR_KEYS.filter((key) =>
            presetModes.split(",").includes(key)
          );
    return {
      name: "colors",
      type: "expandable",
      iconPath: mdiPalette,
      schema: [
        {
          type: "grid",
          name: "",
          schema: [...hvacSlots, ...presetSlots].map((key) => ({
            name: key,
            selector: { ui_color: {} },
          })),
        },
      ],
    } as any;
  }
);

// Labels for the color pickers come from HA's own backend translations
// (per-entity mode/preset names) — no hand-translation of 31 languages.
export const computeColorLabel = (
  hass: HomeAssistant,
  stateObj: any | undefined,
  key: string,
  localize: (k: string) => string
): string | undefined => {
  if (!(CLIMATE_COLOR_KEYS as readonly string[]).includes(key)) {
    return undefined;
  }
  if (stateObj) {
    return (CLIMATE_HVAC_COLOR_KEYS as readonly string[]).includes(key)
      ? hass.formatEntityState(stateObj, key)
      : hass.formatEntityAttributeValue(stateObj, "preset_mode", key);
  }
  return (
    hass.localize(`component.climate.entity_component._.state.${key}`) ||
    hass.localize(`state_attributes.climate.preset_mode.${key}`) ||
    localize(`editor.card.climate.${key}`) ||
    key
  );
};

export const computeInteractionSection = (): HaFormSchema =>
  ({
    name: "section_interaction",
    type: "expandable",
    flatten: true,
    iconPath: mdiGestureTap,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          { name: "disable_buttons", selector: { boolean: {} } },
          { name: "disable_all_buttons", selector: { boolean: {} } },
          { name: "disable_menu", selector: { boolean: {} } },
          { name: "prevent_interaction_on_scroll", selector: { boolean: {} } },
        ],
      },
    ],
  }) as any;

export const computeFeaturesSection = (): HaFormSchema =>
  ({
    name: "section_features",
    type: "expandable",
    flatten: true,
    iconPath: mdiTune,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          { name: "disable_eco", selector: { boolean: {} } },
          { name: "disable_humidity", selector: { boolean: {} } },
          { name: "disable_presets", selector: { boolean: {} } },
        ],
      },
    ],
  }) as any;

// Warnings rely on BT-only attributes (batteries, errors, degraded_mode).
export const computeWarningsSection = (includeDebug: boolean): HaFormSchema =>
  ({
    name: "section_warnings",
    type: "expandable",
    flatten: true,
    iconPath: mdiAlert,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          { name: "disable_battery_warning", selector: { boolean: {} } },
          { name: "disable_connection_lost_warning", selector: { boolean: {} } },
          { name: "disable_degraded_warning", selector: { boolean: {} } },
          ...(includeDebug
            ? [
                { name: "debug_battery", selector: { boolean: {} } },
                { name: "debug_connection", selector: { boolean: {} } },
                { name: "debug_degraded", selector: { boolean: {} } },
              ]
            : []),
        ],
      },
      {
        name: "low_battery_threshold",
        default: 10,
        selector: {
          number: { min: 0, max: 100, step: 1, mode: "box", unit_of_measurement: "%" },
        },
      },
    ],
  }) as any;
