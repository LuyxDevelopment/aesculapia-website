import { useEffect, MutableRefObject } from 'react';

export const useOutsideAlerter = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ref: MutableRefObject<any>,
	cb: () => void,
): void => {
	useEffect(() => {
		const handleHoverOutside = (event: Event): void => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				cb();
			}
		};
		document.addEventListener('mouseover', handleHoverOutside);
		return (): void => {
			document.removeEventListener('mouseout', handleHoverOutside);
		};
	}, [cb, ref]);
};
