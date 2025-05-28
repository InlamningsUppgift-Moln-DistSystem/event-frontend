import "./MyEvents.css";
import { useEffect, useState } from "react";

const API_BASE =
  "https://eventservice-api-cebndaaheydrfbcs.swedencentral-01.azurewebsites.net";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form, setForm] = useState({
    title: "",
    location: "",
    date: "",
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");
  const eventsPerPage = 10;
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const paginatedEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/api/Events/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then(setEvents)
        .catch(console.error);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.location.trim()) newErrors.location = "Location is required.";
    if (!form.date) newErrors.date = "Date is required.";
    if (!form.image) newErrors.image = "Image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImage = async (file, oldImageUrl = null) => {
    const formData = new FormData();
    formData.append("file", file);
    if (oldImageUrl) formData.append("oldImageUrl", oldImageUrl);

    const res = await fetch(`${API_BASE}/api/Events/upload-image`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    return data.imageUrl;
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      let imageUrl = "";
      if (form.image) {
        imageUrl = await uploadImage(form.image);
      }

      const res = await fetch(`${API_BASE}/api/Events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          location: form.location,
          startDate: form.date,
          imageUrl,
        }),
      });

      const newEvent = await res.json();
      setEvents([newEvent, ...events]);
      setShowCreateModal(false);
      setForm({ title: "", location: "", date: "", image: null });
      setPreviewUrl(null);
      setErrors({});
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      let imageUrl = selectedEvent.imageUrl;
      if (form.image) {
        imageUrl = await uploadImage(form.image, selectedEvent.imageUrl);
      }

      const res = await fetch(`${API_BASE}/api/Events/${selectedEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          location: form.location,
          startDate: form.date,
          imageUrl,
        }),
      });

      const updated = await res.json();
      setEvents(events.map((e) => (e.id === updated.id ? updated : e)));
      setShowEditModal(false);
      setSelectedEvent(null);
      setForm({ title: "", location: "", date: "", image: null });
      setPreviewUrl(null);
      setErrors({});
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/api/Events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (event) => {
    setSelectedEvent(event);
    setForm({
      title: event.title,
      location: event.location,
      date: event.startDate.split("T")[0],
      image: null,
    });
    setPreviewUrl(event.imageUrl || null);
    setErrors({});
    setShowEditModal(true);
  };

  const ImageUploadBox = () => (
    <>
      <div
        className={`image-upload-box ${errors.image ? "error" : ""}`}
        onClick={() => document.getElementById("imageInput").click()}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="image-preview" />
        ) : (
          <div className="placeholder-box">
            <div className="plus-sign">+</div>
            <div className="add-text">Add Picture</div>
          </div>
        )}
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0];
            setForm({ ...form, image: file });
            setPreviewUrl(URL.createObjectURL(file));
            setErrors({ ...errors, image: undefined }); // clear image error
          }}
        />
      </div>
      {errors.image && <span className="error-message">{errors.image}</span>}
    </>
  );

  const renderFormFields = (isEdit = false, onSubmit) => (
    <form onSubmit={onSubmit} className="event-form">
      <ImageUploadBox />
      <label>
        Title
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </label>
      <label>
        Location
        <input
          type="text"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        {errors.location && (
          <span className="error-message">{errors.location}</span>
        )}
      </label>
      <label>
        Date
        <input
          type="date"
          value={form.date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        {errors.date && <span className="error-message">{errors.date}</span>}
      </label>
      <div className="form-buttons">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
            ? "Update"
            : "Create"}
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={() =>
            isEdit ? setShowEditModal(false) : setShowCreateModal(false)
          }
        >
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <div className="my-events-page">
      <div className="my-events-header">
        <button
          className="create-event-button"
          onClick={() => setShowCreateModal(true)}
        >
          + Add New Event
        </button>
      </div>

      <section className="my-events-grid">
        {paginatedEvents.map((event) => (
          <div className="event-card" key={event.id}>
            <img
              className="event-image"
              src={event.imageUrl || "/placeholder.jpg"}
              alt={event.title}
            />
            <div className="card-badge">Created</div>
            <div className="card-content">
              <h3>{event.title}</h3>
              <p>{event.location}</p>
              <p>👥 {event.attendeeCount} attending</p>
              <div className="card-footer">
                <span className="event-date">
                  📅 {new Date(event.startDate).toDateString()}
                </span>
                <button
                  className="edit-button"
                  onClick={() => openEditModal(event)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create New Event</h3>
            {renderFormFields(false, handleCreateEvent)}
          </div>
        </div>
      )}

      {showEditModal && selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Event</h3>
            {renderFormFields(true, handleEditEvent)}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyEvents;
