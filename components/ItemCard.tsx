import React from 'react';
import { FC } from 'react';

export interface Item {
	name: string;
	description: string;
	id: string;
	imageURL: string;
	price: number;
	inStock: boolean;
}

interface Props {
	item: Item;
}

const ItemCard: FC<Props> = ({ item }) => {
	return <div>ItemCard</div>;
};

export default ItemCard;
