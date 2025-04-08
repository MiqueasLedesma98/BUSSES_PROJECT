import {I18n} from "i18n-js";

import en from "./en.json";
import es from "./es.json";

export const i18n = new I18n({en, es});

i18n.defaultLocale = "es";
i18n.locale = "es"; // puedes cambiar esto dinámicamente
