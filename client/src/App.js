import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css"; // Import the CSS file

const App = () => {
  const [currentTask, setCurrentTask] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSave = () => {
    setRefresh(!refresh);
    setCurrentTask(null);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
  };

  return (
    <div>
      <h1 className="center-text">Task Management</h1>
      <TaskForm task={currentTask} onSave={handleSave} />
      <TaskList key={refresh} onEdit={handleEdit} />
    </div>
  );
};

export default App;
