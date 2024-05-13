import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const { connection } = await mongoose.connect(URI!, {
      dbName: "todos",
    });
    console.log("Connected to MongoDB" + connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default dbConnect;
