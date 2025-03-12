import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import TopNavbar from "./components/StaticComponents/TopNabBar";
import Wizard from "./components/StaticComponents/Wizard";

// Simple JWT decoder: returns the payload or null if invalid.
const decodeJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error decoding token:", e);
    return null;
  }
};

const isLoggedIn = () => {
  let token = localStorage.getItem("token");
  if (!token) return false;

  // Remove "Bearer " prefix if present.
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  const decoded = decodeJwt(token);
  if (!decoded) {
    localStorage.removeItem("token");
    return false;
  }

  // Check if token has an exp claim and if it's expired.
  if (decoded.exp && decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    return false;
  }

  return true;
};

// Lazy load pages
const HomePage = React.lazy(() => import("./pages/HomePage"));
const PetsPage = React.lazy(() => import("./pages/PetsPage"));
const NotificationsPage = React.lazy(() => import("./pages/NotificationsPage"));
const PlannerPage = React.lazy(() => import("./pages/PlannerPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const PetDetailsPage = React.lazy(() => import("./pages/PetDetailsPage"));
const CreatePetCardPage = React.lazy(() => import("./pages/CreatePetCardPage"));
const PetCardPage = React.lazy(() => import("./pages/PetCardPage"));
const PublicPetCardPage = React.lazy(() => import("./pages/PublicPetCardPage"));
const MedicalRecordsPage = React.lazy(() => import("./pages/MedicalRecordsPage"));
const SelectPetPage = React.lazy(() => import("./pages/SelectPetPage"));
const InstructionsPage = React.lazy(() => import("./pages/InstructionsPage"));
const SchedulesPage = React.lazy(() => import("./pages/SchedulesPage"));
const PublicChatPage = React.lazy(() => import("./pages/PublicChatPage"));
const ChatPage = React.lazy(() => import("./pages/ChatPage"));

// PrivateRoute component: if not logged in, redirect to /signin.
const PrivateRoute = ({ element }) => {
  return isLoggedIn() ? element : <Navigate to="/signin" />;
};

const App = () => {
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    const hasCompletedWizard = localStorage.getItem("hasCompletedWizard");
    if (!hasCompletedWizard) {
      setShowWizard(true);
    }
  }, []);

  const handleWizardComplete = () => {
    localStorage.setItem("hasCompletedWizard", "true");
    setShowWizard(false);
  };

  if (showWizard) {
    return <Wizard onComplete={handleWizardComplete} />;
  }

  return (
    <ThemeProvider>
      <Router>
        <RouterContent />
      </Router>
    </ThemeProvider>
  );
};

const RouterContent = () => {
  const location = useLocation();

  // Hide TopNavbar on auth pages and on public pet card pages.
  const hideNavPages = ["/signin", "/signup"];
  const isPublicPetCard = location.pathname.startsWith("/public-petcard/");
  const shouldHideNav = hideNavPages.includes(location.pathname.toLowerCase()) || isPublicPetCard;

  return (
    <>
      {!shouldHideNav && <TopNavbar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/pets" element={<PrivateRoute element={<PetsPage />} />} />
          <Route path="/notifications" element={<PrivateRoute element={<NotificationsPage />} />} />
          <Route path="/planner" element={<PrivateRoute element={<PlannerPage />} />} />
          <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
          <Route path="/pets/:petId" element={<PrivateRoute element={<PetDetailsPage />} />} />
          <Route path="/createpetcard/:petId" element={<PrivateRoute element={<CreatePetCardPage />} />} />
          <Route path="/petcard/:petId" element={<PrivateRoute element={<PetCardPage />} />} />
          <Route path="/medical-records/:petID" element={<PrivateRoute element={<MedicalRecordsPage />} />} />
          <Route path="/select-pet" element={<PrivateRoute element={<SelectPetPage />} />} />
          <Route path="/instructions" element={<PrivateRoute element={<InstructionsPage />} />} />
          <Route path="/schedules" element={<PrivateRoute element={<SchedulesPage />} />} />
          <Route path="/chat/:sessionId" element={<ChatPage />} />

          {/* Public Routes */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/public-petcard/:uniqueUrl" element={<PublicPetCardPage />} />
          <Route path="/chat/:sessionId" element={<PublicChatPage />} />

          {/* Fallback */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
