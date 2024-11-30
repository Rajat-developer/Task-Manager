import React, { useEffect, useState } from "react";
import axios from "axios";
import './TaskForm.css'; 

const TaskForm = ({ task = null, onSave }) => {
  const [title, setTitle] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [status, setStatus] = useState("Open"); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); // Error state
  const [successMessage, setSuccessMessage] = useState(""); 

  // Update form fields
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "Open");
    } else {
      // Reset fields for new task
      setTitle("");
      setDescription("");
      setStatus("Open");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    const data = { title, description, status };

    try {
      if (task && task._id) {
        await axios.put(`http://localhost:4000/api/tasks/updateTask/${task._id}`, data);
        setSuccessMessage("Task updated successfully!");
      } else {
        await axios.post(`http://localhost:4000/api/tasks/createTask`, data);
        setSuccessMessage("Task created successfully!");
      }
      onSave(); // Notify parent component
    } catch (err) {
      setError("Failed to save the task. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccessMessage(""); // Hide success message after 2 seconds
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">{task ? "Edit Task" : "Create Task"}</h2>

      <div className="form-group">
        <label className="form-label">Task Title:</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Task Description:</label>
        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-textarea"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-select"
        >
          <option value="Open">Open</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <button
        type="submit"
        disabled={loading}
        className="form-button"
      >
        {loading ? "Saving..." : task ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
