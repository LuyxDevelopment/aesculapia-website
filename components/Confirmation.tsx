import { FC, ReactNode, SetStateAction } from 'react';
interface Props {
	message: string;
	open: boolean;
	children: ReactNode;
	setConfirmed: (value: SetStateAction<boolean>) => void;
	setConfirmationOpen: (value: SetStateAction<boolean>) => void;
	setTrashShown: (value: SetStateAction<boolean>) => void;
}
const Confirmation: FC<Props> = ({ open, message, setConfirmed, setConfirmationOpen, setTrashShown }) => {
	if (!open) {
		return <></>;
	}

	return (
		// <div className="fixed inset-0 z-50 overflow-auto bg-zinc-800 bg-opacity-75 flex w-screen h-screen">
		// 	{/* <div className="relative p-8 bg-red-500 w-full max-w-md m-auto flex-col flex rounded-lg">
		// 		<span className="absolute top-0 right-0 p-4">     
		// 			<h2 className="text-xl">{message}</h2>
		// 			<div className="flex justify-end">
		// 				<div className="p-1">
		// 					<button onClick={(): void => setConfirmationOpen(false)} className='absolute bottom-1 h-10 w-20 bg-gray-300 shadow-md flex items-center justify-center rounded-full p-2 hover:bg-red-500 transition-all duration-300 ease-in-out'>
		// 						<p>No</p>
		// 					</button>
		// 				</div>
		// 				<div className="p-1">
		// 					<button onClick={(): void => {
		// 						setConfirmationOpen(false);
		// 						setConfirmed(true);
		// 					}} className='absolute bottom-1 h-10 w-20 bg-gray-300 shadow-md flex items-center justify-center rounded-full p-2 hover:bg-red-500 transition-all duration-300 ease-in-out'>
		// 						<p>Yes</p>
		// 					</button>
		// 				</div>
		// 			</div>
		// 		</span>
		// 	</div> */}
		// </div>
		<div className="absolute top-0 right-0 left-0 bottom-0 z-50 bg-zinc-600 flex">
			<p>{message}</p>
		</div>
	);
};

export default Confirmation;