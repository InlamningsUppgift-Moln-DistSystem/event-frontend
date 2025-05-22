import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    setLoginError("");

    if (Object.keys(newErrors).length > 0) return;

    try {
      // Rensa tidigare session
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("initials");

      const response = await fetch(
        "https://authservice-api-e6aghrh5e2gpc4a0.westeurope-01.azurewebsites.net/api/Auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok && data.emailConfirmed) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("initials", data.initials ?? "??");
        navigate("/app");
      } else if (response.ok && !data.emailConfirmed) {
        setLoginError("Please confirm your email before logging in.");
      } else {
        setLoginError("Invalid username or password.");
      }
    } catch {
      setLoginError("Server error. Please try again later.");
    }
  };

  return (
    <main className="login-page">
      <div className="background-container">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce3234e7c1b44e43f8b055fd3bc42ab0c0e31e4c"
          alt="Background"
          className="background-image"
        />
        <div className="blur-overlay"></div>
      </div>

      <section className="welcome-section">
        <h1 className="welcome-title">
          Welcome to <span className="highlight">Ventixe</span>
        </h1>
        <p className="welcome-description">
          Log in with your username and password to continue.
        </p>
      </section>

      <section className="login-section">
        <div className="login-container">
          <div className="form-toggle-container">
            <div className="login-form-wrapper">
              <h2 className="login-header">Login</h2>
              <form onSubmit={handleLogin} className="login-form">
                {/* Username */}
                <div className="form-group">
                  <label htmlFor="login-username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="login-username"
                    className="form-input light-bg"
                    placeholder="Your username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                  {errors.username && (
                    <p className="input-error">{errors.username}</p>
                  )}
                </div>

                {/* Password */}
                <div className="form-group mb-20">
                  <label htmlFor="login-password" className="form-label">
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="login-password"
                      className="form-input light-bg"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        zIndex: 10,
                      }}
                    >
                      {showPassword ? "🔒" : "👁️"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="input-error">{errors.password}</p>
                  )}
                </div>

                {/* Login error */}
                {loginError && (
                  <p className="input-error" style={{ marginBottom: "10px" }}>
                    {loginError}
                  </p>
                )}

                <button type="submit" className="login-button">
                  Log In
                </button>

                <p className="signup-prompt">
                  Don’t have an account?{" "}
                  <Link to="/register" className="toggle-to-signup">
                    Sign up
                  </Link>
                </p>
              </form>

              <nav className="auth-footer-links">
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="auth-footer-link"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="auth-footer-link"
                >
                  Terms
                </a>
                <a
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="auth-footer-link"
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
