import { describe, expect, it } from "bun:test";
import {
  findBtStubEntity,
  formatHumidity,
  isBtEntity,
  isWindowOpen,
} from "../src/shared/bt";

const btEntity = (attrs: Record<string, unknown> = {}) => ({
  entity_id: "climate.bt",
  state: "heat",
  attributes: { call_for_heat: true, ...attrs },
});

const plainEntity = (attrs: Record<string, unknown> = {}) => ({
  entity_id: "climate.plain",
  state: "heat",
  attributes: { ...attrs },
});

const hassWith = (states: Record<string, unknown>, extra: Partial<any> = {}) =>
  ({
    states,
    formatEntityAttributeValue: (stateObj: any, attr: string) =>
      `${stateObj.attributes[attr]} %`,
    formatEntityState: (stateObj: any) => `${stateObj.state} %`,
    ...extra,
  }) as any;

describe("isBtEntity", () => {
  it("detects Better Thermostat via call_for_heat", () => {
    expect(isBtEntity(btEntity())).toBe(true);
    expect(isBtEntity(btEntity({ call_for_heat: false }))).toBe(true);
    expect(isBtEntity(plainEntity())).toBe(false);
    expect(isBtEntity(undefined)).toBe(false);
  });
});

describe("findBtStubEntity", () => {
  it("prefers a BT entity over plain climates", () => {
    const hass = hassWith({
      "climate.plain": plainEntity(),
      "climate.bt": btEntity(),
      "light.x": { attributes: {} },
    });
    expect(findBtStubEntity(hass)).toBe("climate.bt");
  });

  it("falls back to the first climate entity", () => {
    const hass = hassWith({ "climate.plain": plainEntity() });
    expect(findBtStubEntity(hass)).toBe("climate.plain");
  });

  it("returns undefined without climate entities", () => {
    expect(findBtStubEntity(hassWith({ "light.x": {} }))).toBeUndefined();
  });
});

describe("isWindowOpen", () => {
  it("BT entity: only boolean true or explicit open-like strings count", () => {
    expect(isWindowOpen(undefined, btEntity({ window_open: true }))).toBe(true);
    expect(isWindowOpen(undefined, btEntity({ window_open: "on" }))).toBe(true);
    expect(isWindowOpen(undefined, btEntity({ window_open: "TRUE" }))).toBe(true);
    expect(isWindowOpen(undefined, btEntity({ window_open: "false" }))).toBe(false);
    expect(isWindowOpen(undefined, btEntity({ window_open: false }))).toBe(false);
    expect(isWindowOpen(undefined, btEntity({}))).toBe(false);
  });

  it("non-BT entity: reads the configured window sensor", () => {
    const hass = hassWith({ "binary_sensor.window": { state: "on" } });
    expect(
      isWindowOpen(hass, plainEntity(), { window_sensor: "binary_sensor.window" })
    ).toBe(true);
    expect(isWindowOpen(hass, plainEntity(), {})).toBe(false);
    expect(
      isWindowOpen(hass, plainEntity(), { window_sensor: "binary_sensor.gone" })
    ).toBe(false);
  });
});

describe("formatHumidity", () => {
  it("returns undefined when disabled or without hass", () => {
    expect(formatHumidity(undefined, btEntity())).toBeUndefined();
    expect(
      formatHumidity(hassWith({}), btEntity({ current_humidity: 55 }), {
        disable_humidity: true,
      })
    ).toBeUndefined();
  });

  it("prefers the entity's own current_humidity", () => {
    const hass = hassWith({});
    expect(formatHumidity(hass, btEntity({ current_humidity: 55 }))).toBe("55 %");
  });

  it("falls back to a configured humidity sensor for non-BT entities", () => {
    const hass = hassWith({ "sensor.hum": { state: "47" } });
    expect(
      formatHumidity(hass, plainEntity(), { humidity_sensor: "sensor.hum" })
    ).toBe("47 %");
    // non-numeric sensor state is ignored
    const hassBad = hassWith({ "sensor.hum": { state: "unknown" } });
    expect(
      formatHumidity(hassBad, plainEntity(), { humidity_sensor: "sensor.hum" })
    ).toBeUndefined();
  });
});
