import Link from 'next/link';
import { ReactNode, useRef, useState } from 'react';

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
}: DropdownProps): JSX.Element => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);
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
			<button onMouseOver={(): void => setIsVisible(true)}>{children}</button>
			<div
				className={`${
					newSpace ? 'relative' : 'absolute'
				} ${tw} flex flex-col cursor-pointer divide-y-2 divide-gray-200 transition-all duration-300 ease-in-out rounded-lg bg-gray-100 border-gray-300 border-[1px] pt-4 pb-4 drop-shadow-2xl`}
				style={{ visibility: isVisible ? 'visible' : 'hidden', opacity: isVisible ? 100 : 0 }}
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
		</div>
	);
};

const DropdownItem = ({ text, href, tw }: DropdownItem): JSX.Element => {
	return (
		<>
			<p
				className={`${tw} ml-4 mr-4 py-2 w-60 flex flex-wrap pl-2 bg-gray-100 rounded-md text-black hover:bg-gray-300 transition-all ease-in-out duration-150`}
				onClick={
					href !== undefined
						? (): string => (window.location.href = href)
						: (): boolean => {
							return false;
						}
				}
			>
				{href !== undefined && <Link href={href!}>{text}</Link>}
				{href === undefined && text}
			</p>
		</>
	);
};

export default Dropdown;
