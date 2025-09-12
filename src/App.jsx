import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

//Homepages
import Navbar from "./components/Navbar";
import "./App.css";
import Sectionone from "./components/Sectionone";
import Footer from "./components/Footer";
import VendorGrid from "./components/VendorGrid";
import About from "./components/About";
import Contact from "./components/Contact";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import HelpCenter from "./components/HelpCenter";
import HowItWorks from "./components/HowItWorks";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";


//Registration Pages
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";

//Dashboard(Vendor)
import VendorDashboard from "./components/VendorDashboard";
// import DashboardHome from "./components/dashboard/DashboardHome";
// import Waiters from "./components/dashboard/Waiters";
// import Listings from "./components/dashboard/Listings";
// import Profile from "./components/dashboard/Profile";
// import CreateListing from "./components/dashboard/CreateListing";
// import Bookings from "./components/dashboard/Bookings";

//Others
import RegisterChoice from "./components/RegisterChoice";
import WorkerDashboard from "./components/WorkerDashboard";
import VendorRegister from "./components/VendorRegister";

// Protect dashboards
const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== role) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Home Page Component
function HomePage() {
  return (
    <>
      <Navbar />
      <div className="hero-section">
        <VendorGrid />
        <div className="overlay-content">
          <h1>
            CONNECT WITH WAITERS
            <br />
            ALL AROUND YOU, <span>PLATFORM</span>
            <br />
            WHERE WAITERS LIVES!
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="buttons">
            <Link to="/vendor-register" className="btn btn-dark">
              Join as a Vendor →
            </Link>
            <Link to="/create-account" className="btn btn-light">
              Join as a Waiter →
            </Link>
          </div>
        </div>
      </div>
      <Sectionone />
      <Footer />
    </>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflowY = "auto";
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/vendor-register" element={<VendorRegister />} />
      {/* <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/listings" element={<Listings />} />
        <Route path="/dashboard/create-listing" element={<CreateListing />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/bookings" element={<Bookings />} />
        <Route path="/dashboard/waiters" element={<Waiters />} /> */}
      <Route path="/register" element={<RegisterChoice />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

      {/* ✅ Protected dashboards */}
      <Route
        path="/vendor-dashboard"
        element={
          <ProtectedRoute role="vendor">
            <VendorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/worker-dashboard"
        element={
          <ProtectedRoute role="worker">
            <WorkerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
