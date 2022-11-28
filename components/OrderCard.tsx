import React, { FC, useEffect, useState } from 'react';

import { IOrder } from '../src/models/Order';

interface Props {
	order: IOrder & { _id: string };
}

const OrderCard: FC<Props> = ({ order }) => {

	return (
		<div className={`flex ${order.delivered ? 'bg-green-200' : 'bg-red-100'} rounded-lg mb-5 cursor-pointer`} onClick={(): string => (window.location.href = `/admin/orders/${order._id}`)}>
			<div className='flex-col mt-2 mb-2 ml-2'>
				<h1 className='text-xl font-bold'>Order ID: {order._id}</h1>
				<p>{`Order Name: ${order.firstName} ${order.lastName}`}</p>
				<p>{`Created At: ${order.issuedAt}`}</p>
				<p>{`${order.delivered ? 'Delivered' : 'Not Delivered'}`}</p>
				{order.receivedAt ? <p>Received At: {order.receivedAt}</p> : <></>}
			</div>
			<div className='flex-col absolute ml-[31rem] sm:ml-[36rem] md:ml-[35rem] lg:ml-[56rem] mt-2 mb-2'>
				<p className='text-lg text-end'>Total: €{(order.product.reduce((a, b) => a + b.price, 0) / 100).toFixed(2)}</p>
			</div>
		</div>
	);
};

export default OrderCard;
