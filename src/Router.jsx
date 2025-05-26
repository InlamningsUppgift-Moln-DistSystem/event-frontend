import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import App from "./MainApp/App";
import WelcomeArea from "./WelcomeArea/WelcomeArea";
import LoginPage from "./WelcomeArea/LoginPage";
import RegisterPage from "./WelcomeArea/RegisterPage";
import PrivacyPage from "./MainApp/Pages/1.SidePages/PrivacyPage";
import TermsPage from "./MainApp/Pages/1.SidePages/TermsAndConditionPage";
import ContactPage from "./MainApp/Pages/1.SidePages/ContactPage";
import EmailConfirmed from "./WelcomeArea/EmailConfirmed";
import ConfirmNewEmail from "./MyPages/MyPageComponents/ConfirmNewEmail";
// 🆕 NY IMPORT

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token || token.split(".").length !== 3) return false;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Offentliga sidor */}
        {!isAuthenticated() && (
          <Route element={<WelcomeArea />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/confirm" element={<EmailConfirmed />} />
          </Route>
        )}
        {isAuthenticated() && (
          <Route path="/" element={<Navigate to="/app/events" replace />} />
        )}

        {/* Skyddade sidor */}
        <Route
          path="/app/*"
          element={isAuthenticated() ? <App /> : <Navigate to="/" replace />}
        />

        {/* ✅ Alltid tillgänglig */}
        <Route path="/confirm-new-email" element={<ConfirmNewEmail />} />

        {/* Statiska sidor */}
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
