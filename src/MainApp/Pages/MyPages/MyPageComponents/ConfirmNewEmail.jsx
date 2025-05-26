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
    <main className="center-content">
      <h2>Email Confirmation</h2>
      {status === "loading" && <p>🔄 Verifying...</p>}
      {status === "success" && <p>✅ Your email has been confirmed!</p>}
      {status === "invalid" && <p>❌ Invalid link.</p>}
      {status.startsWith("fail") && <p>❌ {status.replace("fail: ", "")}</p>}
      {status === "error" && <p>❌ Server error. Please try again later.</p>}
    </main>
  );
}

export default ConfirmNewEmail;
