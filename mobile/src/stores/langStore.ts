import {create} from "zustand";

type Language = "en" | "es";

interface LangStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const useLangStore = create<LangStore>(
  (set: (partial: Partial<LangStore>) => void) => ({
    language: "es",
    setLanguage: (lang: Language) => set({language: lang}),
  }),
);

export default useLangStore;
