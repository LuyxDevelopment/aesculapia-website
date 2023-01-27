import { FC } from 'react';

interface Props {
	className?: string;
	fill?: string;
}

const CloseIcon: FC<Props> = ({ className, fill }) => {
	return (
		<svg className={className} fill={fill} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>
			<path d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/>
		</svg>
	);
};

const PlusIcon: FC<Props> = ({ className, fill }) => {
	return (
		<svg className={className} fill={fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"/>
		</svg>
	);
};

const MinusIcon: FC<Props> = ({ className, fill}) => {
	return (
		<svg className={className} fill={fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"/>
		</svg>
	);
};

export { CloseIcon, PlusIcon, MinusIcon };