// 📁 /MyPageComponents/UsernameForm.jsx
import { useState } from "react";

const API_BASE =
  "https://user-service-api-fgbuhbe9dmgbb3gp.swedencentral-01.azurewebsites.net";

function UsernameForm({ onClose }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
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

    try {
      const res = await fetch(`${API_BASE}/api/user/me/username`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(username),
      });

      if (!res.ok) {
        // Fånga även om svaret är tomt (t.ex. 400 utan body)
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
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <input
        type="text"
        placeholder="Enter new username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      {error && <p className="input-error">{error}</p>}
      <div className="form-actions">
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UsernameForm;
