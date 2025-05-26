import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_BASE =
  "https://user-service-api-fgbuhbe9dmgbb3gp.swedencentral-01.azurewebsites.net";

function ConfirmNewEmail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!email) {
      setStatus("invalid");
      return;
    }

    const confirmEmail = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/user/confirm-email?email=${encodeURIComponent(
            email
          )}`,
          {
            method: "POST",
          }
        );

        if (res.ok) {
          setStatus("success");
        } else {
          const text = await res.text();
          setStatus(`fail: ${text}`);
        }
      } catch (err) {
        setStatus("error", err);
      }
    };

    confirmEmail();
  }, [email]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f7fb",
        fontFamily: "Segoe UI, sans-serif",
        color: "#000", // svart text
        textAlign: "center",
      }}
    >
      <div
        style={{
          padding: "32px",
          borderRadius: "12px",
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "420px",
        }}
      >
        <h2
          style={{ marginBottom: "16px", fontSize: "24px", fontWeight: "600" }}
        >
          Email Confirmation
        </h2>

        {status === "loading" && <p>🔄 Verifying...</p>}
        {status === "success" && <p>✅ Your email has been confirmed!</p>}
        {status === "invalid" && <p>❌ Invalid link.</p>}
        {status.startsWith("fail") && <p>❌ {status.replace("fail: ", "")}</p>}
        {status === "error" && <p>❌ Server error. Please try again later.</p>}
      </div>
    </main>
  );
}

export default ConfirmNewEmail;
