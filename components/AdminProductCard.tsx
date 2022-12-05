import Image from 'next/image';
import { BaseSyntheticEvent, FC, useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { IProduct } from '../src/models';
import Confirmation from './Confirmation';
import Toast, { clearMessage } from './Toast';

interface Props {
	product: IProduct & { _id: string; };
}

const AdminProductCard: FC<Props> = ({ product }) => {
	const [deleted, setDeleted] = useState(false);
	const [confirmation, setConfirmationOpen] = useState(false);
	const [trashShown, setTrashShown] = useState(true);
	const [name, setName] = useState(product.name);
	const [price, setPrice] = useState(product.price);
	const [stock, setStock] = useState(product.stock);
	const [message, setMessage] = useState<{
		type: 'success' | 'error' | 'info';
		text: string;
	}>({ type: 'success', text: '' });

	const { register, handleSubmit, formState: { errors } } = useForm();

	const deleteProduct = useCallback(async () => {
		const req = await fetch(`/api/products/${product._id}`, {
			method: 'DELETE',
		});
	
		const data = await req.json();
	
		if (!data.error) return setDeleted(true);
	}, [product._id]);

	const onSubmit = async (
		data: FieldValues,
		event?: BaseSyntheticEvent,
	): Promise<void> => {
		event?.preventDefault();

		Object.keys(data).forEach(key => !data[key] && delete data[key]);

		if (data.price) data.price *= 100;
		
		try {
			const req = await fetch(`/api/products/${product._id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (req.ok) {
				if (data.name) setName(data.name);
				if (data.stock) setStock(data.stock);
				if (data.price) setPrice(data.price);
			} else if (req.status === 500) {
				setMessage({ type: 'error', text: 'An error occurred.' });
				clearMessage(setMessage);
			}
		} catch (error) {
			console.error(error);
			setMessage({ type: 'error', text: 'An error occurred.' });
			clearMessage(setMessage);
		}
	};

	return <>
		{deleted ? (<></>) : (
			<>
				<div className='group bg-gray-200 p-4 rounded-lg shadow-md hover:scale-[1.04] transition-all duration-[400ms] ease-in-out relative sm:w-72 sm:h-[30rem]'>
					{confirmation ? (<>
						<div>
							<Confirmation
								message="Are you sure you want to delete this product?"
								open={true}
								deleteProduct={deleteProduct}
								setConfirmationOpen={setConfirmationOpen}
								setTrashShown={setTrashShown}
							/>
						</div>
					</>) : undefined}
					<div className="grid justify-items-center">
						<img className={(product.stock === 0 ? 'grayscale ' : '') + 'sm:w-64 rounded-lg transition-all duration-[400ms] ease-in-out group-hover:shadow-md group-hover:scale-[0.96]'} draggable={false} src={product.imageURL} alt={product.name} width='256' height='256' />
					</div>
					<form onSubmit={handleSubmit((data, event) => onSubmit(data, event))}>
						<div className="md:w-1/2 px-3 mb-6 md:mb-0 mt-4">
							<input className="appearance-none block bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-product-name" type="text" placeholder={name} minLength={1} maxLength={64} {...register('name', { required: false })} />
						</div>
						<div className="flex flex-row gap-3">
							<p className='text-lg h-auto'>Price:</p>
							<div className="relative divide-x">
								<p className="absolute ml-[2px] mt-[2.5px]">€</p>
								<input className="appearance-none block bg-gray-200 text-gray-700 border border-slate-500 rounded h-7 w-16 pl-[18px] py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-product-name" type="text" placeholder={`${(price / 100).toFixed(2)}`} minLength={1} maxLength={64} {...register('price', { required: false })} />
							</div>
						</div>
						<div className="flex flex-row gap-3">
							<p className='text-lg h-auto'>Stock:</p>
							<input className="appearance-none block bg-gray-200 text-gray-700 border border-slate-500 rounded h-7 w-16 py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-product-name" type="text" placeholder={`${stock}`} minLength={1} maxLength={64} {...register('stock', { required: false })} />
						</div>
						<div className="grid justify-items-center">
							<button type="submit" className='absolute bottom-1 h-10 w-20 bg-gray-300 shadow-md flex items-center justify-center rounded-full p-2 hover:bg-red-500 transition-all duration-300 ease-in-out'>
								<p>Save</p>
							</button>
						</div>
						
						{/* {
				<>
					<button className='absolute -bottom-3 -right-3 h-10 w-10 bg-red-500 shadow-md flex items-center justify-center rounded-full p-2 hover:bg-red-700 transition-all duration-300 ease-in-out' >
						<img src='/assets/icons/trashcan.svg' width={900} height={900} alt='Delete' />
					</button>
					<button className='absolute -top-3 -left-3 h-10 w-10 bg-gray-300 shadow-md flex items-center justify-center rounded-full p-2 transition-all duration-300 ease-in-out'>
						<p>-</p>
					</button>
					<button className='absolute -top-3 -right-3 h-10 w-10 bg-gray-300 shadow-md flex items-center justify-center rounded-full p-2 transition-all duration-300 ease-in-out'>
						<p>+</p>
					</button>
					<button className='absolute -bottom-3 -left-3 h-10 w-10 bg-gray-300 shadow-md flex items-center justify-center rounded-full p-2 transition-all duration-300 ease-in-out'>
						<p>Save</p>
					</button>
				</>
			} */}
					</form>
					{trashShown ? 
						(<button onClick={(): void => setConfirmationOpen(true)} className='absolute -bottom-3 -right-3 h-10 w-10 bg-red-500 shadow-md flex items-center justify-center rounded-full p-2 hover:bg-red-700 transition-all duration-300 ease-in-out'>
							<img src='/assets/icons/trashcan.svg' width={900} height={900} alt='Delete' />
						</button>) 
						: undefined}
				</div>
			</>
		)}
		{message.text !== '' && (
			<Toast
				type={message.type}
				title={message.type[0].toUpperCase() + message.type.slice(1)}
				description={message.text}
			/>
		)}
	</>;
};

export default AdminProductCard;