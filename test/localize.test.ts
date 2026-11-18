import { describe, expect, it } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import setupCustomlocalize, {
  createChainedLocalize,
  localize,
} from "../src/shared/localize";

const hassFor = (language: string, backend: Record<string, string> = {}) =>
  ({
    locale: { language },
    localize: (key: string) => backend[key] ?? "",
  }) as any;

describe("setupCustomlocalize fallback chain", () => {
  it("resolves an existing key in the exact language", () => {
    const t = setupCustomlocalize(hassFor("de"));
    expect(t("editor.card.climate.section_display")).toBe("Anzeige");
  });

  it("falls back from region variant to primary subtag to English", () => {
    // pt-BR exists as its own file; a hypothetical de-AT falls back to de
    const deAt = setupCustomlocalize(hassFor("de-AT"));
    expect(deAt("editor.card.climate.section_display")).toBe("Anzeige");
    // language without a translation file falls back to English
    const xx = setupCustomlocalize(hassFor("xx"));
    expect(xx("editor.card.climate.section_display")).toBe("Display");
  });

  it("returns the key itself when nothing matches", () => {
    const t = setupCustomlocalize(hassFor("en"));
    expect(t("editor.card.climate.does_not_exist")).toBe(
      "editor.card.climate.does_not_exist",
    );
  });
});

describe("localize with search/replace", () => {
  it("substitutes the placeholder", () => {
    const result = localize({
      hass: hassFor("en"),
      string: "extra_states.low_battery",
      search: "{name}",
      replace: "sensor.trv",
    });
    expect(result).toContain("sensor.trv");
    expect(result).not.toContain("{name}");
  });
});

describe("createChainedLocalize", () => {
  it("prefers the card's own translations", () => {
    const chained = createChainedLocalize(hassFor("en"));
    expect(chained("editor.card.climate.section_display")).toBe("Display");
  });

  it("falls back to hass.localize for unknown keys", () => {
    const chained = createChainedLocalize(
      hassFor("en", { "ui.some.backend.key": "Backend!" }),
    );
    expect(chained("ui.some.backend.key")).toBe("Backend!");
  });

  it("rebuilds when the language changes and keeps hass.localize fresh", () => {
    const first = createChainedLocalize(hassFor("en"));
    expect(first("editor.card.climate.section_display")).toBe("Display");
    const second = createChainedLocalize(hassFor("de"));
    expect(second("editor.card.climate.section_display")).toBe("Anzeige");
    // fresh hass with a different backend result, same language
    const third = createChainedLocalize(
      hassFor("de", { "ui.only.backend": "Neu" }),
    );
    expect(third("ui.only.backend")).toBe("Neu");
  });
});

describe("Home Assistant language code aliases", () => {
  it("maps HA codes to the card's translation files", () => {
    expect(
      setupCustomlocalize(hassFor("zh-Hans"))("extra_states.window_open"),
    ).toBe("窗户打开");
    expect(setupCustomlocalize(hassFor("ko"))("extra_states.eco")).toBe("절전");
    expect(
      setupCustomlocalize(hassFor("nb"))("editor.card.climate.section_display"),
    ).toBe("Visning");
  });
});

describe("translation files", () => {
  const dir = join(import.meta.dir, "../src/localize/languages");
  const flatten = (obj: Record<string, unknown>, prefix = ""): string[] =>
    Object.entries(obj).flatMap(([key, value]) =>
      value && typeof value === "object"
        ? flatten(value as Record<string, unknown>, `${prefix}${key}.`)
        : [`${prefix}${key}`],
    );
  const read = (file: string) =>
    flatten(JSON.parse(readFileSync(join(dir, file), "utf-8")));
  const enKeys = read("en.json");

  for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    it(`${file} has every key from en.json`, () => {
      const keys = new Set(read(file));
      expect(enKeys.filter((key) => !keys.has(key))).toEqual([]);
    });
  }
});
