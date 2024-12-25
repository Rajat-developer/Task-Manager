import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './TopHeader.css';

const TopHeader = () => {
  const [username, setUsername] = useState("Admin");
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      setUsername(storedUser.name); // Update username dynamically
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="top-header">
      <h1>Welcome to the Dashboard</h1>
      <div className="user-info">
        <p style={{marginRight: "10px"}}>Hello, {username}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default TopHeader;
