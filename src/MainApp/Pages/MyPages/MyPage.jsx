// MyPage.jsx
import { useEffect, useState } from "react";
import "./MyPage.css";

const API_BASE =
  "https://user-service-api-fgbuhbe9dmgbb3gp.swedencentral-01.azurewebsites.net";

function MyPage() {
  const [editField, setEditField] = useState(null);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_BASE}/api/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);
  }, []);

  const closeForm = () => {
    setEditField(null);
    window.location.reload(); // ladda om för att visa uppdaterad data
  };

  if (!user) return <div className="my-page">Loading...</div>;

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

function UsernameForm({ current, onClose }) {
  const [username, setUsername] = useState(current);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/user/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email: null,
        password: null,
      }),
    });

    if (!res.ok) {
      const msg = await res.text();
      alert("Failed to update username: " + msg);
      return;
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <div className="form-actions">
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function EmailForm({ current, onClose }) {
  const [email, setEmail] = useState(current);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/user/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: null,
        email,
        password: null,
      }),
    });

    if (!res.ok) {
      const msg = await res.text();
      alert("Failed to update email: " + msg);
      return;
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="form-actions">
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function PasswordForm({ onClose }) {
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/user/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: null,
        email: null,
        password,
      }),
    });

    if (!res.ok) {
      const msg = await res.text();
      alert("Failed to update password: " + msg);
      return;
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="form-actions">
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function ImageUploadForm({ imageUrl, onClose }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(imageUrl);
  const token = localStorage.getItem("token");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // OBS! backend kräver namnet "file" inte "image"

    const res = await fetch(`${API_BASE}/api/user/me/upload-profile-image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const msg = await res.text();
      alert("Failed to upload image: " + msg);
      return;
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="profile-image-preview" />
      )}
      <label htmlFor="image-upload" className="custom-file-upload">
        {fileName || "Choose image"}
      </label>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <div className="form-actions">
        <button type="submit">Upload</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default MyPage;
