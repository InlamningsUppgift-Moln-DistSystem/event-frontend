import "./MyEvents.css";
import { useState } from "react";

const myEvents = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  title: `My Event ${i + 1}`,
  location: "Your Venue, Your City",
  date: new Date(2029, 8, (i % 28) + 1),
}));

function MyEvents() {
  const eventsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(myEvents.length / eventsPerPage);

  const paginatedEvents = myEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  return (
    <div className="my-events-page">
      <h2 className="my-events-title">My Events</h2>

      <section className="my-events-grid">
        {paginatedEvents.map((event) => (
          <div className="event-card" key={event.id}>
            <div className="event-image-placeholder" />
            <div className="card-badge">Created</div>
            <div className="card-content">
              <h3>{event.title}</h3>
              <p>{event.location}</p>
              <div className="card-footer">
                <span className="event-date">
                  📅 {event.date.toDateString()}
                </span>
                <button className="delete-button">Delete</button>
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

export default MyEvents;
