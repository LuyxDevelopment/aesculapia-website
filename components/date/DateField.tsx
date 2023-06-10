import { FC, useRef } from 'react';
import { DateFieldState, DateSegment as ReactDateSegment, useDateFieldState } from 'react-stately';
import { AriaDateFieldProps, DateValue, useDateField, useDateSegment, useLocale } from 'react-aria';
import { createCalendar } from '@internationalized/date';

interface Props {
	segment: ReactDateSegment;
	state: DateFieldState;
}

const DateField: FC<AriaDateFieldProps<DateValue>> = (props) => {
	const { locale } = useLocale();
	const state = useDateFieldState({
		...props,
		locale,
		createCalendar,
	});

	const ref = useRef(null);
	const { fieldProps } = useDateField(props, state, ref);

	return (
		<div {...fieldProps} ref={ref} className='flex'>
			{state.segments.map((segment, i) => (
				<DateSegment key={i} segment={segment} state={state} />
			))}
		</div>
	);
};

const DateSegment: FC<Props> = ({ segment, state }) => {
	const ref = useRef(null);
	const { segmentProps } = useDateSegment(segment, state, ref);

	return (
		<div
			{...segmentProps}
			ref={ref}
			style={{
				...segmentProps.style,
				minWidth: segment.maxValue !== null ? String(segment.maxValue).length + 'px' : '0px',
			}}
			className={`px-0.5 box-content tabular-nums text-right outline-none rounded-lg focus:bg-red-600 focus:text-white group ${
				!segment.isEditable ? 'text-gray-500' : 'text-gray-800'
			}`}
		>
			{/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
			<span
				aria-hidden='true'
				className='block w-full text-center italic text-gray-500 group-focus:text-white'
				style={{
					visibility: segment.isPlaceholder ? undefined : 'hidden',
					height: segment.isPlaceholder ? '' : 0,
					pointerEvents: 'none',
				}}
			>
				{segment.placeholder}
			</span>
			{segment.isPlaceholder ? '' : segment.text}
		</div>
	);
};

export { DateField, DateSegment };