// 📁 /MyPageComponents/UsernameForm.jsx
import { useState } from "react";

const API_BASE =
  "https://user-service-api-fgbuhbe9dmgbb3gp.swedencentral-01.azurewebsites.net";

function UsernameForm({ onClose }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const validate = (name) => {
    if (!name) return "Username is required.";
    if (name.length < 3 || name.length > 20)
      return "Username must be between 3 and 20 characters.";
    if (!/^\w+$/.test(name))
      return "Only letters, numbers, and underscores (_) are allowed.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const valError = validate(username);
    if (valError) return setError(valError);

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/user/me`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!res.ok) {
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        setError(data.message || "Username is already taken.");
      } else {
        onClose();
      }
    } catch (err) {
      console.error("Username update failed:", err);
      setError("Profile update failed. Please try again.");
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
        type="text"
        placeholder="Enter new username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      {error && <p className="input-error">{error}</p>}

      {loading && (
        <div className="form-loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Update"}
        </button>
        <button type="button" onClick={onClose} disabled={loading}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UsernameForm;
