import "./MyEvents.css";
import { useEffect, useState } from "react";

const API_BASE =
  "https://eventservice-api-cebndaaheydrfbcs.swedencentral-01.azurewebsites.net";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form, setForm] = useState({ title: "", location: "", date: "" });
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
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
        }),
      });
      const newEvent = await res.json();
      setEvents([newEvent, ...events]);
      setShowCreateModal(false);
      setForm({ title: "", location: "", date: "" });
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

  const handleSelectEvent = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/Events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSelectedEvent(data);
    } catch (err) {
      console.error(err);
    }
  };

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
          <div
            className="event-card"
            key={event.id}
            onClick={() => handleSelectEvent(event.id)}
          >
            <div className="event-image-placeholder" />
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
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(event.id);
                  }}
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
            <form onSubmit={handleCreateEvent} className="event-form">
              <label>
                Title
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={errors.title ? "error" : ""}
                />
                {errors.title && (
                  <p className="error-message">{errors.title}</p>
                )}
              </label>
              <label>
                Location
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className={errors.location ? "error" : ""}
                />
                {errors.location && (
                  <p className="error-message">{errors.location}</p>
                )}
              </label>
              <label>
                Date
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={errors.date ? "error" : ""}
                />
                {errors.date && <p className="error-message">{errors.date}</p>}
              </label>
              <div className="form-buttons">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create"}
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedEvent.title}</h3>
            <p>
              <strong>Location:</strong> {selectedEvent.location}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedEvent.startDate).toDateString()}
            </p>
            <p>
              <strong>Attendees:</strong> {selectedEvent.attendeeCount}
            </p>
            <button
              className="cancel-button"
              onClick={() => setSelectedEvent(null)}
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyEvents;
