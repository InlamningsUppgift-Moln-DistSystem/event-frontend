import { useState } from "react";
const API_BASE =
  "https://user-service-api-fgbuhbe9dmgbb3gp.swedencentral-01.azurewebsites.net";

function PasswordForm({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const validate = () => {
    const errors = {};
    if (!currentPassword)
      errors.currentPassword = "Current password is required.";
    if (!newPassword) {
      errors.newPassword = "New password is required.";
    } else if (
      newPassword.length < 8 ||
      !/[A-Z]/.test(newPassword) ||
      !/[a-z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword) ||
      !/[-!@#$%^&*()_+{}[\]:;"'<>,.?/~\\]/.test(newPassword)
    ) {
      errors.newPassword =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Password confirmation does not match.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/user/me/password`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        setError(data);
      } else {
        onClose();
      }
    } catch (err) {
      console.error("Password update failed:", err);
      setError({ general: "Server error. Please try again later." });
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
        type="password"
        placeholder="Current password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
      />
      {error.currentPassword && (
        <p className="input-error">{error.currentPassword}</p>
      )}

      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      {error.newPassword && <p className="input-error">{error.newPassword}</p>}

      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      {error.confirmPassword && (
        <p className="input-error">{error.confirmPassword}</p>
      )}
      {error.general && <p className="input-error">{error.general}</p>}

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

export default PasswordForm;
