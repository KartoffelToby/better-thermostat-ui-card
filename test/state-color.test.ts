import { describe, expect, it } from "bun:test";
import { stateActive, stateColorCss } from "../src/shared/state-color";

const obj = (
  entityId: string,
  state: string,
  attributes: Record<string, unknown> = {},
) => ({
  entity_id: entityId,
  state,
  attributes,
});

describe("stateActive", () => {
  it("unavailable/unknown are inactive (except button-likes)", () => {
    expect(stateActive(obj("climate.a", "unavailable"))).toBe(false);
    expect(stateActive(obj("climate.a", "unknown"))).toBe(false);
    expect(stateActive(obj("button.a", "unknown"))).toBe(true);
    expect(stateActive(obj("scene.a", "unavailable"))).toBe(false);
  });

  it("off is inactive for most domains", () => {
    expect(stateActive(obj("climate.a", "off"))).toBe(false);
    expect(stateActive(obj("switch.a", "off"))).toBe(false);
  });

  it("climate heat/cool/fan_only are active", () => {
    expect(stateActive(obj("climate.a", "heat"))).toBe(true);
    expect(stateActive(obj("climate.a", "cool"))).toBe(true);
    expect(stateActive(obj("climate.a", "fan_only"))).toBe(true);
    expect(stateActive(obj("climate.a", "dry"))).toBe(true);
  });

  it("supports the explicit state override", () => {
    expect(stateActive(obj("climate.a", "heat"), "off")).toBe(false);
    expect(stateActive(obj("climate.a", "off"), "heat")).toBe(true);
  });

  it("domain-specific rules", () => {
    expect(stateActive(obj("cover.a", "closed"))).toBe(false);
    expect(stateActive(obj("cover.a", "open"))).toBe(true);
    expect(stateActive(obj("lock.a", "locked"))).toBe(false);
    expect(stateActive(obj("vacuum.a", "docked"))).toBe(false);
    expect(stateActive(obj("vacuum.a", "cleaning"))).toBe(true);
    expect(stateActive(obj("timer.a", "active"))).toBe(true);
    expect(stateActive(obj("timer.a", "paused"))).toBe(false);
  });
});

describe("stateColorCss", () => {
  it("unavailable maps to the unavailable color", () => {
    expect(stateColorCss(obj("climate.a", "unavailable"))).toBe(
      "var(--state-unavailable-color)",
    );
  });

  it("climate states build the core variable chain", () => {
    const css = stateColorCss(obj("climate.a", "heat"));
    expect(css).toContain("--state-climate-heat-color");
    expect(css).toContain("--state-climate-active-color");
    expect(css?.startsWith("var(")).toBe(true);
  });

  it("state override changes the resolved state key", () => {
    const css = stateColorCss(obj("climate.a", "heat"), "cool");
    expect(css).toContain("--state-climate-cool-color");
  });

  it("battery sensors use the battery thresholds", () => {
    expect(
      stateColorCss(obj("sensor.b", "85", { device_class: "battery" })),
    ).toBe("var(--state-sensor-battery-high-color)");
    expect(
      stateColorCss(obj("sensor.b", "50", { device_class: "battery" })),
    ).toBe("var(--state-sensor-battery-medium-color)");
    expect(
      stateColorCss(obj("sensor.b", "10", { device_class: "battery" })),
    ).toBe("var(--state-sensor-battery-low-color)");
  });

  it("uncolored domains return undefined", () => {
    expect(stateColorCss(obj("sensor.a", "42"))).toBeUndefined();
  });
});
