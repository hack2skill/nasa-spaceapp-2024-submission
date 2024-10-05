import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'; // Correct import for createRoot
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Correct usage of createRoot
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
