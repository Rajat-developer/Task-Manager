import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import UserList from "./UserList";
import './Dashboard.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  
  // Fetch users data
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/auth/users") 
      .then((response) => {
        setUsers(response.data || [])     
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <TopHeader />
        <UserList users={users} />
      </div>
    </div>
  );
};

export default Dashboard;
