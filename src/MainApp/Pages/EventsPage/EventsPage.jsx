// EventsPage.jsx
import { useState } from "react";
import "./EventsPage.css";

const sampleEvents = [
  // 12 events in May (month 4)
  ...Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `May Event ${i + 1}`,
    location: "SkyDome Stadium, Toronto, ON",
    date: new Date(2029, 4, (i % 28) + 1),
    image: "",
  })),
  // 4 events in June (month 5)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: i + 13,
    title: `June Event ${i + 1}`,
    location: "Central Park Arena, New York, NY",
    date: new Date(2029, 5, (i % 28) + 1),
    image: "",
  })),
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function EventsPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentPage, setCurrentPage] = useState(1);

  const eventsThisMonth = sampleEvents.filter(
    (event) => event.date.getMonth() === currentMonth
  );

  const eventsPerPage = 10;
  const totalPages = Math.ceil(eventsThisMonth.length / eventsPerPage);
  const paginatedEvents = eventsThisMonth.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const handleMonthChange = (direction) => {
    setCurrentPage(1);
    setCurrentMonth((prev) => (prev + direction + 12) % 12);
  };

  return (
    <div className="events-page">
      <header className="month-header">
        <button onClick={() => handleMonthChange(-1)}>&laquo;</button>
        <h2>{monthNames[currentMonth]}</h2>
        <button onClick={() => handleMonthChange(1)}>&raquo;</button>
      </header>

      <section className="event-grid">
        {paginatedEvents.map((event) => (
          <div className="event-card" key={event.id}>
            <div className="event-image-placeholder">
              {/* Grayscale image placeholder */}
            </div>
            <div className="card-badge">Creator</div>
            <div className="card-content">
              <h3>{event.title}</h3>
              <p>{event.location}</p>
              <div className="card-footer">
                <span className="event-date">
                  📅 {event.date.toDateString()}
                </span>
                <div className="attend-button-wrapper">
                  <button className="attend-button">Attend</button>
                </div>
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
