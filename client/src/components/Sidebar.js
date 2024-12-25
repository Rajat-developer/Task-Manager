import React from "react";
import { Link } from "react-router-dom";
import './Sidebar.css';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to ="/createTask">Create Task</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
