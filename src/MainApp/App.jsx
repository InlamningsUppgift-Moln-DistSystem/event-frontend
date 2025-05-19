// App.jsx
import "./App.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

function App() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <Topbar />
        {/* Här kan du lägga annan innehåll */}
        {/* Här skulle du kunna lägga routes eller dashboard-sektioner */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
