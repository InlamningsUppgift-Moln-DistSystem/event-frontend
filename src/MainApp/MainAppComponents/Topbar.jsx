// Topbar.jsx
import "./Topbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect, useRef } from "react";

function Topbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const dropdownRef = useRef(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const getPageTitle = () => {
    if (pathname.includes("timeline")) return "Timeline";
    if (pathname.includes("events") && !pathname.includes("myevents"))
      return "Events";
    if (pathname.includes("attending")) return "Attending";
    if (pathname.includes("following")) return "Following";
    if (pathname.includes("mypage")) return "My Page";
    if (pathname.includes("myevents")) return "My Events";
    return "Dashboard";
  };

  const getPageSubtitle = () => {
    if (pathname.includes("timeline"))
      return "Latest activity from events and organizers.";
    if (pathname.includes("events") && !pathname.includes("myevents"))
      return "Browse all upcoming events by date.";
    if (pathname.includes("attending"))
      return "Events you’ve marked as attending.";
    if (pathname.includes("following"))
      return "Updates from creators you follow.";
    if (pathname.includes("mypage"))
      return "Your account profile and preferences.";
    if (pathname.includes("myevents"))
      return "Events you’ve created or manage.";
    return "Welcome back!";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(null); // Stänger allt
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1 className="dashboard-title">{getPageTitle()}</h1>
        <p className="welcome-message">{getPageSubtitle()}</p>
      </div>

      <nav className="header-controls" ref={dropdownRef}>
        <div className="dropdown-wrapper">
          <button
            className="control-button"
            aria-label="Notifications"
            onClick={() => toggleMenu("notifications")}
          >
            🔔
            {openMenu === "notifications" && (
              <div
                className="dropdown-menu notifications"
                onClick={(e) => e.stopPropagation()}
              >
                <h4>Notifications</h4>
                <ul>
                  <li className="comment">
                    <span>New comment</span> on your event
                    <button
                      className="dismiss-btn"
                      aria-label="Dismiss notification"
                    >
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M18 6L6 18M6 6l12 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </li>
                  <li className="follower">
                    <span>Follower</span> posted an update
                    <button
                      className="dismiss-btn"
                      aria-label="Dismiss notification"
                    >
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M18 6L6 18M6 6l12 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </li>
                  <li className="event">
                    Your <span>event</span> was approved
                    <button
                      className="dismiss-btn"
                      aria-label="Dismiss notification"
                    >
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M18 6L6 18M6 6l12 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </li>
                  <li className="maintenance">
                    <span>System update</span> scheduled for tonight
                    <button
                      className="dismiss-btn"
                      aria-label="Dismiss notification"
                    >
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M18 6L6 18M6 6l12 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </button>
        </div>

        <div className="dropdown-wrapper">
          <button
            className="control-button"
            aria-label="Settings"
            onClick={() => toggleMenu("settings")}
          >
            ⚙️
            {openMenu === "settings" && (
              <div className="dropdown-menu settings">
                <h4>Settings</h4>
                <label className="toggle-option">
                  <input type="checkbox" />
                  Dark Mode:{"\u00A0"}
                  <span className="status-off">Off</span>
                </label>

                <button className="settings-button gdpr-button">
                  GDPR Settings
                </button>
              </div>
            )}
          </button>
        </div>

        <div className="dropdown-wrapper">
          <div className="user-profile" onClick={() => toggleMenu("profile")}>
            <div className="profile-avatar"></div>
            <div className="profile-info">
              <h2 className="profile-name">Orlando Laurentius</h2>
              <p className="profile-role">Admin</p>
            </div>
          </div>
          {openMenu === "profile" && (
            <div className="dropdown-menu profile">
              <h4>Account</h4>
              <button onClick={() => navigate("/app/mypage")}>My Page</button>
              <button onClick={() => navigate("/app/myevents")}>
                My Events
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("username");
                  localStorage.removeItem("initials");

                  setTimeout(() => {
                    window.location.href = "/";
                  }, 0);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Topbar;
