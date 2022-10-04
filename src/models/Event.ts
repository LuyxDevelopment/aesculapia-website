// Events created by Aesculapia admins
// Users can sign up for them
// Events are displayed in /events page

import mongoose from 'mongoose';
import { Mongooseify } from '../util/mongoosify.js';
import { IUser } from './User.js';

export interface IEvent {
	title: string;
	description: string;
	banner: string | null;
	startsAt: number;
	endsAt: number;
	registeredUsers: mongoose.Types.ObjectId[];
	register(user: IUser): Promise<boolean>;
	unregister(user: IUser): Promise<boolean>;
}

const eventSchema = new mongoose.Schema<IEvent>({
	title: mongoose.Schema.Types.String,
	description: mongoose.Schema.Types.String,
	banner: { type: mongoose.Schema.Types.String, default: null },
	startsAt: mongoose.Schema.Types.Number,
	endsAt: mongoose.Schema.Types.Number,
	registeredUsers: [mongoose.Schema.Types.ObjectId],
}, {
	methods: {
		async register(user: Mongooseify<IUser>): Promise<boolean> {
			this.registeredUsers.push(user._id);
			await this.updateOne({ $addToSet: { registeredUsers: user._id } });

			user.events.push(this._id);
			await user.updateOne({ $addToSet: { events: this._id } });

			return true;
		},
		async unregister(user: Mongooseify<IUser>): Promise<boolean> {
			this.registeredUsers.splice(this.registeredUsers.indexOf(user._id), 1);
			await this.updateOne({ $pull: { registeredUsers: user._id } });

			user.events.splice(user.events.indexOf(this._id), 1);
			await user.updateOne({ $pull: { events: this._id } });

			return true;
		},
	},
	collection: 'events',
});

export const Event = mongoose.model<IEvent>('Event', eventSchema);