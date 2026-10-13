import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <FavouritesProvider>
          <App />
        </FavouritesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
