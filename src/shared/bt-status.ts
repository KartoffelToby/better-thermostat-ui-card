// Pure helpers for the Better Thermostat status attributes (batteries, errors,
// degraded_mode). BT serializes these as JSON strings on the climate entity.
import memoizeOne from "memoize-one";
import { BtClimateEntity } from "./climate";
import { SharedBtCardConfig } from "./config";

interface BatteryState {
  battery: string;
}

export interface LowBatteryEntity {
  name: string;
  battery: number;
}

// `batteries` is a JSON object keyed by entity name; each value's `battery` is
// either a percentage string or a binary "on"/"off" (low-battery flag).
// Memoized on the raw attribute string so the JSON.parse doesn't run on
// every render.
export const parseLowBattery = memoizeOne(function (
  batteriesRaw: string | undefined,
  threshold: number
): LowBatteryEntity | undefined {
  if (batteriesRaw === undefined) return undefined;
  try {
    const batteries = Object.entries(
      JSON.parse(batteriesRaw) as Record<string, BatteryState>
    );
    const parsed = batteries.map(([name, data]) => ({
      name,
      battery:
        data.battery === "on"
          ? threshold - 1
          : data.battery === "off"
            ? 100
            : parseFloat(data.battery),
    }));
    return parsed.find((entity) => entity.battery < threshold);
  } catch (_e) {
    return undefined;
  }
});

// `errors` is a JSON array of entity ids (strings) or objects naming the
// unreachable entity. Memoized on the raw attribute string.
export const parseErrorEntityId = memoizeOne(function (
  errorsRaw: string | undefined
): string | undefined {
  if (errorsRaw === undefined) return undefined;
  try {
    const errors = JSON.parse(errorsRaw);
    if (!Array.isArray(errors) || errors.length === 0) return undefined;
    const first = errors[0];
    if (typeof first === "string") return first;
    if (typeof first === "object" && first !== null) {
      return first.entity_id || first.entity || first.name;
    }
    return undefined;
  } catch (_e) {
    return undefined;
  }
});

export function getLowBattery(
  entity: BtClimateEntity,
  config?: SharedBtCardConfig
): LowBatteryEntity | undefined {
  if (config?.debug_battery) return { name: "Debug Battery", battery: 5 };
  if (config?.disable_battery_warning) return undefined;
  return parseLowBattery(
    entity.attributes?.batteries,
    config?.low_battery_threshold ?? 10
  );
}

export function getErrorEntityId(
  entity: BtClimateEntity,
  config?: SharedBtCardConfig
): string | undefined {
  if (config?.debug_connection) return "Debug Connection";
  if (config?.disable_connection_lost_warning) return undefined;
  return parseErrorEntityId(entity.attributes?.errors);
}

export function isDegraded(
  entity: BtClimateEntity,
  config?: SharedBtCardConfig
): boolean {
  return (
    !!config?.debug_degraded ||
    (!config?.disable_degraded_warning &&
      entity.attributes?.degraded_mode === true)
  );
}
