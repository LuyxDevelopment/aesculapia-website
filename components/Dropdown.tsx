import { useState, useRef, ReactNode } from 'react';
import Link from 'next/link';
import { useOutsideAlerter } from '../lib/hooks/useOutsideAlerter';

interface DropdownItem {
	text: string;
	href?: string;
	tw?: string;
}

interface DropdownProps {
	direction: 'right' | 'left' | 'bottom';
	children: ReactNode;
	items: DropdownItem[];
	newSpace?: boolean;
	tw?: string;
}

const Dropdown = ({
	direction,
	children,
	items,
	newSpace,
	tw,
}: DropdownProps): JSX.Element => {
	const dropdownRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = (): void => setIsVisible(!isVisible);
	useOutsideAlerter(dropdownRef, () => setIsVisible(false));

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
