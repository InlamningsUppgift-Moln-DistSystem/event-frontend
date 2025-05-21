import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "mock-token");
    navigate("/app");
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
          Register to <span className="highlight">Ventixe</span>
        </h1>
        <p className="welcome-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          ullamcorper nisl erat, vel convallis elit fermentum pellentesque.
        </p>
      </section>

      <section className="login-section">
        <div className="login-container">
          <div className="form-toggle-container">
            <div className="signup-form-wrapper">
              <h2 className="signup-title">Create Account</h2>
              <form onSubmit={handleRegister} className="signup-form">
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-input"
                    placeholder="Your Username"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    className="form-input"
                    placeholder="Your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-password" className="form-label">
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="signup-password"
                      className="form-input"
                      placeholder="Enter your password"
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
                      }}
                    >
                      {showPassword ? "🔒" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="form-actions">
                  <label className="remember-me">
                    <input type="checkbox" className="styled-checkbox" />
                    <span>
                      I accept{" "}
                      <a href="#" className="terms-link">
                        Terms and Conditions
                      </a>
                    </span>
                  </label>
                </div>

                <button type="submit" className="login-button">
                  Create Account
                </button>

                <p className="login-text">
                  Already have an account?{" "}
                  <Link to="/" className="toggle-to-login">
                    Login
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

export default RegisterPage;
