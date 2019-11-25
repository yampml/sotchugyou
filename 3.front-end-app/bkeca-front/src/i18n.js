import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";
// import Backend from "i18next-xhr-backend";

i18n
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    lng: "jap",
    resources: {
      en: {
        translation: {
          SideBar: {
            LogoText: "BKECA EMS"
          },
          Introduction: "Introduction",
          "is an internationalization-framework which offers a complete solution to localize your product from web to mobile and desktop":
            "is an internationalization-framework which offers a complete solution to localize your product from web to mobile and desktop",
          "Plugins to detect the user language":
            "Plugins to detect the user language",
          "Plugins to load translations": "Plugins to load translations",
          "Optionally cache the translations":
            "Optionally cache the translations",
          Advantages: "Advantages",
          "Flexibility to use other packages": "Flexibility to use other packages"
        }
      },
      jap: {
        translation: {
          SideBar: {
            LogoText: "ダナン工科大学"
          },
          Introduction: "前書き",
          "is an internationalization-framework which offers a complete solution to localize your product from web to mobile and desktop":
            "Webからモバイルとデスクトップに製品をローカライズするための完全なソリューションを提供する国際化フレームワークです",
          "Plugins to detect the user language":
            "ユーザー言語を検出するためのプラグイン",
          "Plugins to load translations": "翻訳をロードするためのプラグイン",
          "Optionally cache the translations": "必要に応じて翻訳をキャッシュする",
          Advantages: "利点",
          "Flexibility to use other packages": "他のパッケージを使用する柔軟性"
        }
      },
      fallbackLng: "en", // used lang if some translations are missing
      debug: true, // log to console all states of i18next

      // have a common namespace used around the full app
      ns: ["translations"],
      defaultNS: "translations",

      keySeparator: false, // we use content as keys

      interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
      },

      react: {
        wait: true
      }
    }
  });

export default i18n;
