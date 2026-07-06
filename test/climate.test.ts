import { describe, expect, it, mock } from "bun:test";
import {
  ClimateEntityFeature,
  setClimateMode,
  supportsFeature,
  supportsFeatureFromAttributes,
} from "../src/shared/climate";

const entity = (attributes: Record<string, unknown>) =>
  ({ entity_id: "climate.test", state: "heat", attributes }) as any;

describe("feature gating (Phase 5 guard building blocks)", () => {
  it("reads the TARGET_TEMPERATURE bit", () => {
    expect(
      supportsFeature(
        entity({ supported_features: 1 }),
        ClimateEntityFeature.TARGET_TEMPERATURE,
      ),
    ).toBe(true);
    // daikin_onecta in fan_only/dry: 440 = 8|16|32|128|256 — no bit 1 or 2
    expect(
      supportsFeature(
        entity({ supported_features: 440 }),
        ClimateEntityFeature.TARGET_TEMPERATURE,
      ),
    ).toBe(false);
    expect(
      supportsFeature(
        entity({ supported_features: 440 }),
        ClimateEntityFeature.TARGET_TEMPERATURE_RANGE,
      ),
    ).toBe(false);
    expect(
      supportsFeature(
        entity({ supported_features: 441 }),
        ClimateEntityFeature.TARGET_TEMPERATURE,
      ),
    ).toBe(true);
  });

  it("treats missing supported_features as 0", () => {
    expect(
      supportsFeatureFromAttributes(
        {},
        ClimateEntityFeature.TARGET_TEMPERATURE,
      ),
    ).toBe(false);
  });
});

describe("setClimateMode", () => {
  const makeHass = () => {
    const callService = mock(() => {});
    return { hass: { callService } as any, callService };
  };

  it("sets an hvac mode when the name matches hvac_modes", () => {
    const { hass, callService } = makeHass();
    const handled = setClimateMode(
      hass,
      entity({ hvac_modes: ["heat", "off"] }),
      "off",
    );
    expect(handled).toBe(true);
    expect(callService).toHaveBeenCalledWith("climate", "set_hvac_mode", {
      entity_id: "climate.test",
      hvac_mode: "off",
    });
  });

  it("sets a preset when the name matches preset_modes", () => {
    const { hass, callService } = makeHass();
    const stateObj = entity({
      hvac_modes: ["heat", "off"],
      preset_modes: ["eco", "boost"],
      preset_mode: "none",
    });
    expect(setClimateMode(hass, stateObj, "eco")).toBe(true);
    expect(callService).toHaveBeenCalledWith("climate", "set_preset_mode", {
      entity_id: "climate.test",
      preset_mode: "eco",
    });
  });

  it("selecting the active preset clears it back to none", () => {
    const { hass, callService } = makeHass();
    const stateObj = entity({ preset_modes: ["eco"], preset_mode: "eco" });
    expect(setClimateMode(hass, stateObj, "eco")).toBe(true);
    expect(callService).toHaveBeenCalledWith("climate", "set_preset_mode", {
      entity_id: "climate.test",
      preset_mode: "none",
    });
  });

  it("returns false and calls nothing for unknown modes", () => {
    const { hass, callService } = makeHass();
    expect(setClimateMode(hass, entity({ hvac_modes: ["heat"] }), "cool")).toBe(
      false,
    );
    expect(callService).not.toHaveBeenCalled();
  });
});
