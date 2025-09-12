import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./VendorDashboard.css";

/* ---------- Dashboard Home ---------- */
const DashboardHome = ({ savedPicks, bookings, openPickDetail }) => (
  <div className="page-panel" data-aos="fade-up">
    <h2>Overview</h2>
    <p>Quick snapshot of your activity, recent picks and quick actions.</p>

    <div className="overview-cards">
      <div className="card">
        <strong>34</strong>
        <span>Available Waiters</span>
      </div>

      <div className="card">
        <strong>{bookings.length}</strong>
        <span>Active Bookings</span>
      </div>

      <div
        className={`card clickable ${savedPicks.length === 0 ? "empty" : ""}`}
        onClick={() => savedPicks.length && openPickDetail(savedPicks[0])}
        title={savedPicks.length ? "Open latest saved pick" : "No saved picks yet"}
      >
        <strong>{savedPicks.length}</strong>
        <span>Saved Picks</span>
      </div>
    </div>

    <div style={{ marginTop: 18 }}>
      <h3>Recent Saved Picks</h3>
      {savedPicks.length === 0 ? (
        <p className="muted">No saved picks yet — browse waiters and click “Pick”.</p>
      ) : (
        <div className="saved-preview">
          {savedPicks.slice(0, 6).map((p) => (
            <button key={p.id} className="saved-item" onClick={() => openPickDetail(p)}>
              <div className="saved-avatar">{p.name.split(" ").map(n => n[0]).join("")}</div>
              <div className="saved-meta">
                <strong>{p.name}</strong>
                <div className="muted">{p.location} • {p.exp}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
);

/* ---------- Waiters List ---------- */
const WaitersList = ({ addPick }) => {
  const mock = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Waiter ${i + 1}`,
    location: ["Lagos", "Abuja", "Enugu", "Kano"][i % 4],
    exp: `${1 + (i % 5)} yrs`,
    skills: i % 2 === 0 ? "Service" : "Bar",
  }));

  const [selected, setSelected] = useState(null);

  return (
    <div className="page-panel waiters-panel">
      <h2>Waiters</h2>
      <div className="waiters-grid" data-aos="fade-up">
        <div className="waiters-list">
          {mock.map((w) => (
            <button
              key={w.id}
              className={`waiter-row ${selected?.id === w.id ? "active" : ""}`}
              onClick={() => setSelected(w)}
            >
              <div className="row-left">
                <div className="avatar">{w.name.split(" ").map(n => n[0]).join("")}</div>
                <div>
                  <strong>{w.name}</strong>
                  <div className="muted">{w.location} • {w.exp}</div>
                </div>
              </div>
              <div className="row-right">
                <span className="skill">{w.skills}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="waiter-detail">
          {selected ? (
            <>
              <h3>{selected.name}</h3>
              <p><strong>Location:</strong> {selected.location}</p>
              <p><strong>Experience:</strong> {selected.exp}</p>
              <p><strong>Skills:</strong> {selected.skills}</p>
              <div className="detail-actions">
                <button
                  className="btn primary"
                  onClick={() => addPick(selected)}
                >
                  Pick
                </button>
                <button className="btn ghost">Message</button>
              </div>
            </>
          ) : (
            <div className="empty">
              <p>Select a waiter from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------- Bookings ---------- */
const Bookings = ({ bookings, updateBookingStatus }) => (
  <div className="page-panel" data-aos="fade-up">
    <h2>Bookings</h2>
    <p>Manage your bookings here.</p>

    <table className="bookings-table">
      <thead>
        <tr><th>Ref</th><th>Date</th><th>Location</th><th>Status</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {bookings.map((b) => (
          <tr key={b.id}>
            <td>{b.ref}</td>
            <td>{b.date}</td>
            <td>{b.location}</td>
            <td>{b.status}</td>
            <td>
              <button
                className="btn ghost"
                onClick={() => updateBookingStatus(b.id, "Confirmed")}
              >
                Confirm
              </button>
              <button
                className="btn"
                onClick={() => updateBookingStatus(b.id, "Cancelled")}
              >
                Cancel
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ---------- Profile (editable + upload) ---------- */
const Profile = ({ profile, saveProfile }) => {
  const [form, setForm] = useState(profile);

  useEffect(() => setForm(profile), [profile]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((p) => ({ ...p, picture: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveProfile(form);
    alert("Profile saved");
  };

  return (
    <div className="page-panel" data-aos="fade-up">
      <h2>Profile</h2>
      <p>Vendor profile — contact details, company info and settings.</p>

      <form className="profile-grid" onSubmit={handleSave}>
        <div>
          <strong>Profile Picture</strong>
          <div>
            {form.picture ? (
              <img src={form.picture} alt="Profile" className="profile-pic" />
            ) : (
              <div className="profile-pic placeholder">No Image</div>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleFile} />
        </div>

        <div>
          <label>
            Vendor Name:
            <input name="name" value={form.name} onChange={handleChange} />
          </label>
          <label>
            Company/Brand:
            <input name="brand" value={form.brand} onChange={handleChange} />
          </label>
          <label>
            Phone:
            <input name="phone" value={form.phone} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input name="email" value={form.email} onChange={handleChange} />
          </label>

          <div style={{ marginTop: 12 }}>
            <button className="btn btn-dark" type="submit">Save Changes</button>
          </div>
        </div>
      </form>
    </div>
  );
};

/* ---------- Main VendorDashboard ---------- */
export default function VendorDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [savedPicks, setSavedPicks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedPicks") || "[]");
    } catch {
      return [];
    }
  });

  const [bookings, setBookings] = useState([
    { id: 1, ref: "#A001", date: "2025-09-01", location: "Lagos", status: "Confirmed" },
    { id: 2, ref: "#A002", date: "2025-09-05", location: "Abuja", status: "Pending" },
  ]);

  const [profile, setProfile] = useState(() => {
    try {
      const p = localStorage.getItem("vendorProfile");
      return p ? JSON.parse(p) : { name: "Acme Catering", brand: "Acme", email: "vendor@example.com", phone: "", picture: null };
    } catch {
      return { name: "Acme Catering", brand: "Acme", email: "vendor@example.com", phone: "", picture: null };
    }
  });

  const [modalPick, setModalPick] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  useEffect(() => {
    localStorage.setItem("savedPicks", JSON.stringify(savedPicks));
  }, [savedPicks]);

  useEffect(() => {
    localStorage.setItem("vendorProfile", JSON.stringify(profile));
  }, [profile]);

  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  const openTab = (tab) => {
    setActive(tab);
    if (window.innerWidth <= 768) setIsOpen(false);
  };

  /* ---------- picks handlers ---------- */
  const addPick = (waiter) => {
    if (!waiter) return;
    if (savedPicks.some((w) => w.id === waiter.id)) {
      alert("Already picked");
      return;
    }
    setSavedPicks((s) => [waiter, ...s]);
    setModalPick(waiter);
  };

  const removePick = (id) => {
    setSavedPicks((s) => s.filter((w) => w.id !== id));
    if (modalPick?.id === id) setModalPick(null);
  };

  const openPickDetail = (waiter) => {
    setModalPick(waiter);
  };

  /* ---------- bookings handlers ---------- */
  const updateBookingStatus = (id, status) => {
    setBookings((b) => b.map((x) => (x.id === id ? { ...x, status } : x)));
  };

  /* ---------- profile save ---------- */
  const saveProfile = (data) => setProfile(data);

  return (
    <div className="vendor-dashboard">
      {/* sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          <div className="logo">VendorPanel</div>
          <button className="close-sidebar" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <nav>
          <ul>
            <li className={active === "dashboard" ? "active" : ""}>
              <button onClick={() => openTab("dashboard")}>Dashboard</button>
            </li>
            <li className={active === "waiters" ? "active" : ""}>
              <button onClick={() => openTab("waiters")}>Waiters</button>
            </li>
            <li className={active === "bookings" ? "active" : ""}>
              <button onClick={() => openTab("bookings")}>Bookings</button>
            </li>
            <li className={active === "profile" ? "active" : ""}>
              <button onClick={() => openTab("profile")}>Profile</button>
            </li>
            <li>
              <button onClick={logout} className="logout-link">Log out</button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* mobile backdrop */}
      {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)}></div>}

      <div className="main">
        <header className="topbar">
          <div className="left">
            <button className="hamburger" onClick={() => setIsOpen((v) => !v)}>☰</button>
            <div className="title">
              <h1>Welcome, Vendor</h1>
              <div className="muted">Manage your waiters, bookings and profile</div>
            </div>
          </div>

          <div className="right">
            <button className="btn ghost" onClick={() => navigate("/vendor-register")}>Create listing</button>
            <button className="btn primary" onClick={logout}>Logout</button>
          </div>
        </header>

        <main className="content">
          {active === "dashboard" && (
            <DashboardHome
              savedPicks={savedPicks}
              bookings={bookings}
              openPickDetail={openPickDetail}
            />
          )}

          {active === "waiters" && <WaitersList addPick={addPick} />}

          {active === "bookings" && (
            <Bookings bookings={bookings} updateBookingStatus={updateBookingStatus} />
          )}

          {active === "profile" && <Profile profile={profile} saveProfile={saveProfile} />}
        </main>
      </div>

      {/* modal for saved pick detail */}
      {modalPick && (
        <div className="modal-backdrop" onClick={() => setModalPick(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{modalPick.name}</h3>
            <p><strong>Location:</strong> {modalPick.location}</p>
            <p><strong>Experience:</strong> {modalPick.exp}</p>
            <p><strong>Skills:</strong> {modalPick.skills}</p>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn primary" onClick={() => setModalPick(null)}>Close</button>
              <button className="btn" onClick={() => { removePick(modalPick.id); }}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
