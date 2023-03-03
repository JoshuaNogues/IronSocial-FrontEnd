// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { AuthProvider } from "./context/auth.context";
import { LoadingProvider } from "./context/loading.context";

import { BrowserRouter } from "react-router-dom";
import { ThemeProviderWrapper } from "./context/theme.context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProviderWrapper>
        <LoadingProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LoadingProvider>
      </ThemeProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

reportWebVitals();
