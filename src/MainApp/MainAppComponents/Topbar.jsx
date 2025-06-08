import "./Topbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ConfirmModal from "../../SiteComponents/ConfirmModal";

function Topbar({ openGdprModal }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://user-service-api-fgbuhbe9dmgbb3gp.swedencentral-01.azurewebsites.net/api/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, []);

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
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitials = (username) => {
    return username ? username.slice(0, 2).toUpperCase() : "--";
  };

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
            aria-label="Settings"
            onClick={() => toggleMenu("settings")}
          >
            ⚙️
            {openMenu === "settings" && (
              <div className="dropdown-menu settings">
                <h4>Settings</h4>
                <button
                  className="settings-button gdpr-button"
                  onClick={() => {
                    openGdprModal();
                    setOpenMenu(null);
                  }}
                >
                  GDPR Settings
                </button>
              </div>
            )}
          </button>
        </div>

        <div className="dropdown-wrapper">
          <div className="user-profile" onClick={() => toggleMenu("profile")}>
            <div className="profile-avatar">
              {user?.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="profile"
                  className="avatar-image"
                />
              ) : (
                getInitials(user?.username)
              )}
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{user?.username ?? "Loading..."}</h2>
              <p className="profile-role">{user?.role ?? "User"}</p>
            </div>
          </div>

          {openMenu === "profile" && (
            <div className="dropdown-menu profile">
              <h4>Account</h4>
              <button
                onClick={() => {
                  navigate("/app/mypage");
                  setOpenMenu(null);
                }}
              >
                My Page
              </button>
              <button
                onClick={() => {
                  navigate("/app/myevents");
                  setOpenMenu(null);
                }}
              >
                My Events
              </button>
              <button
                onClick={() => {
                  setOpenMenu(null);
                  setShowLogoutConfirm(true);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
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
    </header>
  );
}

export default Topbar;
