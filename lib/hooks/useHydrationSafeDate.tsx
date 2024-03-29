import { useState, useEffect } from 'react';

export const useHydrationSafeDate = (date: number): string => {
	const [safeDate, setSafeDate] = useState<string>('');

	useEffect(() => {
		setSafeDate(new Date(date).toLocaleDateString());
	}, [date]);

	return safeDate;
};
