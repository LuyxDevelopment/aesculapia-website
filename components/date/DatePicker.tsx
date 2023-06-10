import { FC, useEffect, useRef } from 'react';
import { useDatePickerState } from 'react-stately';
import { DateValue, useDatePicker } from 'react-aria';
import { FieldButton } from './Button';
import { DateField } from './DateField';
import Popover from './Popover';
import Dialog from './Dialog';
import Image from 'next/image';
import Calendar from './Calendar';
import { getLocalTimeZone } from '@internationalized/date';

interface Props {
	minValue: DateValue | undefined;
	onChange: (date: Date | null) => void;
}

const DatePicker: FC<Props> = (props) => {
	const state = useDatePickerState({ minValue: props.minValue });
	const ref = useRef(null);
	const {
		groupProps,
		fieldProps,
		buttonProps,
		dialogProps,
		calendarProps,
	} = useDatePicker({ minValue: props.minValue }, state, ref);

	useEffect(() => {
		props.onChange(calendarProps.value ? calendarProps.value.toDate(getLocalTimeZone()) : null);
	}, [calendarProps.value]);

	return (
		<div className='relative inline-flex flex-col text-left'>
			<div {...groupProps} ref={ref} className='flex group'>
				<div className='bg-white border border-gray-300 group-hover:border-gray-400 transition-colors rounded-l-md pr-10 group-focus-within:border-red-600 group-focus-within:group-hover:border-red-600 p-1 relative flex items-center'>
					<DateField {...fieldProps} />
					{state.validationState === 'invalid' && (
						<img
							src={'/assets/icons/exclamation.svg'}
							alt='icon'
							width='10'
							height='10'
							className='ml-2 w-5 h-5 text-gray-700 group-focus-within:text-red-700'
						/>
					)}
				</div>
				<FieldButton {...buttonProps} isPressed={state.isOpen}>
					<img
						src={'/assets/icons/calendar.svg'}
						alt='icon'
						width='10'
						height='10'
						className='w-5 h-5 text-gray-700 group-focus-within:text-red-700'
					/>
				</FieldButton>
			</div>
			{state.isOpen && (
				<Popover triggerRef={ref} state={state} placement='right'>
					<Dialog props={dialogProps}>
						<Calendar props={calendarProps} />
					</Dialog>
				</Popover>
			)}
		</div>
	);
};

export default DatePicker;