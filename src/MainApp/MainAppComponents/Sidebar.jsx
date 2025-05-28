import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar({ openGdprModal }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  // const [notificationOpen, setNotificationOpen] = useState(false);

  const isActive = (path) => pathname.startsWith(`/app/${path}`);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("initials");
    window.location.href = "/";
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/41aecbfdf060d1421e6194416630610755118506"
          alt="Symbol"
          className="brand-logo"
        />
        <h1 className="brand-name">Ventixe</h1>
      </div>

      <div className="mobile-actions">
        <button
          className="notification-button"
          onClick={() => {
            // setNotificationOpen((prev) => !prev);
            setMenuOpen(false);
          }}
        >
          🔔
        </button>

        <button
          className="hamburger-button"
          onClick={() => {
            setMenuOpen((prev) => !prev);
            // setNotificationOpen(false);
          }}
        >
          ☰
        </button>
      </div>

      <nav className="main-nav">
        <a
          onClick={() => navigate("/app/events")}
          className={`nav-item ${isActive("events") ? "active" : ""}`}
        >
          📅 <span>Events</span>
          <span className="active-indicator"></span>
        </a>

        <a
          onClick={() => navigate("/app/attending")}
          className={`nav-item ${isActive("attending") ? "active" : ""}`}
        >
          👥 <span>Attending</span>
          <span className="active-indicator"></span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
        <button className="signout-icon-button" onClick={handleSignOut}>
          ⎋
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-dropdown">
          <div className="dropdown-section nav-links">
            <h4 className="dropdown-title">Main Pages</h4>
            <button
              onClick={() => {
                navigate("/app/events");
                setMenuOpen(false);
              }}
            >
              Events
            </button>
            <button
              onClick={() => {
                navigate("/app/attending");
                setMenuOpen(false);
              }}
            >
              Attending
            </button>
          </div>
          <hr />
          <div className="user-info">
            <strong>Kevin</strong>
            <span className="role">User</span>
          </div>
          <hr />
          <div className="dropdown-section">
            <h4 className="dropdown-title">My Pages</h4>
            <button
              onClick={() => {
                navigate("/app/mypage");
                setMenuOpen(false);
              }}
            >
              My Page
            </button>
            <button
              onClick={() => {
                navigate("/app/myevents");
                setMenuOpen(false);
              }}
            >
              My Events
            </button>
            <button
              onClick={() => {
                handleSignOut();
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
          </div>
          <hr />
          <div className="dropdown-section nav-links">
            <h4 className="dropdown-title">Settings</h4>
            <button
              onClick={() => {
                // placeholder for dark mode toggle
                setMenuOpen(false);
              }}
            >
              Dark Mode: <span className="status-off">Off</span>
            </button>
            <button
              onClick={() => {
                openGdprModal();
                setMenuOpen(false);
              }}
            >
              GDPR Settings
            </button>
          </div>
        </div>
      )}

      {/* {notificationOpen && (
        <div className="mobile-notification-dropdown">
          <h4>Notifications</h4>
          <ul>
            <li className="event">
              <span>New event published</span>
            </li>
            <li className="follower">
              <span>Alice followed you</span>
            </li>
            <li className="maintenance">
              <span>Maintenance tomorrow</span>
            </li>
          </ul>
        </div>
      )} */}
    </aside>
  );
}

export default Sidebar;
