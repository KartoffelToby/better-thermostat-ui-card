import { HomeAssistant } from "mushroom-cards/src/ha";
import { HassEntity } from "home-assistant-js-websocket";

/**
 * `hass.formatEntityName` only resolves an entity's name from its registry
 * context from HA 2026.4. The helper has existed since 2025.10, but with an
 * incompatible signature - bare type strings then, and only structured items
 * between 2025.11 and 2026.3 - so feature detection is not enough and the
 * version has to be checked.
 */
const supportsEntityNames = (hass: HomeAssistant | undefined): boolean => {
  const [major, minor] = (hass?.config?.version ?? "").split(".", 2);
  return Number(major) > 2026 || (Number(major) === 2026 && Number(minor) >= 4);
};

/**
 * Resolves the name to display for an entity. A configured `name` wins, exactly
 * as before; otherwise the name is composed from the entity's registry context
 * so it matches what the built-in cards show, falling back to the friendly name
 * on older Home Assistant versions.
 */
export const computeEntityName = (
  hass: HomeAssistant | undefined,
  stateObj: HassEntity | undefined,
  name: string | undefined,
): string => {
  if (name) return name;
  if (!stateObj) return "";
  if (hass && supportsEntityNames(hass)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (hass as any).formatEntityName(stateObj) || "";
  }
  return stateObj.attributes?.friendly_name || "";
};

/**
 * `formatEntityName` resolves against the entity/device/area/floor registries,
 * and HA swaps the real formatter in asynchronously once translations load.
 * Neither shows up as an entity state change, so without this a rename (or that
 * swap) leaves the rendered name stale until an unrelated update forces a render.
 */
const NAME_SOURCES = ["formatEntityName", "entities", "devices", "areas", "floors"] as const;

export const entityNamesChanged = (
  oldHass: HomeAssistant | undefined,
  newHass: HomeAssistant | undefined,
): boolean => {
  if (!oldHass || !newHass) return false;
  const before = oldHass as unknown as Record<string, unknown>;
  const after = newHass as unknown as Record<string, unknown>;
  return NAME_SOURCES.some((key) => before[key] !== after[key]);
};
