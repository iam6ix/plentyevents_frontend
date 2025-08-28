import React, { useEffect } from "react";
import "./VendorDashboard.css";
import AOS from "aos";
import "aos/dist/aos.css";

const VendorDashboard = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  return (
    <div className="vendor-dashboard">
      <header className="vendor-header" data-aos="fade-down">
        <h1>Vendor Dashboard</h1>
        <p>Manage your scouting and bookings</p>
      </header>

      <main className="vendor-main">
        <section className="vendor-section" data-aos="fade-right">
          <h2>Scouted Workers</h2>
          <p>Here you will see workers you’ve scouted.</p>
        </section>

        <section className="vendor-section" data-aos="fade-left">
          <h2>Bookings</h2>
          <p>Track ongoing and past bookings here.</p>
        </section>
      </main>
    </div>
  );
};

export default VendorDashboard;
