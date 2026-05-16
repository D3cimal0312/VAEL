import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import {AddressProvider} from "@/context/AddressContext"
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import App from "./App.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AddressProvider>
        <MantineProvider>
          <App />
        </MantineProvider>
        </AddressProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
