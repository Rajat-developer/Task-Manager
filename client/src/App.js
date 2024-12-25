import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignupForm from "./components/SignupForm";
import Dashboard from "./components/Dashboard";
import UserProfile from "./components/UserProfile";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]); // Centralized state for tasks

  // Handle task creation
  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Update existing task
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard tasks={tasks} />
          }
        />
        <Route
          path="/createTask"
          element={
            <TaskForm
              onTaskCreated={handleTaskCreated}
            />
          }
        />
        <Route
          path="/taskList"
          element={
            <TaskList
              tasks={tasks}
              setTasks={setTasks}
              onTaskUpdated={handleTaskUpdated}
            />
          }
        />
        <Route path="/userProfile/:id" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
