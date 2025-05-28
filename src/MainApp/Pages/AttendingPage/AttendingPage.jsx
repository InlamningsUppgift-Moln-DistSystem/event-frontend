import { useEffect, useState } from "react";
import "./AttendingPage.css";

const API_BASE =
  "https://eventservice-api-cebndaaheydrfbcs.swedencentral-01.azurewebsites.net";

export default function AttendingPage() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;

  const paginatedEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${API_BASE}/api/events/my-attending`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch attending events.");
        return res.json();
      })
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
        setEvents(sorted);
      })
      .catch(console.error);
  }, []);

  const handleUnattend = (eventId) => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/api/events/${eventId}/attend`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) {
          setEvents((prev) => prev.filter((e) => e.id !== eventId));
        }
      })
      .catch(console.error);
  };

  const totalPages = Math.ceil(events.length / eventsPerPage);

  return (
    <div className="attending-page">
      <h2 className="attending-title">Events You're Attending</h2>

      <section className="attending-grid">
        {paginatedEvents.map((event) => (
          <div className="event-card" key={event.id}>
            <img
              className="event-image"
              src={event.imageUrl || "/placeholder.jpg"}
              alt={event.title}
            />
            <div className="card-badge">Attending</div>
            <div className="card-content">
              <h3>{event.title}</h3>
              <p>{event.location}</p>
              <p>👥 {event.attendeeCount} attending</p>
              <div className="card-footer">
                <span className="event-date">
                  📅 {new Date(event.startDate).toDateString()}
                </span>
                <button
                  className="cancel-button"
                  onClick={() => handleUnattend(event.id)}
                >
                  Unattend
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
    </div>
  );
}
