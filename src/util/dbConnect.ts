import { ConnectionStates, connect } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI variable must be defined in the .env.local file!");
}

const connection: { state?: ConnectionStates } = {};

const dbConnect = async () => {
  if (connection.state) {
    return;
  }

  const db = await connect(process.env.MONGO_URI!);

  connection.state = db.connections[0].readyState;

  console.log(connection.state);
};

export default dbConnect;
