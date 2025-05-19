import { Outlet } from "react-router-dom";

function WelcomeArea() {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
}

export default WelcomeArea;
