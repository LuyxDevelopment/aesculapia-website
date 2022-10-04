// Transactions users make when buying products

import mongoose from 'mongoose';

export enum TicketStatus {
	WAITING_FOR_CUSTOMER,
	WAITING_FOR_ADMIN,
	CLOSED
}

export interface ITicket {
	title: string;
	category: string;
	customer: mongoose.Types.ObjectId;
	status: TicketStatus;
	responses: mongoose.Types.ObjectId[];
}

const ticketSchema = new mongoose.Schema<ITicket>({
	title: mongoose.Schema.Types.String,
	category: mongoose.Schema.Types.String,
	customer: mongoose.Schema.Types.ObjectId,
	status: { type: mongoose.Schema.Types.Number, default: TicketStatus.WAITING_FOR_ADMIN },
}, {
	collection: 'tickets',
});

export const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);