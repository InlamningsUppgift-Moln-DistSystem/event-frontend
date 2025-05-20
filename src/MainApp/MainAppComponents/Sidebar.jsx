// Sidebar.jsx (lägg i src/components)
import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = (path) => pathname.includes(path);

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Rensa auth
    navigate("/"); // Tillbaka till login
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
      {/* Endast synlig i mobil – hamburger button */}
      <button className="hamburger-button">
        <svg
          className="hamburger-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <nav className="main-nav">
        <a
          onClick={() => navigate("/app/timeline")}
          className={`nav-item ${isActive("timeline") ? "active" : ""}`}
        >
          <svg
            className="nav-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 5H20V7H4V5ZM4 11H20V13H4V11ZM4 17H14V19H4V17Z"
              fill="#37437D"
            />
          </svg>

          <span>Timeline</span>
          <span className="active-indicator"></span>
        </a>

        <a
          onClick={() => navigate("/app/events")}
          className={`nav-item ${isActive("events") ? "active" : ""}`}
        >
          <svg
            className="nav-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7 2V5H17V2H19V5H20C21.1 5 22 5.9 22 7V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V7C2 5.9 2.9 5 4 5H5V2H7ZM20 9H4V20H20V9Z"
              fill="#37437D"
            />
          </svg>
          <span>Events</span>
          <span className="active-indicator"></span>
        </a>

        <a
          onClick={() => navigate("/app/attending")}
          className={`nav-item ${isActive("attending") ? "active" : ""}`}
        >
          <svg
            className="nav-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
              fill="#37437D"
            />
          </svg>
          <span>Attending</span>
          <span className="active-indicator"></span>
        </a>

        <a
          onClick={() => navigate("/app/following")}
          className={`nav-item ${isActive("following") ? "active" : ""}`}
        >
          <svg
            className="nav-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M16 3H8C6.9 3 6 3.9 6 5V21L12 18L18 21V5C18 3.9 17.1 3 16 3Z"
              fill="#37437D"
            />
          </svg>
          <span>Following</span>
          <span className="active-indicator"></span>
        </a>
      </nav>

      <div className="sidebar-footer">
        {/* Desktop-knapp */}
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>

        {/* Tablet-ikonknapp */}
        <button className="signout-icon-button" onClick={handleSignOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#37437D"
              d="M16 13v-2H8V9l-4 3 4 3v-2h8zM20 3H4c-1.1 0-2 .9-2 2v4h2V5h16v14H4v-4H2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
