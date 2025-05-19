import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
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
            <div className="login-form-wrapper">
              <h2 className="login-header">Login</h2>
              <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                  <label htmlFor="login-email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    name="Email"
                    className="form-input light-bg"
                    placeholder="Your email address"
                    autoComplete="email"
                  />
                </div>

                <div className="form-group mb-20">
                  <label htmlFor="login-password" className="form-label">
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="password"
                      id="login-password"
                      name="Password"
                      className="form-input light-bg"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      data-target="login-password"
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
                      👁️
                    </button>
                  </div>
                </div>

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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
