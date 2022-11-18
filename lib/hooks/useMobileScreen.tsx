import { useState, useEffect } from 'react';

export const useMobileScreen = () => {
	const [isOnMobile, setIsOnMobile] = useState(false);
	useEffect(() => {
		window.addEventListener('resize', () =>
			setIsOnMobile(window.innerWidth <= 768),
		);
		return () => {
			window.addEventListener('resize', () =>
				setIsOnMobile(window.innerWidth <= 768),
			);
		};
	}, []);
	return { isOnMobile };
};
