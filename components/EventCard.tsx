import React from 'react';
import { FC } from 'react';
import { IEvent } from '../src/models/Event';

interface Props {
	event: IEvent;
}

const EventCard: FC<Props> = ({ event }) => {
	return <div>EventCard</div>;
};

export default EventCard;
