import React from 'react';
import { FC } from 'react';
import { IOrder } from '../src/models/Order.js';

interface Props {
	order: IOrder;
}

const OrderCard: FC<Props> = ({ order }) => {
	return <div>OrderCard</div>;
};

export default OrderCard;
