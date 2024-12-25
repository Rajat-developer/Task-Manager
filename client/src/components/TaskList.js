import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/tasks/getTask"); // Replace with your actual API endpoint
        setTasks(response.data); // Update the state with the fetched tasks
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch tasks.");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Update task status
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Render loading, error, or task board
  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="task-board">
        {["Open", "In-Progress", "Completed"].map((status) => (
          <TaskSection
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            onDrop={(taskId) => updateTaskStatus(taskId, status)}
          />
        ))}
      </div>
    </DndProvider>
  );
};

const TaskSection = ({ status, tasks, onDrop }) => {
  const [, dropRef] = useDrop({
    accept: "TASK",
    drop: (item) => onDrop(item.id),
  });

  return (
    <div className="task-section" ref={dropRef}>
      <h3>{status}</h3>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

const TaskCard = ({ task }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: { id: task._id }, // Use `_id` if that's how your backend structures it
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      className="task-card"
      ref={dragRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h4>{task.title}</h4>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskList;
