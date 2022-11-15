import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Product } from '../../components/ProductCard';

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
			const index = (storedValue as []).findIndex((o: Product) => o.name === (value as Product).name);

			if (index !== -1) {
				if ((value as Product).stock === 0) return undefined;
				if ((value as Product).amount + (storedValue as Product[])[index].amount > (value as Product).stock) return undefined;
				if ((value as Product).amount + (storedValue as Product[])[index].amount < 0) return undefined;
				setStoredValue((storedValue as Product[]).filter(p => p.name !== (value as Product).name));
				setStoredValue(arr => [...arr, { name: (value as Product).name, amount: (storedValue as Product[])[index].amount + (value as Product).amount }]);
				return (value as Product).amount + (storedValue as Product[])[index].amount;
			} 
			setStoredValue(arr => [...arr, value]);
			return (value as Product).amount;
			
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(storedValue));
	}, [key, storedValue]);
  
	return [initialValue, setStoredValue, addValue, getStorage] as const;
};