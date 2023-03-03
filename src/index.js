// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { AuthProvider } from "./context/auth.context";

import { BrowserRouter } from "react-router-dom";
import { ThemeProviderWrapper } from "./context/theme.context"; 
 
const root = ReactDOM.createRoot(document.getElementById("root"));
 
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <AuthProvider>
      <ThemeProviderWrapper>        
        <App />
      </ThemeProviderWrapper>
     </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
 
reportWebVitals();