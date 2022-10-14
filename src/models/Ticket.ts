import { Schema, Model, Types, default as mongoose, HydratedDocument } from 'mongoose';
import { EventDocument } from './Event';

export interface ITicket {
	event: Types.ObjectId;
	firstName: string;
	lastName: string;
	email: string;
	membershipDiscount: boolean;
	membershipId: string | null;
	usedAt: number | null;
}

export interface TicketMethods {
	isUsed(this: TicketDocument): boolean;
}

export interface TicketPopulated {
	event: EventDocument;
}

export type TicketDocument = HydratedDocument<ITicket, TicketMethods>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type TicketModel = Model<ITicket, {}, TicketMethods>;

export const ticketSchema = new Schema<ITicket, TicketModel, TicketMethods>({
	event: { type: Schema.Types.ObjectId, ref: 'Event' },
	firstName: Schema.Types.String,
	lastName: Schema.Types.String,
	email: Schema.Types.String,
	membershipDiscount: { type: Schema.Types.Boolean, default: false },
	membershipId: { type: Schema.Types.String, default: null },
	usedAt: { type: Schema.Types.Number, default: null },
}, {
	collection: 'tickets',
	methods: {
		isUsed(this: TicketDocument): boolean {
			return this.usedAt !== null;
		},
	},
});

export const Ticket = mongoose.models.Ticket as TicketModel || mongoose.model<ITicket, TicketModel>('Ticket', ticketSchema);