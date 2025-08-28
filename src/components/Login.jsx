import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import "./Auth.css";
import iamImg from "../images/tunde.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "", // ✅ vendor or worker
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login (mocked without Firebase)
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password || !formData.role) {
      setError("Please fill in all fields and select a role.");
      return;
    }

    // ✅ Simple role-based redirect
    if (formData.role === "vendor") {
      navigate("/dashboard/vendor");
    } else if (formData.role === "worker") {
      navigate("/dashboard/worker");
    } else {
      setError("Invalid account type. Please select Vendor or Worker.");
    }
  };

  return (
    <div className="auth-page">
      {/* Left side with the login form */}
      <div className="auth-left" data-aos="fade-right">
        <div className="form-box">
          <h2>Login</h2>
          <p>Welcome back!</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Email"
              />
            </div>

            <div className="input-group role-select">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="vendor"
                  checked={formData.role === "vendor"}
                  onChange={handleChange}
                  required
                />
                Vendor
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="worker"
                  checked={formData.role === "worker"}
                  onChange={handleChange}
                />
                Worker
              </label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Password"
              />
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="auth-btn">
              SIGN IN
              <div className="btn-glow"></div>
            </button>
          </form>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <div className="separator">or</div>

          <div className="social-signup">
            <button className="google-btn">
              <FcGoogle className="icon" /> Sign in with Google
            </button>
            <button className="apple-btn">
              <FaApple className="icon" /> Sign in with Apple
            </button>
          </div>

          <p className="switch-link">
            Don’t have an account? <Link to="/create-account">Register</Link>
          </p>
        </div>
      </div>

      {/* Right side with image and overlay */}
      <div className="auth-right" data-aos="fade-left">
        <img src={iamImg} alt="Vendor connection" />
        <div className="overlay">
          <h1>Access Trusted Vendors</h1>
          <p>Connect to manage your vendor profile and grow your network.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
