import {create} from "zustand";
import {I18n} from "i18n-js";
import en from "@/i18n/en.json";
import es from "@/i18n/es.json";

const i18n = new I18n({en, es});
i18n.defaultLocale = "es";

export type Language = "en" | "es";
export type LangCode = "EN" | "ES";

interface I18nStore {
  locale: Language;
  code: LangCode;
  setLocale: (lang: Language) => void;
  t: (key: string, config?: Record<string, any>) => string;
}

export const useI18nStore = create<I18nStore>((set, get) => ({
  locale: "es",
  code: "ES",
  setLocale: lang => {
    i18n.locale = lang;
    set({locale: lang, code: lang.toUpperCase() as LangCode});
  },
  t: (key, config) => {
    return i18n.t(key, config);
  },
}));
