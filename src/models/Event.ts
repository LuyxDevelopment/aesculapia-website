import { Schema, Model, Types, default as mongoose, HydratedDocument } from 'mongoose';

import { Ticket, TicketDocument } from './Ticket';

export interface IEvent {
	title: string;
	description: string;
	banner: string;
	startsAtTimestamp: number;
	endsAtTimestamp: number;
	entry: IEntry;
}

export interface EventMethods {
	registerParticipant(this: EventDocument, firstName: string, lastName: string, email: string, membershipDiscount: boolean, membershipId?: string): TicketDocument;
}

export interface EventOverrides {
	entry: Types.Subdocument & IEntry;
}

export type EventDocument = HydratedDocument<IEvent, EventOverrides & EventMethods>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type EventModel = Model<IEvent, {}, EventOverrides & EventMethods>;

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
				entryCost: { type: Schema.Types.Number, min: 0, default: 0 },
				registeredCount: { type: Schema.Types.Number, min: 0, default: 0 },
				eventCapacity: { type: Schema.Types.Number, min: 0, default: Infinity },
			}),
			default: {},
		},
	},
	{
		collection: 'events',
		methods: {
			registerParticipant(this: EventDocument, firstName: string, lastName: string, email: string, membershipDiscount: boolean, membershipId?: string): TicketDocument {
				this.entry.registeredCount++;

				const ticket = new Ticket({
					firstName,
					lastName,
					email,
					membershipDiscount,
					membershipId,
				});

				return ticket;
			},
		},
	},
);

export const Event = mongoose.models.Event as EventModel || mongoose.model<IEvent, EventModel>('Event', eventSchema);