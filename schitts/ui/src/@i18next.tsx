import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        supportedLngs: ['en', 'fr'],
        fallbackLng: 'en',
        detection: {
            order: ['cookie', 'localStorage', 'htmlTag', 'navigator', 'path', 'subdomain'],
            caches: ['cookie', 'localStorage']
        },
        backend: {
            loadPath: '/assets/locales/{{lng}}/{{ns}}.json',
        },
        interpolation: {
            escapeValue: false // react already safes from xss
        }
        // react: {useSuspense: false}
    });

export default i18n;
