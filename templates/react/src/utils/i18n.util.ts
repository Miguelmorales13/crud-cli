import i18n from 'i18next';
import resourcesLanguages from "../languages";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(I18nextBrowserLanguageDetector)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        debug: true,
        resources: resourcesLanguages,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });


export default i18n;
