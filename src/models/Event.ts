import { Schema, Model, Types, default as mongoose, HydratedDocument } from 'mongoose';

import { Ticket, TicketDocument } from './Ticket.js';

export interface IEvent {
	title: string;
	description: string;
	banner: string;
	startsAtTimestamp: number;
	endsAtTimestamp: number;
	entry: IEntry;
}

export interface IEventMethods {
	registerParticipant(this: EventDocument, firstName: string, lastName: string, email: string, membershipDiscount: boolean, membershipId?: string): Promise<TicketDocument>;
}

export interface IEventOverrides {
	entry: Types.Subdocument & IEntry;
}

export type EventDocument = HydratedDocument<IEvent, IEventOverrides & IEventMethods>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type EventModel = Model<IEvent, {}, IEventOverrides & IEventMethods>;

export interface IEntry {
	paidEntry: boolean;
	entryCost: number;
	registeredCount: number;
	eventCapacity: number;
}

export const eventSchema = new Schema<IEvent, EventModel, IEventMethods>(
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
			async registerParticipant(this: EventDocument, firstName: string, lastName: string, email: string, membershipDiscount: boolean, membershipId?: string): Promise<TicketDocument> {
				this.entry.registeredCount++;

				await this.save();

				const ticket = new Ticket({
					firstName,
					lastName,
					email,
					membershipDiscount,
					membershipId,
				});

				await ticket.save();

				return ticket;
			},
		},
	},
);

export const Event = mongoose.models.Event as EventModel || mongoose.model<IEvent, EventModel>('Event', eventSchema);