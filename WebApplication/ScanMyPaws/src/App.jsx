import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import HomePage from "./pages/HomePage";
import PetsPage from "./pages/PetsPage";
import NotificationsPage from "./pages/NotificationsPage";
import PlannerPage from "./pages/PlannerPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import TopNavbar from "./components/StaticComponents/TopNabBar";
import BottomNavbar from "./components/StaticComponents/BottomNavBar";
import PetDetailsPage from "./pages/PetDetailsPage";
import Wizard from "./components/StaticComponents/Wizard";
import { isLoggedIn } from "./components/Authentication/api";

const PrivateRoute = ({ element }) => {
  return isLoggedIn() ? element : <Navigate to="/signin" />;
};

const App = () => {
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    // Check if the wizard has already been completed
    const hasCompletedWizard = localStorage.getItem("hasCompletedWizard");
    if (!hasCompletedWizard) {
      setShowWizard(true);
    }
  }, []);

  const handleWizardComplete = () => {
    localStorage.setItem("hasCompletedWizard", "true");
    setShowWizard(false);
  };

  const hideNavPages = ["/signin", "/signup"];
  const shouldHideNav = hideNavPages.includes(window.location.pathname.toLowerCase());

  if (showWizard) {
    return <Wizard onComplete={handleWizardComplete} />;
  }

  return (
    <ThemeProvider>
      <Router>
        {!shouldHideNav && <TopNavbar />}
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
          <Route path="/pets/:petId" element={<PetDetailsPage />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
        {!shouldHideNav && <BottomNavbar />}
      </Router>
    </ThemeProvider>
  );
};

export default App;
