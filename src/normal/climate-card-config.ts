import { assign, boolean, object, optional } from "superstruct";
import { LovelaceCardConfig } from "mushroom-cards/src/ha";
import {
  EntitySharedConfig,
  entitySharedConfigStruct,
} from "mushroom-cards/src/shared/config/entity-config";
import { lovelaceCardConfigStruct } from "mushroom-cards/src/shared/config/lovelace-card-config";

// Config for the normal (bigger) climate card.
export type BetterThermostatUINormalCardConfig = LovelaceCardConfig &
  EntitySharedConfig & {
    show_current_as_primary?: boolean;
    show_secondary?: boolean;
    disable_buttons?: boolean;
    disable_menu?: boolean;
    prevent_interaction_on_scroll?: boolean;
    disable_eco?: boolean;
  };

export const betterThermostatUINormalCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  entitySharedConfigStruct,
  object({
    show_current_as_primary: optional(boolean()),
    show_secondary: optional(boolean()),
    disable_buttons: optional(boolean()),
    disable_menu: optional(boolean()),
    prevent_interaction_on_scroll: optional(boolean()),
    disable_eco: optional(boolean()),
  })
);