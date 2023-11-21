import React from "react";
import ReactDOM from "react-dom/client";
import { CurrentUserProvider } from "./contexts/UserContexts";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </React.StrictMode>
);
