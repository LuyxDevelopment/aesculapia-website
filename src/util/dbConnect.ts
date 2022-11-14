import { ConnectionStates, connect } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

if (!MONGO_URI || !DB_NAME) {
	throw new Error('MONGO_URI variable must be defined in the .env.local file!');
}

const connection: { state?: ConnectionStates; } = {};

const dbConnect = async (): Promise<void> => {
	if (connection.state) {
		return;
	}

	const db = await connect(MONGO_URI, { dbName: DB_NAME });

	connection.state = db.connections[0].readyState;

	console.log(connection.state);
};

export default dbConnect;
