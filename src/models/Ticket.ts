import { Schema, Model, Types, default as mongoose, HydratedDocument } from 'mongoose';
import { EventDocument } from './Event.js';

export interface ITicket {
	event: Types.ObjectId;
	firstName: string;
	lastName: string;
	email: string;
	membershipDiscount: boolean;
	membershipId: string | null;
}

export interface TicketPopulated {
	event: EventDocument;
}

export type TicketModel = Model<ITicket>;

export type TicketDocument = HydratedDocument<ITicket>;

export const ticketSchema = new Schema<ITicket, TicketModel>({
	event: { type: Schema.Types.ObjectId, ref: 'Event' },
	firstName: Schema.Types.String,
	lastName: Schema.Types.String,
	email: Schema.Types.String,
	membershipDiscount: { type: Schema.Types.Boolean, default: false },
	membershipId: { type: Schema.Types.String, default: null },
}, {
	collection: 'tickets',
});

export const Ticket = mongoose.models.Ticket as TicketModel || mongoose.model<ITicket, TicketModel>('Ticket', ticketSchema);