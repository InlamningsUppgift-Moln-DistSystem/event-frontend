import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function EmailConfirmed() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
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
      <div
        className="login-container"
        style={{ textAlign: "center", marginTop: "80px" }}
      >
        {status === "loading" && <p>🔄 Verifying your email...</p>}
        {status === "confirmed" && (
          <>
            <h2>✅ Email confirmed!</h2>
            <p>You can now log in to your account.</p>
          </>
        )}
        {status === "error" && (
          <>
            <h2>❌ Error</h2>
            <p>Something went wrong while confirming your email.</p>
          </>
        )}
        {status === "invalid" && (
          <>
            <h2>⚠️ Invalid request</h2>
            <p>Email is missing or invalid in the URL.</p>
          </>
        )}
      </div>
    </main>
  );
}

export default EmailConfirmed;
