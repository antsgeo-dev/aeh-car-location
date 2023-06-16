import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, useLocation, useNavigate } from "react-router";
import "./App.css";
import { Header } from "./components";

function App({ children = null }) {
  const { isAuthenticated, user } = useAuth0();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated && pathname !== "/welcome") {
    navigate("/welcome");
  } else if (
    isAuthenticated &&
    user?.role === "admin" &&
    pathname !== "/admin-panel"
  ) {
    navigate("/admin-panel");
  } else if (
    isAuthenticated &&
    user?.role !== "admin" &&
    pathname !== "/user-panel"
  ) {
    navigate("/user-panel");
  }

  return (
    <div className="App" id="root-app">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
