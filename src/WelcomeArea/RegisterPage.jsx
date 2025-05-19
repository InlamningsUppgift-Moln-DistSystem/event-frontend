import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { useEffect } from "react";

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "mock-token");
    navigate("/app");
  };

  useEffect(() => {
    document.querySelectorAll(".toggle-password").forEach((button) => {
      button.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");
        const input = document.getElementById(targetId);
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        this.textContent = isHidden ? "🔒" : "👁️";
      });
    });
  }, []);

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
          Welcome to <span className="highlight">Alpha</span>
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
                      type="password"
                      id="signup-password"
                      className="form-input"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      data-target="signup-password"
                      style={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                      }}
                    >
                      👁️
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirm-password" className="form-label">
                    Confirm Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="password"
                      id="confirm-password"
                      className="form-input"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      data-target="confirm-password"
                      style={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                      }}
                    >
                      👁️
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone-number" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone-number"
                    className="form-input"
                    placeholder="Your phone number"
                  />
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
                  <a href="/" className="toggle-to-login">
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;
