import * as en from './languages/en.json';
import * as de from './languages/de.json';
import * as fr from './languages/fr.json';
import * as ru from './languages/ru.json';
import * as pl from './languages/pl.json';
import * as sk from './languages/sk.json';
import * as hr from './languages/hr.json';
import * as hu from './languages/hu.json';
import * as da from './languages/da.json';
import * as es from './languages/es.json';
import * as tr from './languages/tr.json';
import * as it from './languages/it.json';
import * as pt from './languages/pt.json';
import * as cn from './languages/cn.json';
import * as uk from './languages/uk.json';
import * as el from './languages/el.json';
import * as nl from './languages/nl.json';
import * as no from './languages/no.json';
import * as cs from './languages/cs.json';
import * as sl from './languages/sl.json';
import * as sv from './languages/sv.json';
import * as bg from './languages/bg.json';
import * as fi from './languages/fi.json';
import * as ro from './languages/ro.json';
import * as ca from './languages/ca.json';
import * as lv from './languages/lv.json';
import { HomeAssistant } from 'mushroom-cards/src/ha';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const languages: any = {
  en: en,
  de: de,
  fr: fr,
  ru: ru,
  sk: sk,
  hr: hr,
  hu: hu,
  pl: pl,
  da: da,
  es: es,
  tr: tr,
  it: it,
  pt: pt,
  cn: cn,
  uk: uk,
  el: el,
  nl: nl,
  no: no,
  cs: cs,
  sl: sl,
  sv: sv,
  bg: bg,
  fi: fi,
  ro: ro,
  ca: ca,
  lv: lv,
};
const DEFAULT_LANG = "en";

function getLangs(hass?: HomeAssistant) {
  const raw = hass?.locale.language ?? DEFAULT_LANG;
  const langs = [raw];
  const primary = raw.split(/[-_]/)[0];
  if (primary && primary !== raw) langs.push(primary);
  if (!langs.includes(DEFAULT_LANG)) langs.push(DEFAULT_LANG);
  return langs;
}

export function localize({ hass, string, search = '', replace = '' }: { hass?: HomeAssistant; string: string; search?: string; replace?: string; }): string {
  const langs = getLangs(hass);

  let translated: string | undefined;

  for (const lang of langs) {
    try {
      translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
    } catch (e) {
      translated = undefined as any;
    }
    if (translated !== undefined) break;
  }

  if (search !== '' && replace !== '' && typeof translated === "string") {
    translated = translated.replace(search, replace);
  }
  return translated ?? string;
}


function getTranslatedString(key: string, lang: string): string | undefined {
    try {
        return key
            .split(".")
            .reduce((o, i) => (o as Record<string, unknown>)[i], languages[lang]) as string;
    } catch (_) {
        return undefined;
    }
}

export default function setupCustomlocalize(hass?: HomeAssistant) {
  return function (key: string) {
    const langs = getLangs(hass);

    let translated: string | undefined;
    for (const lang of langs) {
      translated = getTranslatedString(key, lang);
      if (translated) break;
    }
    return translated ?? key;
  };
}
