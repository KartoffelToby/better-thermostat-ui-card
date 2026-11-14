import { HomeAssistant } from "mushroom-cards/src/ha";

export interface ExternalSensorsConfig {
  window_sensor?: string;
  humidity_sensor?: string;
  disable_humidity?: boolean;
}

// Better Thermostat entities always expose `call_for_heat`; anything else is
// treated as a plain climate entity that may rely on user-configured sensors.
export function isBtEntity(stateObj: any): boolean {
  return stateObj?.attributes?.call_for_heat !== undefined;
}

// Stub entity for the card picker preview: prefer a Better Thermostat entity,
// fall back to the first climate entity.
export function findBtStubEntity(hass: HomeAssistant): string | undefined {
  const climates = Object.keys(hass.states).filter(
    (e) => e.split(".")[0] === "climate",
  );
  return climates.find((e) => isBtEntity(hass.states[e])) ?? climates[0];
}

const SENSOR_OPEN_STATES = ["on", "open", "true"];

// Only an actual boolean true or an explicit "true"-like string counts;
// Boolean() would treat strings such as "false" as open.
function isOpenAttribute(value: unknown): boolean {
  return (
    value === true ||
    (typeof value === "string" &&
      SENSOR_OPEN_STATES.includes(value.toLowerCase()))
  );
}

export function isWindowOpen(
  hass: HomeAssistant | undefined,
  stateObj: any,
  config?: ExternalSensorsConfig,
): boolean {
  if (isBtEntity(stateObj)) {
    return isOpenAttribute(stateObj.attributes?.window_open);
  }
  const sensorId = config?.window_sensor;
  if (!sensorId) return false;
  const sensor = hass?.states?.[sensorId];
  if (!sensor) return false;
  return SENSOR_OPEN_STATES.includes(String(sensor.state).toLowerCase());
}

// Better Thermostat reports a configured door contact separately from the
// window contact; both suspend heating. The card has no door sensor option
// for plain climate entities.
export function isDoorOpen(
  stateObj: { attributes?: Record<string, unknown> } | undefined,
): boolean {
  return (
    isBtEntity(stateObj) && isOpenAttribute(stateObj?.attributes?.door_open)
  );
}

export function formatHumidity(
  hass: HomeAssistant | undefined,
  stateObj: any,
  config?: ExternalSensorsConfig,
): string | undefined {
  if (!hass || config?.disable_humidity) return undefined;
  if (stateObj?.attributes?.current_humidity != null) {
    // Unlike a sensor entity (formatted below with the user's registry
    // display-precision), the climate attribute carries the integration's
    // raw value and has no precision setting — some integrations report
    // "58.49". Whole percent is the sensible display for relative humidity.
    const humidity = Number(stateObj.attributes.current_humidity);
    return hass.formatEntityAttributeValue(
      stateObj,
      "current_humidity",
      Number.isFinite(humidity) ? Math.round(humidity) : undefined,
    );
  }
  if (!isBtEntity(stateObj) && config?.humidity_sensor) {
    const sensor = hass.states?.[config.humidity_sensor];
    if (sensor && !isNaN(Number(sensor.state))) {
      return hass.formatEntityState(sensor);
    }
  }
  return undefined;
}
