import { ActionConfig, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'better-thermostat-ui-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

// TODO Add your configuration elements here for type-checking
export interface BetterThermostatUiCardConfig extends LovelaceCardConfig {
  entity: string;
  eco_temperature?: number;
  disable_window?: boolean;
  disable_summer?: boolean;
  theme?: string;
  name?: string;
}
