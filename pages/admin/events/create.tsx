import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { BaseSyntheticEvent, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Layout from '../../../components/Layout';
import { useMetaData } from '../../../lib/hooks/useMetaData';
import { AdminProps } from '../../../src/types/index';
import { ironOptions } from '../../../src/util/ironConfig';
import Toast, { clearMessage } from '../../../components/Toast';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import DatePicker from '../../../components/date/DatePicker';
import { today, getLocalTimeZone, DateFormatter, parseAbsoluteToLocal } from '@internationalized/date';
import { SSRProvider } from 'react-aria';
import TimeField from '../../../components/date/TimeField';

const AdminCreateProducts: NextPage<{ user: { email: string, has2faEnabled: boolean; }; }> = ({ user }) => {

	const { register, handleSubmit, formState: { errors } } = useForm();

	const [message, setMessage] = useState<{
		type: 'success' | 'error' | 'info';
		text: string;
	}>({ type: 'success', text: '' });

	const router = useRouter();

	const [selected, setSelected] = useState<Date>();
	console.log(selected);

	const onSubmit = async (data: FieldValues, event?: BaseSyntheticEvent): Promise<void> => {
		event?.preventDefault();
		console.log(data);
		try {
			const req = await fetch('/api/events', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					bannerURL: data.bannerURL,
					name: data.name,
					description: data.description,
					startsAtTimestamp: data.startsAtTimestamp,
					endsAtTimestamp: data.endsAtTimestamp,
					entry: {
						paidEntry: data.paidEntry,
						...(data.paidEntry && {
							entryCost: data.entryCost,
							registeredCount: data.registeredCount,
							eventCapacity: data.eventCapacity,
						}),
					},
					user,
				}),
			});

			if (req.ok) {
				setMessage({
					type: 'success',
					text: 'Event is succesvol aangemaakt!',
				});
				await router.push('/admin/events/');
			} else if (req.status === 401) {
				setMessage({
					type: 'error',
					text: 'Er was een fout bij het maken van het event.',
				});
			}
		} catch (error) {
			console.error(error);
			setMessage({
				type: 'error',
				text: 'Er is een onverwachte fout opgetreden.',
			});
			clearMessage(setMessage);
		}
	};

	return (
		<>
			{useMetaData('Aesculapia Admin | Events', 'Events', '/admin')}
			<Layout>
				<div className='container relative'>
					<div className='top-10 left-14 sm:left-20'>
						<div className='flex flex-wrap w-56 sm:w-96'>
							<h1 className='text-5xl pb-2 font-bold text-black'>
								Maak een evenement.
							</h1>
							<p className='text-xl text-black'>
								Creëer een evenement dat klanten kunnen bijwonen.
							</p>
						</div>
						<div className='flex flex-wrap h-auto text-xl mt-3'>
							<form onSubmit={handleSubmit((data, event) => onSubmit(data, event))}>
								<div className='flex flex-wrap -mx-3'>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-event-name'>
											EVENT NAAM
										</label>
										<input className='appearance-none block w-full text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-white focus:ring-red-500 outline-none focus:border-red-500' id='grid-event-name' type='text' placeholder='Chocolate' minLength={1} maxLength={64} required {...register('name', { required: true })} />
									</div>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-event-price'>
											EVENEMENTBESCHRIJVING
										</label>
										<input className='appearance-none block w-full text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-white focus:ring-red-500 outline-none focus:border-red-500' id='grid-event-price' type='text' placeholder='5.31' {...register('entry.entryCost', { required: true })} />
									</div>
								</div>
								<div className='flex flex-wrap -mx-3 mb-2'>
									<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
										<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-banner-url'>
											BANNER URL
										</label>
										<input className='appearance-none block w-96 text-gray-700 border border-slate-500 rounded py-3 px-4 leading-tight focus:bg-white focus:ring-red-500 outline-none focus:border-red-500' id='grid-banner-url' type='text' placeholder='https://example.com/image.png' minLength={1} maxLength={1024} required {...register('bannerURL', { required: true })} />
									</div>
								</div>
								<div className='flex flex-wrap -mx-3 mb-2'>
									<div className='w-full h-full md:w-1/3 px-3 mb-6 md:mb-0'>
										<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-event-description'>
											EVENT DESCRIPTION
										</label>
										<textarea id='grid-event-description' rows={4} className='block p-2.5 w-96 text-base text-gray-700 rounded border border-slate-500 focus:ring-red-500 outline-none focus:border-red-500' placeholder='Write your description here' minLength={1} maxLength={1024} required {...register('description', { required: true })}></textarea>
									</div>
								</div>
								<div className='flex flex-wrap -mx-3 mb-2'>
									<div className='w-full h-full md:w-1/3 px-3 mb-6 md:mb-0'>
										<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-banner-url'>
											EVENT DAY
										</label>
										<SSRProvider>
											<DatePicker
												onChange={(date): void => setSelected(date!)}
												minValue={today(getLocalTimeZone())}
											/>
											<label className='mt-2 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-banner-url'>
											EVENT TIME
											</label>
											<TimeField
												flex={true}></TimeField>
										</SSRProvider>

										<div className="w-full">
											<p></p>
											{selected && selected.getUTCDate() ? (
												<p className="text-black">You picked {new DateFormatter('en-US').format(selected!)} at  {new Date().toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[2]}.</p>
											) : (
												<p className="text-black">Please select a day.</p>
											)}
										</div>
									</div>
								</div>
								<div>
									<button className='h-10 px-5 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800'>
										<input className='cursor-pointer' type='submit' value='Maak'></input>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				{message.text !== '' && (
					<Toast
						type={message.type}
						title={message.type[0].toUpperCase() + message.type.slice(1)}
						description={message.text}
					/>
				)}
			</Layout>
		</>
	);
};

export const getServerSideProps = withIronSessionSsr(async function ({ req, resolvedUrl }): Promise<AdminProps> {
	const user = req.session.user;

	if (user?.email) {
		const request = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/2fa/generate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		const json = await request.json();

		if (json.data) return {
			props: {
				user: { email: user.email, has2faEnabled: true, completed2fa: false },
				otpAuthUri: json.data,
			},
		};
		return {
			props: {
				user: { email: user.email, has2faEnabled: false, completed2fa: false },
				otpAuthUri: '',
			},
		};
	}

	if (!user) {
		return {
			props: {
				user: { email: '', has2faEnabled: false, completed2fa: false },
			},
			redirect: {
				destination: `/admin/login?from=${encodeURIComponent(resolvedUrl)}`,
				permanent: false,
			},
		};
	}

	if (!user.has2faEnabled) {
		return {
			props: {
				user: { email: user.email, has2faEnabled: false, completed2fa: false },
			},
			redirect: {
				destination: '/admin/settings',
				permanent: false,
			},
		};
	}

	return {
		props: { user: req.session.user },
	};
}, ironOptions);

export default AdminCreateProducts;