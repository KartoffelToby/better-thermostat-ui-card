import { HomeAssistant } from "mushroom-cards/src/ha";
import { entityNamesChanged } from "./entity-name";

// hass is replaced on every state tick of ANY entity. Only re-render when a
// watched entity, the locale, themes (also carries dark mode), the unit
// system or the connection state actually changed.
export function shouldUpdateForHass(
  oldHass: HomeAssistant | undefined,
  newHass: HomeAssistant,
  entityIds: (string | undefined)[],
): boolean {
  if (!oldHass) return true;
  // Names resolve against the entity/device/area/floor registries, and HA swaps
  // the real formatEntityName in asynchronously once translations load. Neither
  // changes an entity state, so the entity checks below miss both.
  if (entityNamesChanged(oldHass, newHass)) return true;
  if (
    oldHass.locale !== newHass.locale ||
    oldHass.themes !== newHass.themes ||
    oldHass.config.unit_system !== newHass.config.unit_system ||
    oldHass.connected !== newHass.connected ||
    // Formatting can change without any state change (translations loading
    // asynchronously, display-precision edits) — HA core's hasConfigChanged
    // compares the same function identities.
    oldHass.localize !== newHass.localize ||
    oldHass.formatEntityState !== newHass.formatEntityState ||
    oldHass.formatEntityAttributeValue !== newHass.formatEntityAttributeValue
  ) {
    return true;
  }
  return entityIds.some(
    (id) => id != null && oldHass.states[id] !== newHass.states[id],
  );
}
