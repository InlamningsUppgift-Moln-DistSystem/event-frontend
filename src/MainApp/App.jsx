import { useState } from "react";
import "./App.css";
import Sidebar from "./MainAppComponents/Sidebar";
import Topbar from "./MainAppComponents/Topbar";
import Footer from "./MainAppComponents/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import EventsPage from "./Pages/EventsPage/EventsPage";
import AttendingPage from "./Pages/AttendingPage/AttendingPage";
import MyPage from "./Pages/MyPages/MyPage";
import MyEvents from "./Pages/MyPages/MyEvents";
import GDPRModal from "../SiteComponents/GDPRModal";
import GdprScriptLoader from "../SiteComponents/GdprScriptLoader";
import MarketingBanner from "../SiteComponents/MarketingBanner";

function App() {
  const [showGdprModal, setShowGdprModal] = useState(false);

  return (
    <div className="dashboard-layout">
      <GdprScriptLoader />

      {showGdprModal && <GDPRModal onClose={() => setShowGdprModal(false)} />}

      <Sidebar openGdprModal={() => setShowGdprModal(true)} />
      <main className="main-content">
        <Topbar openGdprModal={() => setShowGdprModal(true)} />
        <Routes>
          <Route index element={<Navigate to="events" replace />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="attending" element={<AttendingPage />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="myevents" element={<MyEvents />} />
        </Routes>
        <MarketingBanner />
        <Footer />
      </main>
    </div>
  );
}

export default App;
