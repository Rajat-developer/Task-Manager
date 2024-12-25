import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./TaskForm.css";

const TaskForm = ({ onTaskCreated, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState(initialData?.status || "Open");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/tasks/createTask",
        { title, description, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        onTaskCreated && onTaskCreated(response.data.task); // Notify parent component if provided
        setTitle("");
        setDescription("");
        setStatus("Open");

        // Navigate to the TaskList page
        navigate("/tasklist"); // Update the route based on your setup
      } else {
        setError(response.data.message || "Failed to create task.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{initialData ? "Update Task" : "Create Task"}</h2>

        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          style={{
            resize: "none",
            fontFamily: "inherit",
            fontSize: "1rem",
          }}
        ></textarea>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "1rem",
            background: "#f9f9f9",
            cursor: "pointer",
          }}
        >
          <option value="Open">Open</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="over-button">
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Submitting..." : initialData ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
