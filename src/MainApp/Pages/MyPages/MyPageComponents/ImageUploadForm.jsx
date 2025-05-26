// 📁 /MyPageComponents/ImageUploadForm.jsx
import { useState } from "react";
const API_BASE =
  "https://user-service-api-fgbuhbe9dmgbb3gp.swedencentral-01.azurewebsites.net";

function ImageUploadForm({ imageUrl, onClose }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(imageUrl);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return setError("No file selected.");
    if (!["image/jpeg", "image/png", "image/jpg"].includes(selected.type)) {
      return setError(
        "Invalid file format. Only .jpg, .jpeg and .png are allowed."
      );
    }
    if (selected.size > 4 * 1024 * 1024) {
      return setError("File is too large (max 4MB).");
    }

    setError("");
    setFile(selected);
    setFileName(selected.name);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError("No file selected.");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/api/user/me/upload-profile-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      setError("Upload failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="profile-form"
      style={{ position: "relative" }}
    >
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

      {error && <p className="input-error">{error}</p>}

      {loading && (
        <div className="form-loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
        <button type="button" onClick={onClose} disabled={loading}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ImageUploadForm;
