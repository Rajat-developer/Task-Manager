const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.Mongo_Uri);
    console.log(
      `Database connected: ${connect.connection.host}, ${connect.connection.name}`
    );
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
};

module.exports = dbConnect;
