import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Footer from "./components/Footer";
import VendorGrid from "./components/VendorGrid";
import Navbar from "./components/Navbar";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import "./App.css";
import Sectionone from "./components/Sectionone";
import About from "./components/About";
import Contact from "./components/Contact";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import HelpCenter from "./components/HelpCenter";
import HowItWorks from "./components/HowItWorks";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import VendorDashboard from "./components/VendorDashboard";
import WorkerDashboard from "./components/WorkerDashboard";
// Home Page Component
function HomePage() {
  const navigate = useNavigate();

  const handleHireClick = () => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/services");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <div className="hero-section">
        <VendorGrid />

        <div className="overlay-content">
          <h1>
            CONNECT WITH VENDORS
            <br />
            ALL AROUND YOU, <span>PLATFORM</span>
            <br />
            WHERE VENDORS LIVES!
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="buttons">
            <button className="btn btn-dark" onClick={handleHireClick}>
              Hire with Confidence →
            </button>
            <Link to="/create-account" className="btn btn-light">
              Join Our Vendor Network →
            </Link>
          </div>
        </div>
      </div>
      <Sectionone />
      <Footer />
    </>
  );
}

// Main App Component
function App() {
  const location = useLocation();

  useEffect(() => {
    const authRoutes = ["/login", "/create-account"];
    if (authRoutes.includes(location.pathname)) {
      document.body.style.overflowY = "auto"; // allow vertical scrolling
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/vendor-dashboard" element={<VendorDashboard />} />
      <Route path="/worker-dashboard" element={<WorkerDashboard />} />
    </Routes>
  );
}

export default App;
