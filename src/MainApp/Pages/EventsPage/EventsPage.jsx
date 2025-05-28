// 📁 EventsPage.jsx
import { useEffect, useState } from "react";
import "./EventsPage.css";

const API_BASE =
  "https://eventservice-api-cebndaaheydrfbcs.swedencentral-01.azurewebsites.net";

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
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);
  const [attending, setAttending] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const eventsPerPage = 10;
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const paginatedEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  useEffect(() => {
    fetch(
      `${API_BASE}/api/Events/month?year=${currentYear}&month=${
        currentMonth + 1
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
        setEvents(sorted);
      })
      .catch(console.error);
  }, [currentMonth, currentYear]);

  const handleMonthChange = (direction) => {
    setCurrentPage(1);

    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleMonthSelect = (e) => {
    const [year, month] = e.target.value.split("-").map(Number);
    setCurrentMonth(month);
    setCurrentYear(year);
    setCurrentPage(1);
  };

  const toggleAttend = (eventId) => {
    setAttending((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const renderMonthOptions = () => {
    const options = [];
    const startYear = today.getFullYear();
    const startMonth = today.getMonth();

    for (let y = startYear; y <= startYear + 2; y++) {
      for (let m = 0; m < 12; m++) {
        if (y === startYear && m < startMonth) continue;
        options.push(
          <option key={`${y}-${m}`} value={`${y}-${m}`}>
            {monthNames[m]} {y}
          </option>
        );
      }
    }

    return options;
  };

  return (
    <div className="events-page">
      <header className="month-header">
        <button
          className="month-nav-left"
          onClick={() => handleMonthChange(-1)}
        >
          &laquo;
        </button>
        <select
          className="month-select"
          value={`${currentYear}-${currentMonth}`}
          onChange={handleMonthSelect}
        >
          {renderMonthOptions()}
        </select>
        <button
          className="month-nav-right"
          onClick={() => handleMonthChange(1)}
        >
          &raquo;
        </button>
      </header>

      <section className="event-grid">
        {paginatedEvents.map((event) => {
          const isAttending = attending.includes(event.id);
          return (
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
                <div className="card-footer">
                  <span className="event-date">
                    🗕️ {new Date(event.startDate).toDateString()}
                  </span>
                  <div className="attend-button-wrapper">
                    <button
                      className={`attend-button ${
                        isAttending ? "attending" : ""
                      }`}
                      onClick={() => toggleAttend(event.id)}
                    >
                      {isAttending ? "Cancel" : "Attend"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
