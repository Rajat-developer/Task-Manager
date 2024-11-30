import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./TaskList.css"; 

const TaskList = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/tasks/getTask");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const updateTaskStatus = async (id, newStatus) => {
    try {
      const task = tasks.find((task) => task._id === id);
      await axios.put(`http://localhost:4000/api/tasks/updateTask/${id}`, {
        ...task,
        status: newStatus,
      });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;
    updateTaskStatus(draggableId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="task-list-container">
        {["Open", "In-Progress", "Completed"].map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="column"
              >
                <h3>{status}</h3>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task-card"
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div className="task-header">
                            <strong>{task.title}</strong>
                            <button
                              onClick={() => onEdit(task)}
                              className="edit-button"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskList;
