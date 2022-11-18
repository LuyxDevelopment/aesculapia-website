import { FC, SetStateAction } from 'react';
interface Props {
	message: string;
	open: boolean;
	deleteProduct: () => void;
	setConfirmationOpen: (value: SetStateAction<boolean>) => void;
	setTrashShown: (value: SetStateAction<boolean>) => void;
}
const Confirmation: FC<Props> = ({ open, message, deleteProduct, setConfirmationOpen, setTrashShown }) => {
	if (!open) {
		return <></>;
	}

	setTrashShown(false);

	return (
		<div className="grid place-items-center absolute inset-0 z-50 bg-zinc-800 bg-opacity-75 w-full h-full rounded-lg">
			<div className="relative w-full h-11/12 right-0 left-0 z-51 bg-gray-200 rounded-lg">
				<div className="mt-2 mb-2 grid place-items-center text-center">
					<h2 className="text-xl">{message}</h2>
					<div className="flex gap-3">
						<button onClick={(): void => {
							deleteProduct();
							setConfirmationOpen(false);
						}} className='bottom-0 h-10 w-20 bg-red-500 shadow-md flex items-center justify-center rounded-full p-2 hover:bg-red-700 transition-all duration-300 ease-in-out'>
							<p>Yes</p>
						</button>
						<button onClick={(): void => {
							setConfirmationOpen(false);
							setTrashShown(true);
						}} className='h-10 w-20 bg-gray-300 shadow-md flex items-center justify-center rounded-full p-2 hover:bg-gray-500 transition-all duration-300 ease-in-out'>
							<p>No</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Confirmation;