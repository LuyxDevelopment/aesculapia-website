import { FC, BaseSyntheticEvent, useState } from 'react';
import Toast, { clearMessage } from './Toast';
import { FieldValues, useForm } from 'react-hook-form';

const MemberValidateCheckout: FC = () => {
	const [message, setMessage] = useState<{
		type: 'success' | 'error' | 'info';
		text: string;
	}>({ type: 'success', text: '' });

	const {
		register: registerMemberValidate,
		handleSubmit: handleSubmitMemberValidate,
		formState: { errors },
	} = useForm();

	const onSubmitMemberValidate = async (
		data: FieldValues,
		event?: BaseSyntheticEvent,
	): Promise<void> => {
		event?.preventDefault();

		try {
			const req = await fetch('/api/members/validate', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: data.name,
					memberNumber: data.memberNumber,
				}),
			}).catch(e => {
				console.log(e);
				setMessage({
					type: 'error',
					text: 'Member not found.',
				});
			});

			if (req && req.ok) {
				setMessage({
					type: 'success',
					text: 'Member exists.',
				});
			} else {
				setMessage({
					type: 'error',
					text: 'Member not found.',
				});
			}
		} catch (error) {
			console.error(error);
			setMessage({
				type: 'error',
				text: 'Error occured.',
			});

			clearMessage(setMessage);
		}
	};

	return (
		<>
			<div className='flex flex-wrap h-auto text-xl mt-3'>
				<form
					onSubmit={handleSubmitMemberValidate((data, event) => onSubmitMemberValidate(data, event))}
				>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='grid-lidnummer'
							>
								Naam
							</label>
							<input
								className='appearance-none block w-full bg-gray-200 text-gray-700 border-slate-500 rounded py-3 px-4 mb-3 leading-tight border-2 focus:border-rose-500 focus:bg-white'
								id='grid-lidnummer'
								type='text'
								placeholder='Bob Johnson'
								required
								{...registerMemberValidate('name', { required: true })}
							/>
						</div>
						<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='grid-ldc'
							>
								Lidnummer
							</label>
							<input
								className='appearance-none block w-full bg-gray-200 text-gray-700 border-slate-500 rounded py-3 px-4 mb-3 leading-tight border-2 focus:border-rose-500 focus:bg-white'
								id='grid-lidnummer'
								type='text'
								placeholder='A1232452'
								required
								{...registerMemberValidate('memberNumber', { required: true })}
							/>
						</div>
					</div>
					<div className='pb-9'>
						<button className='h-10 px-5 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800'>
							<input
								className='cursor-pointer'
								type='submit'
								value='Indienen'
							></input>
						</button>
					</div>
				</form>
			</div>
			{message.text !== '' && (
				<Toast
					type={message.type}
					title={message.type[0].toUpperCase() + message.type.slice(1)}
					description={message.text}
				/>
			)}
		</>
	);
};


export default MemberValidateCheckout;