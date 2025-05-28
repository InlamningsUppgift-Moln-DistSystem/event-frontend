import "./MyEvents.css";
import { useState } from "react";

function MyEvents() {
  const [events, setEvents] = useState(
    Array.from({ length: 14 }, (_, i) => ({
      id: i + 1,
      title: `My Event ${i + 1}`,
      location: "Your Venue, Your City",
      date: new Date(2029, 8, (i % 28) + 1),
      attendeeCount: 1,
    }))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventsPerPage = 10;
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const paginatedEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const [form, setForm] = useState({
    title: "",
    location: "",
    date: "",
  });

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      title: form.title,
      location: form.location,
      date: new Date(form.date),
      attendeeCount: 1,
    };
    setEvents([newEvent, ...events]);
    setForm({ title: "", location: "", date: "" });
    setShowCreateModal(false);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
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
            onClick={() => setSelectedEvent(event)}
          >
            <div className="event-image-placeholder" />
            <div className="card-badge">Created</div>
            <div className="card-content">
              <h3>{event.title}</h3>
              <p>{event.location}</p>
              <p>👥 {event.attendeeCount} attending</p>
              <div className="card-footer">
                <span className="event-date">
                  📅 {event.date.toDateString()}
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
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </label>
              <label>
                Location
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
              </label>
              <label>
                Date
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </label>
              <div className="form-buttons">
                <button type="submit">Create</button>
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
              <strong>Date:</strong> {selectedEvent.date.toDateString()}
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
