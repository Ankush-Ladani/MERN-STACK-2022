import mongoose from "mongoose";

async function connect() {
  await mongoose.connect(
    "mongodb+srv://AnkushLadani:bxW9kaziazEUOurY@cluster0.h58lim7.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("MongoDB connection is successful");
}

export default connect;
