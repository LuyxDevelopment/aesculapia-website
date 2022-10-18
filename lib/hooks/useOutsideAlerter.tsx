import { useEffect, MutableRefObject } from 'react';

export const useOutsideAlerter = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ref: MutableRefObject<any>,
	cb: () => void,
): void => {
	useEffect(() => {
		const handleClickOutside = (event: Event): void => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				cb();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return (): void => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [cb, ref]);
};
