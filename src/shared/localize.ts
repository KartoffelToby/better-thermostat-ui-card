import * as en from "../localize/languages/en.json";
import * as de from "../localize/languages/de.json";
import * as fr from "../localize/languages/fr.json";
import * as ru from "../localize/languages/ru.json";
import * as pl from "../localize/languages/pl.json";
import * as sk from "../localize/languages/sk.json";
import * as hr from "../localize/languages/hr.json";
import * as hu from "../localize/languages/hu.json";
import * as da from "../localize/languages/da.json";
import * as es from "../localize/languages/es.json";
import * as tr from "../localize/languages/tr.json";
import * as it from "../localize/languages/it.json";
import * as pt from "../localize/languages/pt.json";
import * as cn from "../localize/languages/cn.json";
import * as uk from "../localize/languages/uk.json";
import * as el from "../localize/languages/el.json";
import * as nl from "../localize/languages/nl.json";
import * as no from "../localize/languages/no.json";
import * as cs from "../localize/languages/cs.json";
import * as sl from "../localize/languages/sl.json";
import * as sv from "../localize/languages/sv.json";
import * as bg from "../localize/languages/bg.json";
import * as fi from "../localize/languages/fi.json";
import * as ro from "../localize/languages/ro.json";
import * as ca from "../localize/languages/ca.json";
import * as lv from "../localize/languages/lv.json";
import * as gl from "../localize/languages/gl.json";
import * as kr from "../localize/languages/kr.json";
import * as lt from "../localize/languages/lt.json";
import * as ptBR from "../localize/languages/pt-BR.json";
import { HomeAssistant } from "mushroom-cards/src/ha";
import setupMushroomLocalize from "mushroom-cards/src/localize";

const languages: Record<string, unknown> = {
  en,
  de,
  fr,
  ru,
  sk,
  hr,
  hu,
  pl,
  da,
  es,
  tr,
  it,
  pt,
  cn,
  uk,
  el,
  nl,
  no,
  cs,
  sl,
  sv,
  bg,
  fi,
  ro,
  ca,
  lv,
  gl,
  kr,
  lt,
  "pt-BR": ptBR,
};

const DEFAULT_LANG = "en";

// Fallback chain: exact locale ("pt-BR"), primary subtag ("pt"), English.
function getLangs(hass?: HomeAssistant): string[] {
  const raw = hass?.locale.language ?? DEFAULT_LANG;
  const langs = [raw];
  const primary = raw.split(/[-_]/)[0];
  if (primary && primary !== raw) langs.push(primary);
  if (!langs.includes(DEFAULT_LANG)) langs.push(DEFAULT_LANG);
  return langs;
}

function getTranslatedString(key: string, lang: string): string | undefined {
  try {
    return key
      .split(".")
      .reduce(
        (o, i) => (o as Record<string, unknown>)[i],
        languages[lang]
      ) as string;
  } catch (_e) {
    return undefined;
  }
}

function lookup(hass: HomeAssistant | undefined, key: string): string | undefined {
  for (const lang of getLangs(hass)) {
    const translated = getTranslatedString(key, lang);
    if (translated !== undefined) return translated;
  }
  return undefined;
}

export function localize({
  hass,
  string,
  search = "",
  replace = "",
}: {
  hass?: HomeAssistant;
  string: string;
  search?: string;
  replace?: string;
}): string {
  let translated = lookup(hass, string);
  if (search !== "" && replace !== "" && typeof translated === "string") {
    translated = translated.replace(search, replace);
  }
  return translated ?? string;
}

export default function setupCustomlocalize(hass?: HomeAssistant) {
  return function (key: string) {
    return lookup(hass, key) ?? key;
  };
}

type Localizer = (key: string) => string;

// Both localizers below only depend on hass.locale.language, so they are
// cached per language; hass.localize is taken fresh from the hass passed in.
let chainedCache:
  | { language: string; custom: Localizer; mushroom: Localizer }
  | undefined;

// Chained lookup: card translations, then mushroom's, then HA backend.
export function createChainedLocalize(hass: HomeAssistant): Localizer {
  const language = hass.locale?.language ?? DEFAULT_LANG;
  if (!chainedCache || chainedCache.language !== language) {
    chainedCache = {
      language,
      custom: setupCustomlocalize(hass),
      mushroom: setupMushroomLocalize(hass),
    };
  }
  const { custom, mushroom } = chainedCache;
  return (key: string) => {
    const own = custom(key);
    if (own && own !== key) return own;
    const mush = mushroom(key);
    if (mush && mush !== key) return mush;
    return hass.localize(key);
  };
}
