import { FC, useRef } from 'react';
import { useButton, useFocusRing, mergeProps, AriaButtonProps } from 'react-aria';

const CalendarButton: FC<AriaButtonProps> = (props) => {
	const ref = useRef(null);
	const { buttonProps } = useButton(props, ref);
	const { focusProps, isFocusVisible } = useFocusRing();
	return (
		<button
			{...mergeProps(buttonProps, focusProps)}
			ref={ref}
			className={`p-2 rounded-lg ${props.isDisabled ? 'text-gray-400' : ''} ${
				!props.isDisabled ? 'hover:bg-red-100 active:bg-red-200' : ''
			} outline-none ${
				isFocusVisible ? 'ring-2 ring-offset-2 ring-red-600' : ''
			}`}
		>
			{props.children}
		</button>
	);
};

const FieldButton: FC<AriaButtonProps & { isPressed: boolean }> = (props) => {
	const ref = useRef(null);
	const { buttonProps, isPressed } = useButton(props, ref);
	return (
		<button
			{...buttonProps}
			ref={ref}
			className={`px-2.5 w-10 -ml-px border transition-colors rounded-r-md group-focus-within:border-red-600 group-focus-within:group-hover:border-red-600 outline-none ${
				isPressed || props.isPressed
					? 'bg-gray-200 border-gray-400'
					: 'bg-gray-50 border-gray-300 group-hover:border-gray-400'
			}`}
		>
			{props.children}
		</button>
	);
};

export { CalendarButton, FieldButton };