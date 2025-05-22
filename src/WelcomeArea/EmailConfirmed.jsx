import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./EmailConfirmed.css";

function EmailConfirmed() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();
  const email = searchParams.get("email");

  useEffect(() => {
    const confirm = async () => {
      try {
        const res = await fetch(
          `https://authservice-api-e6aghrh5e2gpc4a0.westeurope-01.azurewebsites.net/api/auth/confirm?email=${encodeURIComponent(
            email
          )}`
        );
        if (res.ok) {
          setStatus("confirmed");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    if (email) confirm();
    else setStatus("invalid");
  }, [email]);

  return (
    <main className="login-page">
      <div className="login-container center-content">
        <div className="confirmation-box">
          {status === "loading" && <p>🔄 Verifying your email...</p>}
          {status === "confirmed" && (
            <>
              <img
                src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                alt="Checkmark"
                style={{ width: "48px", height: "48px", marginBottom: "16px" }}
              />

              <h2>✅ Email confirmed!</h2>
              <p>
                Your email <b>{email}</b> is now verified. You may now log in.
              </p>
              <button className="login-button" onClick={() => navigate("/")}>
                Back to Login
              </button>
            </>
          )}
          {status === "error" && (
            <>
              <h2>❌ Error</h2>
              <p>Something went wrong while confirming your email.</p>
              <button className="login-button" onClick={() => navigate("/")}>
                Try again
              </button>
            </>
          )}
          {status === "invalid" && (
            <>
              <h2>⚠️ Invalid link</h2>
              <p>Email address is missing or malformed in the URL.</p>
              <button className="login-button" onClick={() => navigate("/")}>
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default EmailConfirmed;
