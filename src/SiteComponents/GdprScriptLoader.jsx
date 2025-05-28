import { useEffect } from "react";

export default function GdprScriptLoader() {
  useEffect(() => {
    const prefs = JSON.parse(localStorage.getItem("gdpr_preferences") || "{}");

    if (prefs.analytics) {
      console.log("✅ Analytics is active");

      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-NF182V77BY";
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-NF182V77BY");
    }

    if (prefs.marketing) {
      console.log("✅ Marketing is active");
    }

    if (!prefs.analytics && !prefs.marketing) {
      console.log("ℹ️ Only essential cookies are enabled");
    }
  }, []);

  return null;
}
