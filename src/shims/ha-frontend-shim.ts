import { css } from "lit";

export type ClimateEntity = any;

export const CLIMATE_HVAC_ACTION_TO_MODE: Record<string, string> = {
  heat: "heat",
  cool: "cool",
  idle: "off",
  heat_cool: "heat_cool",
  fan: "fan_only",
};

// Minimal helpers copied/derived from ha-frontend implementation to avoid
// bundling the whole HA frontend codebase while keeping the real logic.
const UNAVAILABLE = "unavailable";
const UNKNOWN = "unknown";
const OFF = "off";
const UNAVAILABLE_STATES = [UNAVAILABLE, UNKNOWN];
const SLUGIFY_REPLACEMENTS = {
  // Minimal mapping for ASCII normalization; keep simple
};

function isUnavailableState(state: string | undefined) {
  return state ? UNAVAILABLE_STATES.includes(state) : false;
}

function computeDomain(entityId: string): string {
  return entityId.substring(0, entityId.indexOf("."));
}

function computeGroupDomain(stateObj: any) {
  const entityIds = stateObj.attributes?.entity_id || [];
  const uniqueDomains = [...new Set(entityIds.map((id: string) => computeDomain(id)))];
  return uniqueDomains.length === 1 ? uniqueDomains[0] : undefined;
}

function slugify(value: string, delimiter = "_") {
  if (!value) return "";
  // Basic safe slugify fallback for the purpose of computing CSS variable names
  return value.toString().toLowerCase().replace(/[^a-z0-9]+/g, delimiter).replace(new RegExp(`${delimiter}+`, "g"), delimiter).replace(new RegExp(`^${delimiter}+|${delimiter}+$`, "g"), "") || "unknown";
}

function batteryStateColorProperty(state: string) {
  const value = Number(state);
  if (isNaN(value)) return undefined;
  if (value >= 70) return "--state-sensor-battery-high-color";
  if (value >= 30) return "--state-sensor-battery-medium-color";
  return "--state-sensor-battery-low-color";
}

function computeCssVariable(props: string[] | string | undefined) {
  if (Array.isArray(props)) {
    return (props.slice().reverse() as string[]).reduce((str, variable) => `var(${variable}${str ? `, ${str}` : ""})`, undefined as any);
  }
  return `var(${props})`;
}

function domainColorProperties(domain: string, deviceClass: string | undefined, state: string, active: boolean) {
  const properties: string[] = [];
  const stateKey = slugify(state, "_");
  const activeKey = active ? "active" : "inactive";
  if (deviceClass) {
    properties.push(`--state-${domain}-${deviceClass}-${stateKey}-color`);
  }
  properties.push(`--state-${domain}-${stateKey}-color`, `--state-${domain}-${activeKey}-color`, `--state-${activeKey}-color`);
  return properties;
}

function domainStateColorProperties(domain: string, stateObj: any, state?: string): string[] {
  const compareState = state !== undefined ? state : stateObj.state;
  const active = stateActive(stateObj, state);
  return domainColorProperties(domain, stateObj.attributes?.device_class, compareState, active);
}

const STATE_COLORED_DOMAIN = new Set([
  "alarm_control_panel",
  "alert",
  "automation",
  "binary_sensor",
  "calendar",
  "camera",
  "climate",
  "cover",
  "device_tracker",
  "fan",
  "group",
  "humidifier",
  "input_boolean",
  "lawn_mower",
  "light",
  "lock",
  "media_player",
  "person",
  "plant",
  "remote",
  "schedule",
  "script",
  "siren",
  "sun",
  "switch",
  "timer",
  "update",
  "vacuum",
  "valve",
  "water_heater",
  "weather",
]);

export function stateActive(stateObj: any, state?: string): boolean {
  const domain = computeDomain(stateObj.entity_id);
  const compareState = state !== undefined ? state : stateObj?.state;
  if (["button", "event", "input_button", "scene"].includes(domain)) {
    return compareState !== UNAVAILABLE;
  }
  if (isUnavailableState(compareState)) return false;
  if (compareState === OFF && domain !== "alert") return false;
  switch (domain) {
    case "alarm_control_panel":
      return compareState !== "disarmed";
    case "alert":
      return compareState !== "idle";
    case "cover":
      return compareState !== "closed";
    case "device_tracker":
    case "person":
      return compareState !== "not_home";
    case "lawn_mower":
      return ["mowing", "error"].includes(compareState);
    case "lock":
      return compareState !== "locked";
    case "media_player":
      return compareState !== "standby";
    case "vacuum":
      return !["idle", "docked", "paused"].includes(compareState);
    case "valve":
      return compareState !== "closed";
    case "plant":
      return compareState === "problem";
    case "group":
      return ["on", "home", "open", "locked", "problem"].includes(compareState);
    case "timer":
      return compareState === "active";
    case "camera":
      return compareState === "streaming";
  }
  return true;
}

export const stateColorCss = (stateObj: any, state?: string) => {
  const compareState = state !== undefined ? state : stateObj?.state;
  if (compareState === UNAVAILABLE) return `var(--state-unavailable-color)`;
  const properties = stateColorProperties(stateObj, state);
  if (properties) return computeCssVariable(properties);
  return undefined as any;
};

export const stateColorProperties = (stateObj: any, state?: string): string[] | undefined => {
  const compareState = state !== undefined ? state : stateObj?.state;
  const domain = computeDomain(stateObj.entity_id);
  const dc = stateObj.attributes?.device_class;
  if (domain === "sensor" && dc === "battery") {
    const property = batteryStateColorProperty(compareState);
    if (property) return [property];
  }
  if (domain === "group") {
    const groupDomain = computeGroupDomain(stateObj);
    if (groupDomain && STATE_COLORED_DOMAIN.has(groupDomain as unknown as string)) {
      return domainStateColorProperties(groupDomain as unknown as string, stateObj, state);
    }
  }
  if (STATE_COLORED_DOMAIN.has(domain)) {
    return domainStateColorProperties(domain, stateObj, state);
  }
  return undefined;
};

export const stateControlCircularSliderStyle = css``;

export function createStateControlCircularSliderController(_host: any) {
  let value: any = undefined;
  return {
    observe(_element?: HTMLElement) {},
    unobserve(_element?: HTMLElement) {},
    get value() {
      return value;
    },
  };
}

export default {};
