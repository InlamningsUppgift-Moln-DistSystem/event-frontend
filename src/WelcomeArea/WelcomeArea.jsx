import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import GDPRModal from "../SiteComponents/GDPRModal";
import GdprScriptLoader from "../SiteComponents/GdprScriptLoader";

function WelcomeArea() {
  const [showGdpr, setShowGdpr] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const prefs = localStorage.getItem("gdpr_preferences");
    if (!prefs) {
      setShowGdpr(true);
    } else {
      setHasConsent(true);
    }
  }, []);

  const handleCloseGdpr = () => {
    setShowGdpr(false);
    setHasConsent(true); // efter användaren valt
  };

  return (
    <div className="auth-layout">
      {showGdpr && <GDPRModal onClose={handleCloseGdpr} />}
      {hasConsent && <GdprScriptLoader />}
      <Outlet />
    </div>
  );
}

export default WelcomeArea;
