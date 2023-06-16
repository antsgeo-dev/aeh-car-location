import App from "../App";

import { createBrowserRouter } from "react-router-dom";
import { LoginScreen } from "../pages/Login";
import { RegisterScreen } from "../pages/Register";
import { UserPanelScreen } from "../pages/UserPanel";
import { AdminPanelScreen } from "../pages/AdminPanel";
import { Welcome } from "../pages/Welcome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "welcome",
        element: <Welcome />,
      },
      {
        path: "login",
        element: <LoginScreen />,
      },
      {
        path: "register",
        element: <RegisterScreen />,
      },
      {
        path: "user-panel",
        element: <UserPanelScreen />,
      },
      {
        path: "admin-panel",
        element: <AdminPanelScreen />,
      },
    ],
  },
]);
