import { BaseSyntheticEvent, FC, useCallback, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { IEvent } from '../src/models';
import Confirmation from './Confirmation';
import Toast, { clearMessage } from './Toast';

interface Props {
	event: IEvent & { _id: string; };
}

const AdminEventCard: FC<Props> = ({ event }) => {
	const [deleted, setDeleted] = useState(false);
	const [confirmation, setConfirmationOpen] = useState(false);
	const [trashShown, setTrashShown] = useState(true);
	const [name, setName] = useState(event.name);
	const [entryCost, setEntryCost] = useState(event.entry.entryCost);
	const [capacity, setCapacity] = useState(event.entry.eventCapacity);
	const [startsAtTimestamp, setStartsAtTimestamp] = useState(event.startsAtTimestamp);
	const [endsAtTimestamp, setEndsAtTimestamp] = useState(event.endsAtTimestamp);
	const [message, setMessage] = useState<{
		type: 'success' | 'error' | 'info';
		text: string;
	}>({ type: 'success', text: '' });

	const { register, handleSubmit, formState: { errors } } = useForm();

	const deleteEvent = useCallback(async () => {
		const req = await fetch(`/api/events/${event._id}`, {
			method: 'DELETE',
		});

		const data = await req.json();

		if (!data.error) return setDeleted(true);
	}, [event._id]);

	const onSubmit = async (
		data: FieldValues,
		e?: BaseSyntheticEvent,
	): Promise<void> => {
		e?.preventDefault();

		Object.keys(data).forEach(key => !data[key] && delete data[key]);

		try {
			const req = await fetch(`/api/events/${event._id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (req.ok) {
				if (data.name) setName(data.name);
				if (data.entryCapacity) setCapacity(data.entryCapacity);
				if (data.entryCost) setEntryCost(data.entryCost);
				setMessage({ type: 'success', text: 'Event successfully updated!' });
				clearMessage(setMessage);
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
				<div className='group bg-gray-200 p-4 rounded-lg shadow-md transition-all duration-[400ms] ease-in-out relative sm:w-full sm:h-[30rem]'>
					{confirmation ? (<>
						<div>
							<Confirmation
								message='Are you sure you want to delete this event?'
								open={true}
								deleteObject={deleteEvent}
								setConfirmationOpen={setConfirmationOpen}
								setTrashShown={setTrashShown}
							/>
						</div>
					</>) : undefined}
					<form onSubmit={handleSubmit((data, event) => onSubmit(data, event))}>
						<div className='grid grid-cols-2'>
							<div>
								<img className={(event.entry.eventCapacity === 0 ? 'grayscale ' : '') + 'sm:w-64 rounded-lg transition-all duration-[400ms] ease-in-out group-hover:shadow-md group-hover:scale-[0.96]'} draggable={false} src={event.bannerURL} alt={event.name} width='256' height='256' />

								<div className='md:w-1/2 px-3 mb-6 md:mb-0 mt-4'>
									<p className='text-lg h-auto'>Naam Evenement:</p>
									<input className='appearance-none block bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' id='grid-product-name' type='text' placeholder={name || 'Name goes here'} minLength={1} maxLength={64} {...register('name', { required: false })} />
								</div>
								<div className='justify-items-center'>
									<div className='flex flex-row gap-3'>
										<p className='text-lg h-auto'>Kosten Evenement (Euros):</p>
										<input className='appearance-none block bg-gray-200 text-gray-700 border border-slate-500 rounded h-7 w-16 py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white' id='grid-product-name' type='text' placeholder={`${(entryCost / 100).toFixed(2)}`} minLength={1} maxLength={64} {...register('entryCost', { required: false })} />
									</div>
									<div className='flex flex-row gap-3'>
										<p className='text-lg h-auto'>Capaciteit Evenement:</p>
										<input className='appearance-none block bg-gray-200 text-gray-700 border border-slate-500 rounded h-7 w-16 py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white' id='grid-product-name' type='text' placeholder={`${event.entry.eventCapacity || 0}`} minLength={1} maxLength={64} {...register('eventCapacity', { required: false })} />
									</div>
								</div>
							</div>
							<div>
								<div className='flex flex-wrap -mx-3 mb-2'>
									<div className='w-full h-full md:w-1/3 px-3 mb-6 md:mb-0'>
										<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-banner-url'>
											Starttijd Evenement
										</label>
										<input
											className='appearance-none block w-96 bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 leading-tight focus:bg-white focus:ring-red-500 outline-none focus:border-red-500'
											type='datetime-local'
											required
											{...register('startsAtTimestamp', { required: true })}
										/>
									</div>
								</div>
								<div className='flex flex-wrap -mx-3 mb-2'>
									<div className='w-full h-full md:w-1/3 px-3 mb-6 md:mb-0'>
										<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-banner-url'>
											Eindtijd Evenement
										</label>
										<input
											className='appearance-none block w-96 bg-gray-200 text-gray-700 border border-slate-500 rounded py-3 px-4 leading-tight focus:bg-white focus:ring-red-500 outline-none focus:border-red-500'
											type='datetime-local'
											required
											{...register('endsAtTimestamp', { required: true })}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='grid justify-items-center'>
							<button type='submit' className='absolute bottom-1 h-10 w-20 bg-gray-300 shadow-md flex items-center justify-center rounded-full p-2 hover:bg-red-500 transition-all duration-300 ease-in-out'>
								<p>Save</p>
							</button>
						</div>
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

export default AdminEventCard;