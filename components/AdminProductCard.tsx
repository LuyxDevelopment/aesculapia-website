import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IProduct } from '../src/models';
import Confirmation from './Confirmation';

interface Props {
	product: IProduct & { _id: string; };
}

const AdminProductCard: FC<Props> = ({ product }) => {
	const [deleted, setDeleted] = useState(false);
	const [confirmation, setConfirmationOpen] = useState(false);
	const [confirmed, setConfirmed] = useState(false);
	const [trashShown, setTrashShown] = useState(true);

	const { register, handleSubmit, formState: { errors } } = useForm();

	const deleteProduct = async (): Promise<void> => {
		const req = await fetch(`/api/products/${product._id}`, {
			method: 'DELETE',
		});

		const data = await req.json();

		console.log(data);

		if (!data.error) return setDeleted(true);
	};

	return <>
		{deleted ? (<></>) : (
			<>
				<div className='group bg-gray-200 p-4 rounded-lg shadow-md hover:scale-[1.04] transition-all duration-[400ms] ease-in-out relative sm:w-72 sm:h-[30rem]'>
					{confirmation ? (<>
						<Confirmation
							message="f"
							open={true}
							setConfirmed={setConfirmed}
							setConfirmationOpen={setConfirmationOpen}
							setTrashShown={setTrashShown}>
					
						</Confirmation>
					</>) : undefined}
					<div className="grid justify-items-center">
						<img className={(product.stock === 0 ? 'grayscale ' : '') + 'sm:w-64 rounded-lg transition-all duration-[400ms] ease-in-out group-hover:shadow-md group-hover:scale-[0.96]'} draggable={false} src={product.imageURL} alt={product.name} width='256' height='256' />
		
					</div>
					<form>
						<div className="md:w-1/2 px-3 mb-6 md:mb-0 mt-4">
							<input className="appearance-none block bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-product-name" type="text" placeholder={product.name} minLength={1} maxLength={64} required {...register('name', { required: true })} />
						</div>
						<p className='text-lg absolute bottom-10 right-5 h-auto'>€{(product.price / 100).toFixed(2)}</p>
						<p className={product.stock === 0 ? 'text-red-700' : 'text-stone-700'}>{product.stock === 0 ? 'Out of stock' : `${product.stock} left`}</p>
						<div className="grid justify-items-center">
							<button className='absolute bottom-1 h-10 w-20 bg-gray-300 shadow-md flex items-center justify-center rounded-full p-2 hover:bg-red-500 transition-all duration-300 ease-in-out'>
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
						(<button onClick={() => setConfirmationOpen(true)} className='absolute -bottom-3 -right-3 h-10 w-10 bg-red-500 shadow-md flex items-center justify-center rounded-full p-2 hover:bg-red-700 transition-all duration-300 ease-in-out'>
							<img src='/assets/icons/trashcan.svg' width={900} height={900} alt='Delete' />
						</button>) 
						: undefined}
				</div>
			</>
		)}
	</>;
};

export default AdminProductCard;