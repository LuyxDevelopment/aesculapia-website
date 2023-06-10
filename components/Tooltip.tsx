import { FC, ReactNode } from 'react';

interface Props {
	children: ReactNode;
	text: string;
	tw?: string;
}

const Tooltip: FC<Props> = ({ children, text, tw }) => {
	return (
		<div className={`tooltip ${tw}`}>
			<span className='tooltip-text'>{text}</span>
			{children}
		</div>
	);
};

export default Tooltip;
