import { useState } from "react";

const USER_API =
  "https://user-service-api-fgbuhbe9dmgbb3gp.swedencentral-01.azurewebsites.net";

function EmailForm({ onClose }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const token = localStorage.getItem("token");

  const validate = (val) => {
    if (!val) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Invalid email format.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setConfirmationSent(false);
    setLoading(true);

    const valError = validate(email);
    if (valError) {
      setError(valError);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${USER_API}/api/user/me`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        setError(Object.values(data).join(" ") || "Email update failed.");
      } else {
        setConfirmationSent(true);
      }
    } catch (err) {
      console.error("Email update failed:", err);
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="profile-form"
      style={{ position: "relative" }}
    >
      <input
        type="email"
        placeholder="Enter new email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {error && <p className="input-error">{error}</p>}
      {confirmationSent && (
        <p className="success-message">
          ✅ Email updated. A confirmation link will be sent to <b>{email}</b>
        </p>
      )}

      {loading && (
        <div className="form-loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
        <button type="button" onClick={onClose} disabled={loading}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EmailForm;
