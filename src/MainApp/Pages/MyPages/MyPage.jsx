// MyPage.jsx
import { useEffect, useState } from "react";
import "./MyPage.css";
import UsernameForm from "./MyPageComponents/UsernameForm";
import EmailForm from "./MyPageComponents/EmailForm";
import PasswordForm from "./MyPageComponents/PasswordForm";
import ImageUploadForm from "./MyPageComponents/ImageUploadForm";

const API_BASE =
  "https://user-service-api-fgbuhbe9dmgbb3gp.swedencentral-01.azurewebsites.net";

function MyPage() {
  const [editField, setEditField] = useState(null);
  const [user, setUser] = useState(undefined);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_BASE}/api/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized or server error");
        const data = await res.json();
        setUser(data);
      })
      .catch((err) => {
        console.error("❌ Failed to load user:", err);
        setUser(null);
      });
  }, []);

  const closeForm = () => {
    setEditField(null);
    window.location.reload();
  };

  if (user === undefined) {
    return <div className="my-page">Loading...</div>;
  }

  if (user === null) {
    return (
      <div className="my-page">
        <div className="profile-container">
          <p className="input-error">
            Failed to load user info. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-page">
      <div className="profile-container">
        {editField === null ? (
          <>
            <h2 className="profile-title">Profile Settings</h2>

            <div className="profile-row">
              <div className="profile-label">
                <strong>Profile Image</strong>
              </div>
              <button
                onClick={() => setEditField("profileImage")}
                className="change-button"
              >
                Change
              </button>
            </div>

            <div className="profile-row">
              <div className="profile-label">
                <strong>Username</strong>
                <br />
                {user.username}
              </div>
              <button
                onClick={() => setEditField("username")}
                className="change-button"
              >
                Change
              </button>
            </div>

            <div className="profile-row">
              <div className="profile-label">
                <strong>Email</strong>
                <br />
                {user.email}
              </div>
              <button
                onClick={() => setEditField("email")}
                className="change-button"
              >
                Change
              </button>
            </div>

            <div className="profile-row">
              <div className="profile-label">
                <strong>Password</strong>
              </div>
              <button
                onClick={() => setEditField("password")}
                className="change-button"
              >
                Change
              </button>
            </div>
          </>
        ) : (
          <div className="edit-mode">
            <div className="edit-header">
              <h3>Edit {editField}</h3>
            </div>
            <div className="edit-form-area">
              {editField === "username" && (
                <UsernameForm current={user.username} onClose={closeForm} />
              )}
              {editField === "email" && (
                <EmailForm current={user.email} onClose={closeForm} />
              )}
              {editField === "password" && <PasswordForm onClose={closeForm} />}
              {editField === "profileImage" && (
                <ImageUploadForm
                  imageUrl={user.profileImageUrl}
                  onClose={closeForm}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPage;
