import { useState } from "react";
import "./GDPRModal.css";

export default function GDPRModal({ onClose }) {
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem("gdpr_preferences");
    return saved
      ? JSON.parse(saved)
      : { essential: true, analytics: false, marketing: false };
  });

  const handleChange = (type) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleAccept = () => {
    localStorage.setItem("gdpr_preferences", JSON.stringify(preferences));
    window.location.reload();
    onClose();
  };

  const handleAcceptAll = () => {
    const all = { essential: true, analytics: true, marketing: true };
    localStorage.setItem("gdpr_preferences", JSON.stringify(all));
    window.location.reload();
    onClose();
  };

  return (
    <div className="gdpr-modal">
      <div className="gdpr-content">
        <h2>GDPR Consent</h2>
        <p>We use cookies to improve your experience:</p>

        <div className="gdpr-options">
          <label>
            <input type="checkbox" checked disabled />
            Essential (always on)
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={() => handleChange("analytics")}
            />
            Analytics
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={() => handleChange("marketing")}
            />
            Marketing
          </label>
        </div>

        <div className="gdpr-actions">
          <button onClick={handleAccept}>Save Preferences</button>
          <button onClick={handleAcceptAll}>Accept All</button>
        </div>
      </div>
    </div>
  );
}
