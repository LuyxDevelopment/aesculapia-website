import { AriaDialogProps, useDialog } from 'react-aria';
import { FC, ReactNode, useRef } from 'react';

interface Props {
	children: ReactNode;
	props: AriaDialogProps;
}

const Dialog: FC<Props> = ({ children, props }) => {
	const ref = useRef(null);
	const { dialogProps } = useDialog(props, ref);

	return (
		<div {...dialogProps} ref={ref}>
			{children}
		</div>
	);
};

export default Dialog;