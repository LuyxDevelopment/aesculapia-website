import Link from 'next/link';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { useOutsideAlerter } from '../lib/hooks/useOutsideAlerter';

export interface DropdownItem {
	text: string;
	href?: string;
	tw?: string;
}

export interface DropdownProps {
	direction: 'right' | 'left' | 'bottom';
	children: ReactNode;
	items: DropdownItem[];
	newSpace?: boolean;
	tw?: string;
	hovered?: boolean;
}

const Dropdown = ({
	direction,
	children,
	items,
	newSpace,
	tw,
	hovered,
}: DropdownProps): JSX.Element => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = (): void => setIsVisible(!isVisible);
	useOutsideAlerter(dropdownRef, () => setIsVisible(false));

	useEffect(() => {
		if (hovered) {
			dropdownRef.current?.addEventListener('mouseover', () =>
				setIsVisible(true),
			);
			dropdownRef.current?.addEventListener('mouseleave', () =>
				setIsVisible(false),
			);
			return () => {
				dropdownRef.current?.removeEventListener('mouseover', () =>
					setIsVisible(true),
				);
				dropdownRef.current?.removeEventListener('mouseleave', () =>
					setIsVisible(false),
				);
			};
		}
	}, []);

	return (
		<div
			className={`${
				direction === 'right'
					? 'flex flex-row'
					: direction === 'left'
						? 'flex flex-row-reverse'
						: direction === 'bottom'
							? 'relative inline-block'
							: ''
			}`}
			ref={dropdownRef}
		>
			<button onClick={toggleVisibility}>{children}</button>
			{isVisible && (
				<div
					className={`${
						newSpace ? 'relative' : 'absolute'
					} ${tw} flex flex-col rounded-md drop-shadow-lg child-xl cursor-pointer`}
				>
					{items.map((item, i) => {
						return (
							<DropdownItem
								href={item.href}
								text={item.text}
								key={i}
								tw={item.tw}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

const DropdownItem = ({ text, href, tw }: DropdownItem): JSX.Element => {
	return (
		<>
			<p
				className={`${tw} py-2 w-28 flex flex-wrap pl-2 border-gray-200 border-b-2 bg-white text-black`}
				onClick={
					href !== undefined
						? (): string => (window.location.href = href)
						: (): boolean => {
							return false;
						}
				}
			>
				{href !== undefined && <Link href={href!}>{text}</Link>}
				{href === undefined && <p>{text}</p>}
			</p>
		</>
	);
};

export default Dropdown;
