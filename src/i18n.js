import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        backend: {
            //translation file path
            loadPath: "/assets/i18n/{{ns}}/{{lng}}.json",
        },
        fallbackLng: "en",
        //disable some production
        debug: false,
        //can have multiple namespaces, in case you want to devide a huge
        //translation into smaller pieces and load them on demand
        ns: ["Common"],
        interpolation: {
            escapeValue: false,
            formatSeparator: ',',
        },
        react: {
            wait: true,
            useSuspense: false 
        },
    })

export default i18n;