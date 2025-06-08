import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../../SiteComponents/ConfirmModal";

function Sidebar({ openGdprModal }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // ✅ NY

  const isActive = (path) => pathname.startsWith(`/app/${path}`);

  const handleSignOut = () => {
    setShowLogoutConfirm(true); // ✅ Visa modal istället för direkt logout
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
          className="hamburger-button"
          onClick={() => {
            setMenuOpen((prev) => !prev);
          }}
        >
          ☰
        </button>
      </div>

      <nav className="main-nav">
        <h4 className="nav-section-title">Public Events</h4>
        <a
          onClick={() => navigate("/app/events")}
          className={`nav-item ${isActive("events") ? "active" : ""}`}
        >
          📅 <span>Browse</span>
          <span className="active-indicator"></span>
        </a>

        <a
          onClick={() => navigate("/app/attending")}
          className={`nav-item ${isActive("attending") ? "active" : ""}`}
        >
          👥 <span>Joined</span>
          <span className="active-indicator"></span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <button
          className="sidebar-create-event"
          onClick={() => navigate("/app/myevents")}
        >
          Create Event
        </button>

        <button className="signout-button" onClick={handleSignOut}>
          Log Out
        </button>
        <button className="signout-icon-button" onClick={handleSignOut}>
          ⎋
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-dropdown">
          <div className="dropdown-section nav-links">
            <h4 className="dropdown-title">Public Events</h4>
            <button
              onClick={() => {
                navigate("/app/events");
                setMenuOpen(false);
              }}
            >
              Browse
            </button>
            <button
              onClick={() => {
                navigate("/app/attending");
                setMenuOpen(false);
              }}
            >
              Joined
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
              className="mobile-create-event-button"
              onClick={() => {
                navigate("/app/myevents");
                setMenuOpen(false);
              }}
            >
              Create Event
            </button>

            <button
              className="mobile-logout-button"
              onClick={() => {
                setMenuOpen(false);
                handleSignOut();
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
                openGdprModal();
                setMenuOpen(false);
              }}
            >
              GDPR Settings
            </button>
          </div>
        </div>
      )}

      {/* ✅ LOGOUT MODAL */}
      {showLogoutConfirm && (
        <ConfirmModal
          title="Are you sure?"
          message="Do you really want to log out?"
          onConfirm={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("initials");
            window.location.href = "/";
          }}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
    </aside>
  );
}

export default Sidebar;
