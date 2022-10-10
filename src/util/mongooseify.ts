import mongoose from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Mongooseify<T> = (mongoose.Document<unknown, any, T> & T & {
	_id: mongoose.Types.ObjectId;
});