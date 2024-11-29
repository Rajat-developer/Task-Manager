const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnect = require("./db/dbConnect");
const taskRoutes = require("./Routes/taskRoutes");

dotenv.config();
const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to db
dbConnect();

//Common route for createTask, UpdateTask, Get All Tasks
app.use("/api/task", taskRoutes);

//Start the server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});