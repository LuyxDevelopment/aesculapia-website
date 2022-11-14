import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useLocalStorage = <T,>(key: string, initialValue: T): readonly [T, Dispatch<SetStateAction<T>>, (value: T) => void] => {
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

	const addValue = (value: T): T | void => {
		if ((storedValue as []).constructor !== Array) {
			return value;
		}
		try {

			// const f = storedValue;
			// const index = (storedValue as []).findIndex(o => Object.keys(o)[0] === Object.keys(value!)[0]);

			// if (index > -1) {
			// 	const newAmount = (Object.values((f as []).find(o => Object.keys(o)[0] === Object.keys(value!)[0])!)![0] as number) + 1;
			// 	(f as []).splice(index, 1, { [Object.keys(value!)[0]]: newAmount } as never);
			// 	setStoredValue(f);
			// } else {
			// 	// @ts-ignore
			// 	setStoredValue(arr => [...arr, value]);
			// }

			// if (typeof window !== 'undefined') {
			// 	window.localStorage.setItem(key, JSON.stringify(storedValue));
			// }

			const index = (storedValue as []).findIndex(o => (o as Record<string, unknown>).name === (value as Record<string, unknown>).name);

			if (index > -1) {
				setStoredValue((storedValue as []).filter(p => (p as Record<string, unknown>).name !== (value as Record<string, unknown>).name) as never);
				console.log((value as Record<string, unknown>).amount);
				// @ts-ignore
				setStoredValue(arr => [...arr, { name: value.name, amount: storedValue[index].amount + 1 }]);
			} else {
				// @ts-ignore
				setStoredValue(arr => [...arr, value]);
			}
		} catch (error) {
			console.log(error);
		}


	};

	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(storedValue));
	}, [key, storedValue]);
  
	return [initialValue, setStoredValue, addValue] as const;
};