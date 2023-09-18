import { LitElement } from 'lit';
import { html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import { assert } from "superstruct";
import { fireEvent, LovelaceCardEditor, atLeastHaVersion, HomeAssistant } from "./ha";
import setupCustomlocalize from "./localize/localize";
import { ClimateCardConfig, climateCardConfigStruct } from "./climate-card-config";

const GENERIC_LABELS = [
    "icon_color",
    "layout",
    "fill_container",
    "primary_info",
    "secondary_info",
    "icon_type",
    "content_info",
    "use_entity_picture",
    "collapsible_controls",
    "icon_animation",
];

const loadHaComponents = (version: string) => {
    if (
        !customElements.get("ha-form") ||
        (!customElements.get("hui-action-editor") && !atLeastHaVersion(version, 2022, 11))
    ) {
        (customElements.get("hui-button-card") as any)?.getConfigElement();
    }
    if (!customElements.get("ha-entity-picker")) {
        (customElements.get("hui-entities-card") as any)?.getConfigElement();
    }
};

const CLIMATE_LABELS = ["eco_temperature", "disable_window", "disable_summer", "disable_eco", "disable_heat", "disable_off", "disable_menu", "disable_battery_warning", "set_current_as_main", "disable_buttons"] as string[];

const computeSchema = memoizeOne(
    (): any[] => [
        { name: "entity", selector: { entity: { domain: ["climate"] } } },
        { name: "name", selector: { text: {} } },
        { name: "eco_temperature", selector: { number: {placeholder: 20, min: 5, max: 45, default: 20} } },
        {
            type: "grid",
            name: "",
            schema: [
                { name: "disable_window", selector: { boolean: {} } },
                { name: "disable_summer", selector: { boolean: {} } },
                { name: "disable_eco", selector: { boolean: {} } },
                { name: "disable_heat", selector: { boolean: {} } },
                { name: "disable_off", selector: { boolean: {} } },
                { name: "disable_menu", selector: { boolean: {} } },
                { name: "disable_battery_warning", selector: { boolean: {} } },
                { name: "set_current_as_main", selector: { boolean: {} } },
                { name: "disable_buttons", selector: { boolean: {}}}
            ],
        },
    ]
);

@customElement("better-thermostat-ui-card-editor")
export class ClimateCardEditor extends LitElement implements LovelaceCardEditor {
    @state() private _config?: ClimateCardConfig;
    @property({ attribute: false }) public hass!: HomeAssistant;

    connectedCallback() {
        super.connectedCallback();
        void loadHaComponents(this.hass.connection.haVersion);
    }

    public setConfig(config: ClimateCardConfig): void {
        assert(config, climateCardConfigStruct);
        this._config = config;
    }

    private _computeLabel = (schema: any) => {
        const customLocalize = setupCustomlocalize(this.hass!);

        if (GENERIC_LABELS.includes(schema.name)) {
            return customLocalize(`editor.card.generic.${schema.name}`);
        }
        if (CLIMATE_LABELS.includes(schema.name)) {
            return customLocalize(`editor.card.climate.${schema.name}`);
        }
        return this.hass!.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
    };

    protected render(): TemplateResult {
        if (!this.hass || !this._config) {
            return html``;
        }


        const schema = computeSchema();

        return html`
            <ha-form
                .hass=${this.hass}
                .data=${this._config}
                .schema=${schema}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `;
    }

    private _valueChanged(ev: CustomEvent): void {
        fireEvent(this, "config-changed", { config: ev.detail.value });
        fireEvent(this, "hass", { config: ev.detail.value });
    }
}