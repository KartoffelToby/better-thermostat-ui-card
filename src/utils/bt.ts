import { HomeAssistant } from "mushroom-cards/src/ha";

export interface ExternalSensorsConfig {
  window_sensor?: string;
  humidity_sensor?: string;
  disable_humidity?: boolean;
}

// Better Thermostat entities always expose `call_for_heat`; anything else is
// treated as a plain climate entity that may rely on user-configured sensors.
export function isBtEntity(stateObj: any): boolean {
  return (stateObj?.attributes as any)?.call_for_heat !== undefined;
}

const SENSOR_OPEN_STATES = ["on", "open", "true"];

export function isWindowOpen(
  hass: HomeAssistant | undefined,
  stateObj: any,
  config?: ExternalSensorsConfig
): boolean {
  if (isBtEntity(stateObj)) {
    return Boolean((stateObj.attributes as any).window_open);
  }
  const sensorId = config?.window_sensor;
  if (!sensorId) return false;
  const sensor = hass?.states?.[sensorId];
  if (!sensor) return false;
  return SENSOR_OPEN_STATES.includes(String(sensor.state).toLowerCase());
}

export function formatHumidity(
  hass: HomeAssistant | undefined,
  stateObj: any,
  config?: ExternalSensorsConfig
): string | undefined {
  if (!hass || config?.disable_humidity) return undefined;
  if (stateObj?.attributes?.current_humidity != null) {
    return hass.formatEntityAttributeValue(stateObj, "current_humidity");
  }
  if (!isBtEntity(stateObj) && config?.humidity_sensor) {
    const sensor = hass.states?.[config.humidity_sensor];
    if (sensor && !isNaN(Number(sensor.state))) {
      return hass.formatEntityState(sensor);
    }
  }
  return undefined;
}
