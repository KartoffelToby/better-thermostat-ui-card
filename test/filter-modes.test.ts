import { describe, expect, it } from "bun:test";
import { filterModes } from "../src/normal/features/types";

describe("filterModes", () => {
  it("returns all entity modes when nothing is configured", () => {
    expect(filterModes(["heat", "off"])).toEqual(["heat", "off"]);
    expect(filterModes(undefined, ["heat"])).toEqual([]);
  });

  it("keeps the CONFIGURED order (HA core convention for reordering)", () => {
    expect(filterModes(["auto", "heat", "off"], ["off", "heat"])).toEqual([
      "off",
      "heat",
    ]);
  });

  it("drops configured modes the entity doesn't support", () => {
    expect(filterModes(["heat", "off"], ["cool", "heat"])).toEqual(["heat"]);
  });

  it("drops duplicate configured entries", () => {
    expect(filterModes(["heat", "off"], ["heat", "off", "heat"])).toEqual([
      "heat",
      "off",
    ]);
  });
});
