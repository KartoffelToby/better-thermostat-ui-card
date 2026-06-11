import { assign, array, any, boolean, number, object, optional, string } from "superstruct";
import { LovelaceCardConfig } from "mushroom-cards/src/ha";
import {
  EntitySharedConfig,
  entitySharedConfigStruct,
} from "mushroom-cards/src/shared/config/entity-config";
import { lovelaceCardConfigStruct } from "mushroom-cards/src/shared/config/lovelace-card-config";

// Config for the normal (bigger) climate card.
export type BetterThermostatUINormalCardConfig = LovelaceCardConfig &
  EntitySharedConfig & {
    features?: any[];
    collapsible_controls?: boolean;
    show_current_as_primary?: boolean;
    show_secondary?: boolean;
    disable_buttons?: boolean;
    disable_all_buttons?: boolean;
    disable_menu?: boolean;
    prevent_interaction_on_scroll?: boolean;
    disable_eco?: boolean;
    disable_humidity?: boolean;
    disable_presets?: boolean;
    disable_battery_warning?: boolean;
    disable_connection_lost_warning?: boolean;
    disable_degraded_warning?: boolean;
    low_battery_threshold?: number;
    debug_battery?: boolean;
    debug_connection?: boolean;
    debug_degraded?: boolean;
    // External sensors for non Better Thermostat entities
    window_sensor?: string;
    humidity_sensor?: string;
  };

export const betterThermostatUINormalCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  entitySharedConfigStruct,
  object({
    features: optional(array(any())),
    collapsible_controls: optional(boolean()),
    show_current_as_primary: optional(boolean()),
    show_secondary: optional(boolean()),
    disable_buttons: optional(boolean()),
    disable_all_buttons: optional(boolean()),
    disable_menu: optional(boolean()),
    prevent_interaction_on_scroll: optional(boolean()),
    disable_eco: optional(boolean()),
    disable_humidity: optional(boolean()),
    disable_presets: optional(boolean()),
    disable_battery_warning: optional(boolean()),
    disable_connection_lost_warning: optional(boolean()),
    disable_degraded_warning: optional(boolean()),
    low_battery_threshold: optional(number()),
    debug_battery: optional(boolean()),
    debug_connection: optional(boolean()),
    debug_degraded: optional(boolean()),
    window_sensor: optional(string()),
    humidity_sensor: optional(string()),
  })
);