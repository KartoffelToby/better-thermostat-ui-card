import { assign } from "superstruct";
import { LovelaceCardConfig } from "mushroom-cards/src/ha";
import {
  EntitySharedConfig,
  entitySharedConfigStruct,
} from "mushroom-cards/src/shared/config/entity-config";
import { lovelaceCardConfigStruct } from "mushroom-cards/src/shared/config/lovelace-card-config";
import { SharedBtCardConfig, sharedBtConfigStruct } from "../shared/config";

// Config for the normal (bigger) climate card.
export type BetterThermostatUINormalCardConfig = LovelaceCardConfig &
  EntitySharedConfig &
  SharedBtCardConfig;

export const betterThermostatUINormalCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  entitySharedConfigStruct,
  sharedBtConfigStruct,
);
