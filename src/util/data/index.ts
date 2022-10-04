import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI!, { dbName: process.env.DB_NAME }).then(() => {
	console.log('Connected to Mongo');
}).catch((err) => {
	console.log(`Couldn't connect to Mongo.\nError: ${err.message}`);
});