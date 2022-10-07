import mongoose from 'mongoose';

export interface IEvent {
	title: string;
	description: string;
	banner: string | null;
	startsAtTimestamp: number;
	endsAtTimestamp: number;
}

export interface IEntry {
	paidEntry: boolean;
	entryCost: number;
	registeredCount: number;
	eventCapacity: number;
}

export const ticketsSchema = new mongoose.Schema<IEntry>({
	paidEntry: mongoose.Schema.Types.Boolean,
	entryCost: mongoose.Schema.Types.Number,
	registeredCount: mongoose.Schema.Types.Number,
	eventCapacity: mongoose.Schema.Types.Number,
});

export const eventSchema = new mongoose.Schema<IEvent>(
	{
		title: mongoose.Schema.Types.String,
		description: mongoose.Schema.Types.String,
		banner: { type: mongoose.Schema.Types.String, default: null },
		startsAtTimestamp: mongoose.Schema.Types.Number,
		endsAtTimestamp: { type: mongoose.Schema.Types.Number, default: null },
	},
	{
		collection: 'events',
	},
);

export const Event = mongoose.model<IEvent>('Event', eventSchema);
