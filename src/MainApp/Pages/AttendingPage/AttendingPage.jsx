// AttendingPage.jsx
import { useState } from "react";
import "./AttendingPage.css";

const attendingEvents = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  title: `Attending Event ${i + 1}`,
  location: "City Center Hall, Example City",
  date: new Date(2029, 6, (i % 28) + 1),
}));

export default function AttendingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;
  const totalPages = Math.ceil(attendingEvents.length / eventsPerPage);

  const paginatedEvents = attendingEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  return (
    <div className="attending-page">
      <h2 className="attending-title">Events You're Attending</h2>

      <section className="attending-grid">
        {paginatedEvents.map((event) => (
          <div className="event-card" key={event.id}>
            <div className="event-image-placeholder" />
            <div className="card-badge">Attending</div>
            <div className="card-content">
              <h3>{event.title}</h3>
              <p>{event.location}</p>
              <div className="card-footer">
                <span className="event-date">
                  📅 {event.date.toDateString()}
                </span>
                <button className="cancel-button">Cancel</button>
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
