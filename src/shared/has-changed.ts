import { HomeAssistant } from "mushroom-cards/src/ha";

// hass is replaced on every state tick of ANY entity. Only re-render when a
// watched entity, the locale, themes (also carries dark mode), the unit
// system or the connection state actually changed.
export function shouldUpdateForHass(
  oldHass: HomeAssistant | undefined,
  newHass: HomeAssistant,
  entityIds: (string | undefined)[]
): boolean {
  if (!oldHass) return true;
  if (
    oldHass.locale !== newHass.locale ||
    oldHass.themes !== newHass.themes ||
    oldHass.config.unit_system !== newHass.config.unit_system ||
    oldHass.connected !== newHass.connected
  ) {
    return true;
  }
  return entityIds.some(
    (id) => id != null && oldHass.states[id] !== newHass.states[id]
  );
}
