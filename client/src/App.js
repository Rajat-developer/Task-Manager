import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

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
  
      <div className="center-text">
        <h1>Task Management</h1>
        <TaskForm task={currentTask} onSave={handleSave} />
        <TaskList key={refresh} onEdit={handleEdit} />
      </div>
  
  );
};

export default App;



