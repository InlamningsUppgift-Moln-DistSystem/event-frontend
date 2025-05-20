// Router.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./MainApp/App";
import WelcomeArea from "./WelcomeArea/WelcomeArea";
import LoginPage from "./WelcomeArea/LoginPage";
import RegisterPage from "./WelcomeArea/RegisterPage";
import PrivacyPage from "./MainApp/Pages/1.SidePages/PrivacyPage";
import TermsPage from "./MainApp/Pages/1.SidePages/TermsAndConditionPage";
import ContactPage from "./MainApp/Pages/1.SidePages/ContactPage";

// Tillfällig auth override för utveckling
const isAuthenticated = () => true; // ← Byt till localStorage-lösning när backend kopplas

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Offentliga sidor */}
        <Route element={<WelcomeArea />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Skyddade sidor */}
        <Route
          path="/app/*"
          element={isAuthenticated() ? <App /> : <Navigate to="/" replace />}
        />

        {/* Statiska sidor - utan layout */}
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
