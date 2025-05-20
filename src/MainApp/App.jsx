// App.jsx
import "./App.css";
import Sidebar from "./MainAppComponents/Sidebar";
import Topbar from "./MainAppComponents/Topbar";
import Footer from "./MainAppComponents/Footer";
import TimelinePage from "./Pages/TimelinePage/TimelinePage";
import EventsPage from "./Pages/EventsPage/EventsPage";
import AttendingPage from "./Pages/AttendingPage/AttendingPage";
import FollowingPage from "./Pages/FollowingPage/FollowingPage";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <Topbar />
        <Routes>
          <Route index element={<Navigate to="timeline" replace />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="attending" element={<AttendingPage />} />
          <Route path="following" element={<FollowingPage />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
