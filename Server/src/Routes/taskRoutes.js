const express = require("express");
const router = express.Router();
const { createTask, updateTask, getAllTasks, deleteTask } = require("../controllers/taskController");
const authenticate = require("../middleware/authMiddleware");

router.post("/createTask", authenticate, createTask);
router.put("/updateTask/:id", authenticate, updateTask);
router.get("/getTask", getAllTasks);
router.delete("/deleteTask/:id", deleteTask);

module.exports = router;
