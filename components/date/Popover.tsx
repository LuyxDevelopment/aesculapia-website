import { FC, ReactNode, RefObject, useRef } from 'react';
import { usePopover, DismissButton, Overlay } from '@react-aria/overlays';
import { OverlayTriggerState } from 'react-stately';
import { Placement } from 'react-aria';

interface Props {
	state: OverlayTriggerState;
	children: ReactNode;
	triggerRef: RefObject<Element>;
	placement: Placement | undefined 
}

const Popover: FC<Props> = (props) => {
	const ref = useRef(null);
	const { state, children } = props;

	const { popoverProps, underlayProps } = usePopover(
		{
			...props,
			popoverRef: ref,
			placement: props.placement,
		},
		state,
	);

	return (
		<Overlay>
			<div {...underlayProps} className='fixed inset-0' />
			<div
				{...popoverProps}
				ref={ref}
				className='absolute top-full bg-white border border-gray-300 rounded-lg shadow-lg ml-5 mt-2 p-8 z-10'
			>
				<DismissButton onDismiss={state.close} />
				{children}
				<DismissButton onDismiss={state.close} />
			</div>
		</Overlay>
	);
};

export default Popover;