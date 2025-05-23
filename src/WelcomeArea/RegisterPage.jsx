// RegisterPage with retry confirmation email
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    else if (/\s/.test(formData.username))
      newErrors.username = "Username cannot contain spaces.";

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email address (e.g. user@example.com).";

    if (!formData.password.trim()) newErrors.password = "Password is required.";
    else if (
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/[^a-zA-Z0-9]/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters, include one uppercase letter and one special character (e.g. !@#$%).";
    }

    if (!acceptedTerms)
      newErrors.terms = "You must accept the terms and conditions.";

    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    setLoginError("");

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const response = await fetch(
        "https://authservice-api-e6aghrh5e2gpc4a0.westeurope-01.azurewebsites.net/api/Auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok) {
        setSubmitted(true);
      } else if (Array.isArray(data)) {
        const message = data.map((e) => e.description).join("\n");
        setLoginError(message);
      } else {
        setLoginError("Registration failed. Try again.");
      }
    } catch (err) {
      console.error("❌ Register error:", err);
      setLoginError("Server error. Please try again later.");
    }
    setLoading(false);
  };

  const handleResendConfirmation = async () => {
    setResending(true);
    setResendMessage("");

    try {
      const response = await fetch(
        `https://authservice-api-e6aghrh5e2gpc4a0.westeurope-01.azurewebsites.net/api/Auth/resend-confirmation?email=${encodeURIComponent(
          formData.email
        )}`,
        { method: "POST" }
      );

      if (response.ok) {
        setResendMessage("✅ Confirmation email resent.");
      } else {
        const errorText = await response.text();

        if (errorText.includes("already confirmed")) {
          setResendMessage(
            "⚠️ This email is already confirmed. You can log in now."
          );
        } else if (errorText.includes("not found")) {
          setResendMessage("⚠️ No account found with this email.");
        } else {
          setResendMessage(
            <>
              ❌ Something went wrong. Please{" "}
              <a href="/contact" style={{ textDecoration: "underline" }}>
                contact support
              </a>
              .
            </>
          );
        }
      }
    } catch {
      setResendMessage(
        <>
          ❌ Unable to reach server. Please{" "}
          <a href="/contact" style={{ textDecoration: "underline" }}>
            contact support
          </a>
          .
        </>
      );
    }

    setResending(false);
  };

  if (submitted) {
    return (
      <main className="login-page">
        <div className="center-content">
          <div className="confirmation-box">
            <h2 className="signup-title">Check your email</h2>
            <p className="login-text">
              A confirmation link has been sent to <b>{formData.email}</b>.
              <br />
              Please confirm your email before logging in.
            </p>
            <button onClick={() => navigate("/")} className="login-button">
              Back to Login
            </button>
            <p className="login-text" style={{ marginTop: "1rem" }}>
              Didn’t receive the message?{" "}
              <button
                type="button"
                onClick={handleResendConfirmation}
                disabled={resending}
                className="resend-button"
              >
                {resending ? "Resending..." : "Try again"}
              </button>
            </p>
            {resendMessage && <p className="input-error">{resendMessage}</p>}
          </div>
        </div>
      </main>
    );
  }

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </section>

      <section className="login-section">
        <div className="login-container">
          <div className="form-toggle-container">
            <div
              className="signup-form-wrapper"
              style={{ position: "relative" }}
            >
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
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                  {errors.username && (
                    <p className="input-error">{errors.username}</p>
                  )}
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
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {loginError && <p className="input-error">{loginError}</p>}
                  {errors.email && (
                    <p className="input-error">{errors.email}</p>
                  )}
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
                      }}
                    >
                      {showPassword ? "🔒" : "👁️"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="input-error">{errors.password}</p>
                  )}
                </div>

                {loading && (
                  <div className="form-loading-overlay">
                    <div className="spinner"></div>
                  </div>
                )}

                <div className="form-actions">
                  <div className="checkbox-wrapper">
                    <label className="remember-me">
                      <input
                        type="checkbox"
                        className="styled-checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                      />
                      <span>
                        I accept{" "}
                        <a href="/terms" className="terms-link">
                          Terms and Conditions
                        </a>
                      </span>
                    </label>
                    {errors.terms && (
                      <p className="input-error">{errors.terms}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="login-button"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Create Account"}
                </button>

                <p className="login-text">
                  Already have an account?{" "}
                  <Link to="/" className="toggle-to-login">
                    Login
                  </Link>
                </p>
              </form>

              <nav className="auth-footer-links">
                <a href="/privacy" className="auth-footer-link">
                  Privacy Policy
                </a>
                <a href="/terms" className="auth-footer-link">
                  Terms
                </a>
                <a href="/contact" className="auth-footer-link">
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
