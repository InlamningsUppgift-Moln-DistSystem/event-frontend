// Router.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./MainApp/App";
import WelcomeArea from "./WelcomeArea/WelcomeArea";
import LoginPage from "./WelcomeArea/LoginPage";
import RegisterPage from "./WelcomeArea/RegisterPage";

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

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
