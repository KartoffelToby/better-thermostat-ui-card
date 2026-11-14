import { describe, expect, it, mock } from "bun:test";
import type { HassEntity } from "home-assistant-js-websocket";
import type { HomeAssistant } from "mushroom-cards/src/ha";
import {
  computeEntityName,
  entityNamesChanged,
} from "../src/shared/entity-name";
import { shouldUpdateForHass } from "../src/shared/has-changed";

const makeState = (friendlyName?: string): HassEntity =>
  ({
    entity_id: "climate.living_room",
    state: "heat",
    attributes: friendlyName ? { friendly_name: friendlyName } : {},
    last_changed: "",
    last_updated: "",
    context: { id: "1", parent_id: null, user_id: null },
  }) as HassEntity;

const makeHass = (overrides: Record<string, unknown> = {}): HomeAssistant =>
  ({
    config: {
      version: "2026.4.0",
      unit_system: { temperature: "°C" },
    },
    locale: { language: "en" },
    themes: {},
    connected: true,
    states: {},
    localize: () => "",
    formatEntityState: () => "",
    formatEntityAttributeValue: () => "",
    ...overrides,
  }) as unknown as HomeAssistant;

describe("computeEntityName", () => {
  it("returns configured name directly when provided", () => {
    const formatEntityName = mock(() => "Registry Name");
    const hass = makeHass({ formatEntityName });
    expect(
      computeEntityName(hass, makeState("Friendly Name"), "Custom Name"),
    ).toBe("Custom Name");
    expect(formatEntityName).not.toHaveBeenCalled();
  });

  it("returns empty string when stateObj is undefined", () => {
    const hass = makeHass({ formatEntityName: () => "Registry Name" });
    expect(computeEntityName(hass, undefined, undefined)).toBe("");
  });

  it("uses hass.formatEntityName on HA 2026.4+", () => {
    const formatEntityName = mock(() => "Living Room");
    const hass = makeHass({
      config: { version: "2026.4.0" },
      formatEntityName,
    });
    const stateObj = makeState("Fallback Friendly");
    expect(computeEntityName(hass, stateObj, undefined)).toBe("Living Room");
    expect(formatEntityName).toHaveBeenCalledWith(stateObj);

    const hassFuture = makeHass({
      config: { version: "2027.1.0b0" },
      formatEntityName: () => "Future Name",
    });
    expect(computeEntityName(hassFuture, stateObj, undefined)).toBe(
      "Future Name",
    );
  });

  it("falls back to friendly_name on HA older than 2026.4", () => {
    const formatEntityName = mock(() => "Should Not Call");
    const hass = makeHass({
      config: { version: "2026.3.5" },
      formatEntityName,
    });
    expect(computeEntityName(hass, makeState("Friendly Name"), undefined)).toBe(
      "Friendly Name",
    );
    expect(formatEntityName).not.toHaveBeenCalled();
  });

  it("falls back to friendly_name when formatEntityName is missing", () => {
    const hass = makeHass({ config: { version: "2026.4.0" } });
    expect(computeEntityName(hass, makeState("Friendly Name"), undefined)).toBe(
      "Friendly Name",
    );
    expect(computeEntityName(hass, makeState(undefined), undefined)).toBe("");
  });
});

describe("entityNamesChanged / shouldUpdateForHass", () => {
  it("detects changes to formatEntityName and registry maps", () => {
    const base = makeHass({
      formatEntityName: () => "A",
      entities: {},
      devices: {},
      areas: {},
      floors: {},
    });

    expect(entityNamesChanged(undefined, base)).toBe(false);
    expect(entityNamesChanged(base, undefined)).toBe(false);
    expect(entityNamesChanged(base, { ...base })).toBe(false);

    for (const key of [
      "formatEntityName",
      "entities",
      "devices",
      "areas",
      "floors",
    ] as const) {
      const updated = makeHass({ ...base, [key]: {} });
      expect(entityNamesChanged(base, updated)).toBe(true);
      expect(shouldUpdateForHass(base, updated, ["climate.living_room"])).toBe(
        true,
      );
    }
  });

  it("ignores unrelated entity ticks when name sources are unchanged", () => {
    const climate = makeState("Living Room");
    const base = makeHass({
      states: {
        "climate.living_room": climate,
        "sensor.other": { state: "1" },
      },
    });
    const next = makeHass({
      ...base,
      states: {
        "climate.living_room": climate,
        "sensor.other": { state: "2" },
      },
    });
    expect(shouldUpdateForHass(base, next, ["climate.living_room"])).toBe(
      false,
    );
  });
});
