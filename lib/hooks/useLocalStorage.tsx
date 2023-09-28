import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DisplayProduct } from '../../components/ProductCard';

export const useLocalStorage = <T extends object,>(key: string, initialValue: T): readonly [T, Dispatch<SetStateAction<T>>, (value: T) => void, () => string | null] => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === 'undefined') {
			return initialValue;
		}
		try {
			const item = window.localStorage.getItem(key);
			if (!item) {
				window.localStorage.setItem(key, JSON.stringify(initialValue));
				return initialValue;
			}
			return JSON.parse(item);
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const getStorage = (): string | null => {
		if (typeof window === 'undefined') {
			return null;
		}

		return window.localStorage.getItem(key);
	};

	const addValue = (value: T): T | number | undefined => {
		if (storedValue.constructor !== Array) {
			return value;
		}
		try {
			const index = (storedValue as []).findIndex((o: DisplayProduct) => o.name === (value as DisplayProduct).name);

			if (index !== -1) {
				// if ((value as DisplayProduct).stock === 0) return undefined;
				// if ((value as DisplayProduct).amount + (storedValue as DisplayProduct[])[index].amount > (value as DisplayProduct).stock) return undefined;
				if ((value as DisplayProduct).amount + (storedValue as DisplayProduct[])[index].amount < 0) return undefined;
				setStoredValue((storedValue as DisplayProduct[]).filter(p => p.name !== (value as DisplayProduct).name) as SetStateAction<T>);
				const amount = (storedValue as DisplayProduct[])[index].amount + (value as DisplayProduct).amount;
				// @ts-ignore
				setStoredValue(arr => [...arr, { id: value.id, name: value.name, price: value.price * amount, amount, stock: value.stock, imageURL: value.imageURL }]);
				return (value as DisplayProduct).amount + (storedValue as DisplayProduct[])[index].amount;
			}

			// @ts-ignore
			setStoredValue(arr => [...arr, value]);
			return (value as DisplayProduct).amount;

		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(storedValue));
	}, [key, storedValue]);

	return [initialValue, setStoredValue, addValue, getStorage] as const;
};