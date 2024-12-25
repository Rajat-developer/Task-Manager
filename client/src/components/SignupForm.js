import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignupForm.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        formData
      );
      if (response?.data?.success) {
        setMessage("Account created successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(response?.data?.message || "Failed to create account.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      setMessage("Error: " + errorMessage);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign up</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
       <button type="submit" className="create-account">
          Create Account
        </button>
       </div>

        {message && <p className="message">{message}</p>}
        <p className="login-link">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
      </form>

     
    </div>
  );
};

export default SignupForm;
