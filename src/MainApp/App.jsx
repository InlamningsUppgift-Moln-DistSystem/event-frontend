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
import MyPage from "./Pages/MyPages/MyPage";
import MyEvents from "./Pages/MyPages/MyEvents";

function App() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <Topbar />
        <Routes>
          <Route index element={<Navigate to="events" replace />} />

          {/* <Route path="timeline" element={<TimelinePage />} />        Tillfälligt borttagen*/}
          <Route path="events" element={<EventsPage />} />
          <Route path="attending" element={<AttendingPage />} />
          {/* <Route path="following" element={<FollowingPage />} />      Tillfälligt borttagen*/}

          {/* Routes for My Pages */}
          <Route path="mypage" element={<MyPage />} />
          <Route path="myevents" element={<MyEvents />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
