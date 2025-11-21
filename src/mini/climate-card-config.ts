import { array, assign, boolean, object, optional, string } from "superstruct";
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
    show_temperature_control?: false;
    collapsible_controls?: boolean;
    disable_eco?: boolean;
  };

export const climateCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  assign(
    entitySharedConfigStruct,
    appearanceSharedConfigStruct,
    actionsSharedConfigStruct
  ),
  object({
    show_temperature_control: optional(boolean()),
    collapsible_controls: optional(boolean()),
    disable_eco: optional(boolean()),
  })
);
