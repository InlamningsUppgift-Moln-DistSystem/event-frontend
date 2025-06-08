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
  const maxYear = today.getFullYear() + 2;
  const maxMonth = 11; // December

  const [currentMonth, setCurrentMonth] = useState(() => {
    const saved = localStorage.getItem("events_currentMonth");
    return saved !== null ? parseInt(saved) : today.getMonth();
  });

  const [currentYear, setCurrentYear] = useState(() => {
    const saved = localStorage.getItem("events_currentYear");
    return saved !== null ? parseInt(saved) : today.getFullYear();
  });

  const [events, setEvents] = useState([]);
  const [attendingEventIds, setAttendingEventIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const eventsPerPage = 10;
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const paginatedEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  useEffect(() => {
    if (!userId) return;

    const token = localStorage.getItem("token");

    const fetchEvents = fetch(
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
      });

    const fetchAttending = fetch(`${API_BASE}/api/Events/attending`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((ids) => setAttendingEventIds(ids));

    Promise.all([fetchEvents, fetchAttending])
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentMonth, currentYear, userId]);

  const handleMonthChange = (direction) => {
    setCurrentPage(1);

    if (direction === -1) {
      if (
        currentYear === today.getFullYear() &&
        currentMonth === today.getMonth()
      )
        return;
    }

    if (direction === 1) {
      if (currentYear === maxYear && currentMonth === maxMonth) return;
    }

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(
      "https://user-service-api-fgbuhbe9dmgbb3gp.swedencentral-01.azurewebsites.net/api/user/me",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => setUserId(data.id))
      .catch(console.error);
  }, []);

  useEffect(() => {
    localStorage.setItem("events_currentMonth", currentMonth);
    localStorage.setItem("events_currentYear", currentYear);
  }, [currentMonth, currentYear]);

  const handleMonthSelect = (e) => {
    const [year, month] = e.target.value.split("-").map(Number);
    setCurrentMonth(month);
    setCurrentYear(year);
    setCurrentPage(1);
  };

  const toggleAttend = (eventId) => {
    const token = localStorage.getItem("token");
    const isAttending = attendingEventIds.includes(eventId);

    fetch(`${API_BASE}/api/Events/${eventId}/attend`, {
      method: isAttending ? "DELETE" : "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) {
          setAttendingEventIds((prev) =>
            isAttending
              ? prev.filter((id) => id !== eventId)
              : [...prev, eventId]
          );

          setEvents((prevEvents) =>
            prevEvents.map((e) =>
              e.id === eventId
                ? {
                    ...e,
                    attendeeCount: isAttending
                      ? Math.max(0, e.attendeeCount - 1)
                      : e.attendeeCount + 1,
                  }
                : e
            )
          );
        }
      })
      .catch(console.error);
  };

  const renderMonthOptions = () => {
    const options = [];
    const startYear = today.getFullYear();
    const startMonth = today.getMonth();
    for (let y = startYear; y <= maxYear; y++) {
      for (let m = 0; m < 12; m++) {
        if (y === startYear && m < startMonth) continue;
        if (y === maxYear && m > maxMonth) continue;
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
          disabled={
            currentYear === today.getFullYear() &&
            currentMonth === today.getMonth()
          }
          style={{
            opacity:
              currentYear === today.getFullYear() &&
              currentMonth === today.getMonth()
                ? 0.4
                : 1,
            cursor:
              currentYear === today.getFullYear() &&
              currentMonth === today.getMonth()
                ? "not-allowed"
                : "pointer",
          }}
          title={
            currentYear === today.getFullYear() &&
            currentMonth === today.getMonth()
              ? "You can't view past months"
              : "Previous month"
          }
        >
          <span className="arrow">&laquo;</span>
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
          disabled={currentYear === maxYear && currentMonth === maxMonth}
          style={{
            opacity:
              currentYear === maxYear && currentMonth === maxMonth ? 0.4 : 1,
            cursor:
              currentYear === maxYear && currentMonth === maxMonth
                ? "not-allowed"
                : "pointer",
          }}
          title={
            currentYear === maxYear && currentMonth === maxMonth
              ? "You can't view more than 2 years ahead"
              : "Next month"
          }
        >
          <span className="arrow">&raquo;</span>
        </button>
      </header>

      <section className="event-grid">
        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner" />
          </div>
        ) : paginatedEvents.length === 0 ? (
          <div className="no-events-message">
            <h2>
              There are currently no events in {monthNames[currentMonth]}{" "}
              {currentYear}.
            </h2>
            <p>But you could be the first to create one!</p>
          </div>
        ) : (
          paginatedEvents.map((event) => {
            const isAttending = attendingEventIds.includes(event.id);
            const isOwner = event.ownerId === userId;
            return (
              <div className="event-card" key={event.id}>
                <img
                  className="event-image"
                  src={event.imageUrl || "/placeholder.jpg"}
                  alt={event.title}
                />
                {isOwner && <div className="card-badge">Created</div>}
                <div className="card-content">
                  <h3>{event.title}</h3>
                  <p>{event.location}</p>
                  <p>👥 {event.attendeeCount} attending</p>
                  <div className="card-footer">
                    <span className="event-date">
                      📅 {new Date(event.startDate).toDateString()}
                    </span>
                    {!isOwner && (
                      <div className="attend-button-wrapper">
                        <button
                          className={`attend-button ${
                            isAttending ? "attending" : ""
                          }`}
                          onClick={() => toggleAttend(event.id)}
                        >
                          {isAttending ? "Unattend" : "Attend"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
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
