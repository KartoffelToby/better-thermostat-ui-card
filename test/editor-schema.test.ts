import { describe, expect, it } from "bun:test";
import { computeColorsSchema } from "../src/shared/editor-schema";

const pickerNames = (schema: any): string[] =>
  schema.schema[0].schema.map((field: { name: string }) => field.name);

describe("computeColorsSchema", () => {
  it("offers only the entity's hvac modes and presets", () => {
    const schema = computeColorsSchema("heat,off", "none,eco,away");
    expect(pickerNames(schema)).toEqual(["heat", "eco", "away"]);
  });

  it("never offers a picker for off — it is intentionally grey", () => {
    expect(pickerNames(computeColorsSchema(undefined, undefined))).not.toContain(
      "off",
    );
    expect(pickerNames(computeColorsSchema("off", ""))).toEqual([]);
  });

  it("falls back to all keys (minus off) when the entity is unknown", () => {
    expect(pickerNames(computeColorsSchema(undefined, undefined))).toEqual([
      "auto",
      "cool",
      "dry",
      "fan_only",
      "heat",
      "heat_cool",
      "eco",
      "away",
      "boost",
      "sleep",
      "comfort",
      "activity",
      "home",
    ]);
  });

  it("empty preset list yields no preset pickers (canonical key order)", () => {
    expect(pickerNames(computeColorsSchema("heat,cool", ""))).toEqual([
      "cool",
      "heat",
    ]);
  });

  it("nests values under the colors config key (non-flattened section)", () => {
    const schema = computeColorsSchema("heat", "") as any;
    expect(schema.name).toBe("colors");
    expect(schema.type).toBe("expandable");
    expect(schema.flatten).toBeUndefined();
  });
});
