import { useEffect, useState } from "react";
import "./MarketingBanner.css";
import ecLogo from "../assets/eclogo.png";

export default function MarketingBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const prefs = JSON.parse(localStorage.getItem("gdpr_preferences") || "{}");
    setShowBanner(prefs.marketing);
  }, []);

  if (!showBanner) return null;

  return (
    <div className="marketing-banner">
      <img src={ecLogo} alt="EC Utbildning" className="marketing-logo" />
      <span className="marketing-text">
        In collaboration with EC Utbildning
      </span>
    </div>
  );
}
