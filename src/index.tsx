import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Router, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { router } from "./routing";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN as string}
      clientId={process.env.REACT_APP_CLIENT_ID as string}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
