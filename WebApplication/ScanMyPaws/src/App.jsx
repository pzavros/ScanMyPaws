import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import TopNavbar from "./components/StaticComponents/TopNabBar";
import Wizard from "./components/StaticComponents/Wizard";
import { isLoggedIn } from "./components/Authentication/api";

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

  // Define pages where the navbar should not be visible
  const hideNavPages = ["/signin", "/signup"];
  const isPublicPetCard = location.pathname.startsWith("/public-petcard/");
  const shouldHideNav = hideNavPages.includes(location.pathname.toLowerCase()) || isPublicPetCard;

  return (
    <>
      {!shouldHideNav && <TopNavbar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
          <Route path="/pets/:petId" element={<PetDetailsPage />} />
          <Route path="/createpetcard/:petId" element={<CreatePetCardPage />} />
          <Route path="/petcard/:petId" element={<PetCardPage />} />
          <Route path="/public-petcard/:uniqueUrl" element={<PublicPetCardPage />} />
          <Route path="/medical-records/:petID" element={<MedicalRecordsPage />} />
          <Route path="/select-pet" element={<SelectPetPage />} />
          <Route path="/instructions" element={<InstructionsPage />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
