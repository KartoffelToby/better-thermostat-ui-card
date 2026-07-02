import { describe, expect, it } from "bun:test";
import {
  CLIMATE_COLOR_KEYS,
  CLIMATE_HVAC_COLOR_KEYS,
  CLIMATE_PRESET_COLOR_KEYS,
  climateActionColor,
  climateColor,
  climateColorDefaultStyles,
  climateColorOverrides,
  getHvacActionIcon,
  getHvacModeIcon,
} from "../src/shared/climate-colors";
import { alphaColor, computeCssColor } from "../src/shared/color";

describe("climateColor", () => {
  it("maps keys to --bt-color-* variables with dashes", () => {
    expect(climateColor("heat")).toBe("var(--bt-color-heat)");
    expect(climateColor("fan_only")).toBe("var(--bt-color-fan-only)");
    expect(climateColor("heat_cool")).toBe("var(--bt-color-heat-cool)");
    expect(climateColor("eco")).toBe("var(--bt-color-eco)");
  });

  it("unknown modes (incl. 'none') fall back to off", () => {
    expect(climateColor("none")).toBe("var(--bt-color-off)");
    expect(climateColor("something_else")).toBe("var(--bt-color-off)");
  });
});

describe("climateActionColor", () => {
  it("maps actions to their implied mode colors", () => {
    expect(climateActionColor("heating")).toBe("var(--bt-color-heat)");
    expect(climateActionColor("cooling")).toBe("var(--bt-color-cool)");
    expect(climateActionColor("drying")).toBe("var(--bt-color-dry)");
  });

  it("idle keeps its own color; unknown actions fall back to off", () => {
    expect(climateActionColor("idle")).toBe("var(--bt-color-idle)");
    expect(climateActionColor("off")).toBe("var(--bt-color-off)");
    expect(climateActionColor("preheating")).toBe("var(--bt-color-off)");
  });
});

describe("climateColorOverrides", () => {
  it("returns an empty object without config", () => {
    expect(climateColorOverrides(undefined)).toEqual({});
  });

  it("maps config keys to variables, resolving theme tokens", () => {
    expect(climateColorOverrides({ heat: "deep-orange", fan_only: "#ff00ff" })).toEqual({
      "--bt-color-heat": "var(--deep-orange-color)",
      "--bt-color-fan-only": "#ff00ff",
    });
  });

  it("ignores unknown keys and empty values", () => {
    expect(
      climateColorOverrides({ bogus: "red", heat: "" } as any)
    ).toEqual({});
  });
});

describe("climateColorDefaultStyles", () => {
  it("defines a default for every color key the API can emit", () => {
    const cssText = climateColorDefaultStyles.cssText;
    for (const key of CLIMATE_COLOR_KEYS) {
      expect(cssText).toContain(`--bt-color-${key.replace(/_/g, "-")}:`);
    }
    for (const extra of ["idle", "grey", "summer", "humidity"]) {
      expect(cssText).toContain(`--bt-color-${extra}:`);
    }
    expect(cssText).toContain("--bt-badge-background:");
  });

  it("key groups cover exactly the 14 documented keys", () => {
    expect(CLIMATE_HVAC_COLOR_KEYS.length).toBe(7);
    expect(CLIMATE_PRESET_COLOR_KEYS.length).toBe(7);
    expect(CLIMATE_COLOR_KEYS.length).toBe(14);
  });
});

describe("computeCssColor", () => {
  it("maps theme tokens to their variables", () => {
    expect(computeCssColor("deep-orange")).toBe("var(--deep-orange-color)");
    expect(computeCssColor("red")).toBe("var(--red-color)");
  });

  it("passes raw CSS through (YAML escape hatch)", () => {
    expect(computeCssColor("#ff00ff")).toBe("#ff00ff");
    expect(computeCssColor("rgb(1, 2, 3)")).toBe("rgb(1, 2, 3)");
    expect(computeCssColor("rebeccapurple")).toBe("rebeccapurple");
  });
});

describe("alphaColor", () => {
  it("builds a color-mix with percentage alpha", () => {
    expect(alphaColor("var(--bt-color-heat)", 0.2)).toBe(
      "color-mix(in srgb, var(--bt-color-heat) 20%, transparent)"
    );
    expect(alphaColor("#fff", 0.05)).toBe(
      "color-mix(in srgb, #fff 5%, transparent)"
    );
  });
});

describe("icons", () => {
  it("known modes and fallback", () => {
    expect(getHvacModeIcon("heat")).toBe("mdi:fire");
    expect(getHvacModeIcon("eco")).toBe("mdi:leaf");
    expect(getHvacModeIcon("bogus")).toBe("mdi:thermostat");
  });

  it("action icons", () => {
    expect(getHvacActionIcon("heating")).toBe("mdi:fire");
    expect(getHvacActionIcon("idle")).toBe("mdi:clock-outline");
  });
});
