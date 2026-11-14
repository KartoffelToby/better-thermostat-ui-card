import { describe, expect, it } from "bun:test";
import type { HomeAssistant } from "mushroom-cards/src/ha";
import type { BtClimateEntity } from "../src/shared/climate";
import { formatMiniStateDisplay } from "../src/mini/state-display";

const makeEntity = (
  state: string,
  attributes: Record<string, unknown> = {},
): BtClimateEntity =>
  ({
    entity_id: "climate.bt",
    state,
    attributes: { call_for_heat: true, ...attributes },
  }) as unknown as BtClimateEntity;

const makeHass = (): HomeAssistant =>
  ({
    locale: { language: "en" },
    config: { unit_system: { temperature: "°C" } },
    states: {},
    formatEntityState: (entity: { state: string }) =>
      entity.state === "off" ? "Off" : entity.state,
    formatEntityAttributeValue: (
      entity: { attributes: Record<string, unknown> },
      attr: string,
      value?: unknown,
    ) => {
      const raw = value ?? entity.attributes[attr];
      if (attr === "hvac_action") {
        return raw === "heating" ? "Heating" : String(raw);
      }
      if (attr === "current_temperature") {
        return `${raw} °C`;
      }
      if (attr === "current_humidity") {
        return `${raw} %`;
      }
      return String(raw ?? "");
    },
  }) as unknown as HomeAssistant;

describe("formatMiniStateDisplay", () => {
  it("shows temperature and humidity alongside hvac_action", () => {
    const entity = makeEntity("heat", {
      hvac_action: "heating",
      current_temperature: 21,
      current_humidity: 50,
    });
    expect(formatMiniStateDisplay(makeHass(), entity)).toBe(
      "Heating ⸱ 21 °C ⸱ 50 %",
    );
  });

  it("shows door open status when current_temperature is present", () => {
    const entity = makeEntity("heat", {
      hvac_action: "off",
      door_open: true,
      current_temperature: 20,
    });
    expect(formatMiniStateDisplay(makeHass(), entity)).toBe(
      "heat ⸱ (Door open) 20 °C",
    );
  });

  it("shows door open status even when current_temperature is null or missing", () => {
    const entityNullTemp = makeEntity("off", {
      hvac_action: "off",
      door_open: true,
      current_temperature: null,
    });
    expect(formatMiniStateDisplay(makeHass(), entityNullTemp)).toBe(
      "Off ⸱ (Door open)",
    );

    const entityNoTemp = makeEntity("off", {
      door_open: true,
      current_humidity: 48,
    });
    expect(formatMiniStateDisplay(makeHass(), entityNoTemp)).toBe(
      "Off ⸱ (Door open) ⸱ 48 %",
    );
  });

  it("prefers window open over door open and summer when multiple are active", () => {
    const entity = makeEntity("off", {
      window_open: true,
      door_open: true,
      call_for_heat: false,
      current_temperature: null,
    });
    expect(formatMiniStateDisplay(makeHass(), entity)).toBe(
      "Off ⸱ (Window open)",
    );
  });

  it("shows summer label and humidity even without current_temperature", () => {
    const entity = makeEntity("heat", {
      call_for_heat: false,
      current_humidity: 55,
    });
    expect(formatMiniStateDisplay(makeHass(), entity)).toBe(
      "heat ⸱ (Summer) ⸱ 55 %",
    );
  });
});
