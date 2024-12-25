import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", formData);
      
      if (response.data.success) {
        // Save token and user info to localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setMessage("Login successful!");
        
        // Redirect to the dashboard after successful login
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to the dashboard
        }, 1000); // Show success message briefly before redirecting
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.message || "Something went wrong."));
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
       <div className="over-button">
       <button type="submit" className="login-button">
          Log In
        </button>
       </div>
        {message && <p className="message">{message}</p>}
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
