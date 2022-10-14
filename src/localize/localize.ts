import * as en from './languages/en.json';
import * as de from './languages/de.json';
import * as fr from './languages/fr.json';
import * as ru from './languages/ru.json';
import * as pl from './languages/pl.json';
import * as sk from './languages/sk.json';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const languages: any = {
  en: en,
  de: de,
  fr: fr,
  ru: ru,
  sk: sk,
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
};

export function localize(string: string, search = '', replace = ''): string {
  const localLangStore = localStorage.getItem('selectedLanguage') || localStorage.getItem('i18nextLng') || localStorage.getItem('lang') ||  navigator.language || 'en';
  const lang = RegExp("^.{0,2}").exec((localLangStore).replace(/['"]+/g, '').replace('-', '_')) || ['en'];
  let translated: string;

  try {
    translated = string.split('.').reduce((o, i) => o[i], languages[lang[0]]);
  } catch (e) {
    translated = string.split('.').reduce((o, i) => o[i], languages['en']);
  }

  if (translated === undefined) translated = string.split('.').reduce((o, i) => o[i], languages['en']);

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }
  return translated;
}
