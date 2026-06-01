import { array, assign, any, boolean, number, object, optional, string } from "superstruct";
import { HvacMode, LovelaceCardConfig } from "mushroom-cards/src/ha";
import {
  ActionsSharedConfig,
  actionsSharedConfigStruct,
} from "mushroom-cards/src/shared/config/actions-config";
import {
  AppearanceSharedConfig,
  appearanceSharedConfigStruct,
} from "mushroom-cards/src/shared/config/appearance-config";
import {
  EntitySharedConfig,
  entitySharedConfigStruct,
} from "mushroom-cards/src/shared/config/entity-config";
import { lovelaceCardConfigStruct } from "mushroom-cards/src/shared/config/lovelace-card-config";

export const HVAC_MODES: HvacMode[] = [
  "auto",
  "heat_cool",
  "heat",
  "cool",
  "dry",
  "fan_only",
  "off",
];

export type BetterThermostatUISmallCardConfig = LovelaceCardConfig &
  EntitySharedConfig &
  AppearanceSharedConfig &
  ActionsSharedConfig & {
    features?: any[];
    show_temperature_control?: boolean;
    collapsible_controls?: boolean;
    show_current_as_primary?: boolean;
    show_secondary?: boolean;
    disable_buttons?: boolean;
    disable_menu?: boolean;
    prevent_interaction_on_scroll?: boolean;
    disable_eco?: boolean;
    disable_humidity?: boolean;
    disable_battery_warning?: boolean;
    disable_connection_lost_warning?: boolean;
    disable_degraded_warning?: boolean;
    low_battery_threshold?: number;
  };

export const climateCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  assign(
    entitySharedConfigStruct,
    appearanceSharedConfigStruct,
    actionsSharedConfigStruct
  ),
  object({
    features: optional(array(any())),
    show_temperature_control: optional(boolean()),
    collapsible_controls: optional(boolean()),
    show_current_as_primary: optional(boolean()),
    show_secondary: optional(boolean()),
    disable_buttons: optional(boolean()),
    disable_menu: optional(boolean()),
    prevent_interaction_on_scroll: optional(boolean()),
    disable_eco: optional(boolean()),
    disable_humidity: optional(boolean()),
    disable_battery_warning: optional(boolean()),
    disable_connection_lost_warning: optional(boolean()),
    disable_degraded_warning: optional(boolean()),
    low_battery_threshold: optional(number()),
  })
);
