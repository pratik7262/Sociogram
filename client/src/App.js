import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./scenes/Home";
import LoginPage from "./scenes/LoginPage";
import ProfilePage from "./scenes/ProfilePage";
import { themeSettings } from "./theme";

function App() {
  const isLogedIn = Boolean(useSelector((state) => state.token));
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const token = useSelector((state) => state.token);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          {token ? (
            <>
              <Routes>
                <Route
                  path="/"
                  element={isLogedIn ? <Home /> : <Navigate to="/" />}
                />
                <Route
                  path="/profile/userId"
                  element={isLogedIn ? <ProfilePage /> : <Navigate to="/" />}
                />
              </Routes>
            </>
          ) : (
            <>
              <Routes>
                <Route path="/" element={<LoginPage />} />
              </Routes>
            </>
          )}
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
