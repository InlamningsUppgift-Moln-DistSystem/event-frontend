// 📁 /MyPageComponents/PasswordForm.jsx
import { useState } from "react";
const API_BASE =
  "https://user-service-api-fgbuhbe9dmgbb3gp.swedencentral-01.azurewebsites.net";

function PasswordForm({ onClose }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const validatePassword = (pw) => {
    if (!pw) return "Password is required.";
    if (
      pw.length < 8 ||
      !/[A-Z]/.test(pw) ||
      !/[a-z]/.test(pw) ||
      !/[0-9]/.test(pw) ||
      !/[!@#$%^&*()_+{}[\]:;<>,.?~/-]/.test(pw)
    ) {
      return "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const passwordError = validatePassword(password);
    if (passwordError) return setError(passwordError);

    try {
      const res = await fetch(`${API_BASE}/api/user/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const message = await res.text();
        console.error("❌ Server error:", message);
        setError("Password update failed. Please try again.");
        return;
      }

      onClose();
    } catch (err) {
      console.error("❌ Server error:", err);
      setError("Server error. Please try later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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

export default PasswordForm;
