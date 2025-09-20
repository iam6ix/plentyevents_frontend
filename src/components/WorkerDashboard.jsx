// src/components/WorkerDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./WorkerDashboard.css";

const WorkerDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [picks, setPicks] = useState([
    { id: 1, vendorName: "Elite Catering", job: "Wedding Event", date: "Sept 20, 2025" },
    { id: 2, vendorName: "Glow Decorators", job: "Birthday Setup", date: "Sept 23, 2025" },
  ]);
  const [bookings, setBookings] = useState([
    { id: 101, vendor: "Golden Cocktails", details: "Bar service for corporate event", status: "pending" },
  ]);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    availability: "Available",
    profilePic: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  // init AOS
  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true });
  }, []);

  // create/revoke preview URL for uploaded image safely
  useEffect(() => {
    if (profile.profilePic instanceof File) {
      const url = URL.createObjectURL(profile.profilePic);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof profile.profilePic === "string") {
      setPreviewUrl(profile.profilePic);
    } else {
      setPreviewUrl(null);
    }
  }, [profile.profilePic]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setProfile((p) => ({ ...p, profilePic: files?.[0] || null }));
    } else {
      setProfile((p) => ({ ...p, [name]: value }));
    }
  };

  const handleBookingResponse = (id, action) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: action === "accept" ? "accepted" : "declined" } : b))
    );
  };

  return (
    <div className="worker-dashboard">
      {/* Sidebar */}
      <aside className="sidebar" data-aos="fade-right">
        <h2>Worker Panel</h2>
        <ul>
          <li
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
            data-aos="fade-right"
            data-aos-delay="30"
          >
            Dashboard
          </li>
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
            data-aos="fade-right"
            data-aos-delay="60"
          >
            Profile
          </li>
          <li
            className={activeTab === "bookings" ? "active" : ""}
            onClick={() => setActiveTab("bookings")}
            data-aos="fade-right"
            data-aos-delay="90"
          >
            Bookings
          </li>
          <li onClick={handleLogout} data-aos="fade-right" data-aos-delay="120">
            Logout
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <section data-aos="fade-up">
            <h2>Vendors Who Picked You</h2>
            <p className="muted">See recent vendors that expressed interest.</p>

            {picks.length === 0 ? (
              <p data-aos="fade-up" data-aos-delay="50">No vendors have picked you yet.</p>
            ) : (
              <ul className="card-list">
                {picks.map((pick, idx) => (
                  <li
                    key={pick.id}
                    className="card"
                    data-aos="zoom-in"
                    data-aos-delay={idx * 80}
                  >
                    <h3>{pick.vendorName}</h3>
                    <p>{pick.job}</p>
                    <small>{pick.date}</small>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <section data-aos="fade-up">
            <h2>Your Profile</h2>
            <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group" data-aos="fade-up" data-aos-delay="40">
                <label>Name</label>
                <input type="text" name="name" value={profile.name} onChange={handleProfileChange} />
              </div>

              <div className="form-group" data-aos="fade-up" data-aos-delay="60">
                <label>Email</label>
                <input type="email" name="email" value={profile.email} onChange={handleProfileChange} />
              </div>

              <div className="form-group" data-aos="fade-up" data-aos-delay="80">
                <label>Availability</label>
                <select name="availability" value={profile.availability} onChange={handleProfileChange}>
                  <option>Available</option>
                  <option>Busy</option>
                  <option>On Leave</option>
                </select>
              </div>

              <div className="form-group" data-aos="fade-up" data-aos-delay="100">
                <label>Profile Picture</label>
                <input type="file" name="profilePic" accept="image/*" onChange={handleProfileChange} />
                {previewUrl && (
                  <img src={previewUrl} alt="Preview" className="profile-preview" data-aos="fade-in" />
                )}
              </div>
            </form>
          </section>
        )}

        {/* Bookings */}
        {activeTab === "bookings" && (
          <section data-aos="fade-up">
            <h2>Bookings</h2>
            <p className="muted">Accept or decline requests from vendors below.</p>

            {bookings.length === 0 ? (
              <p data-aos="fade-up" data-aos-delay="40">No bookings yet.</p>
            ) : (
              <ul className="card-list">
                {bookings.map((booking, idx) => (
                  <li key={booking.id} className="card" data-aos="fade-up" data-aos-delay={idx * 70}>
                    <h3>{booking.vendor}</h3>
                    <p>{booking.details}</p>
                    <small>Status: <strong style={{ textTransform: "capitalize" }}>{booking.status}</strong></small>

                    {booking.status === "pending" && (
                      <div className="actions" style={{ marginTop: 12 }}>
                        <button
                          className="btn primary"
                          onClick={() => handleBookingResponse(booking.id, "accept")}
                          data-aos="zoom-in"
                        >
                          Accept
                        </button>
                        <button
                          className="btn"
                          onClick={() => handleBookingResponse(booking.id, "decline")}
                          data-aos="zoom-in"
                          style={{ marginLeft: 8 }}
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default WorkerDashboard;
