import { FC, useRef } from 'react';
import { useCalendarState } from 'react-stately';
import { CalendarProps, DateValue, useCalendar, useLocale } from 'react-aria';
import { createCalendar } from '@internationalized/date';
import { CalendarButton } from './Button';
import CalendarGrid from './CalendarGrid';
import Image from 'next/image';

interface Props {
	props: CalendarProps<DateValue>;
}

const Calendar: FC<Props> = ({ props }) => {
	const { locale } = useLocale();
	const state = useCalendarState({
		...props,
		locale,
		createCalendar,
	});

	const ref = useRef(null);
	const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
		props,
		state,
	);

	return (
		<div {...calendarProps} ref={ref} className='inline-block text-gray-800'>
			<div className='flex items-center pb-4'>
				<h2 className='flex-1 font-bold text-xl ml-2'>{title}</h2>
				<CalendarButton {...prevButtonProps}>
					◀
				</CalendarButton>
				<CalendarButton {...nextButtonProps}>
					▶
				</CalendarButton>
			</div>
			<CalendarGrid state={state} />
		</div>
	);
};

export default Calendar;