import { FC, useRef } from 'react';
import { useTimeField, useLocale } from 'react-aria';
import { useTimeFieldState } from 'react-stately';
import { DateSegment } from './DateField';

interface Props {
	flex: boolean
}

const TimeField: FC<Props> = (props) => {
	const { locale } = useLocale();
	const state = useTimeFieldState({
		...props,
		locale,
	});
  
	const ref = useRef(null);
	const { fieldProps } = useTimeField({}, state, ref);
  
	return (
		<>
			<div className='flex flex-col items-start'>
				<div
					{...fieldProps}
					ref={ref}
					className='flex bg-white border border-gray-300 hover:border-gray-400 transition-colors rounded-lg pr-8 focus-within:border-red-600 focus-within:hover:border-red-600 p-1'
				>
					{state.segments.map((segment, i) => (
						<DateSegment key={i} segment={segment} state={state} />
					))}
				</div>
			</div>
		</>
	);
};

export default TimeField;