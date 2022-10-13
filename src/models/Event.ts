import { Schema, Model, Types, default as mongoose, HydratedDocument } from 'mongoose';
import { TicketDocument } from './Ticket.js';

export interface IEvent {
	title: string;
	description: string;
	banner: string;
	startsAtTimestamp: number;
	endsAtTimestamp: number;
	entry: IEntry;
}

export interface EventMethods {
	registerParticipant(firstName: string, lastName: string, email: string, membershipDiscount: boolean, membershipId?: string): TicketDocument;
}

export interface EventOverrides {
	entry: Types.Subdocument & IEntry;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type EventModel = Model<IEvent, {}, EventOverrides & EventMethods>;

export type EventDocument = HydratedDocument<IEvent, EventOverrides & EventMethods>;

export interface IEntry {
	paidEntry: boolean;
	entryCost: number;
	registeredCount: number;
	eventCapacity: number;
}

export const eventSchema = new Schema<IEvent, EventModel, EventMethods>(
	{
		title: Schema.Types.String,
		description: Schema.Types.String,
		banner: Schema.Types.String,
		startsAtTimestamp: Schema.Types.Number,
		endsAtTimestamp: Schema.Types.Number,
		entry: { 
			type: new Schema<IEntry>({
				paidEntry: { type: Schema.Types.Boolean, default: false },
				entryCost: { type: Schema.Types.Number, default: 0 },
				registeredCount: { type: Schema.Types.Number, default: 0 },
				eventCapacity: { type: Schema.Types.Number, default: Infinity },
			}),
			default: {},
		},
	},
	{
		collection: 'events',
		methods: {
			registerParticipant() {
				
			},
		},
	},
);

export const Event = mongoose.models.Event as EventModel || mongoose.model<IEvent, EventModel>('Event', eventSchema);
