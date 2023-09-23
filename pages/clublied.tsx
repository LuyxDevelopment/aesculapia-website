import { NextPage } from 'next';
import { useMetaData } from '../lib/hooks/useMetaData';
import Layout from '../components/Layout';

const SongIndex: NextPage = () => {
	return (
		<>
			{useMetaData('Clublied', 'Clublied', '/song')}
			<Layout>
				<div className='m-5 text-center '>
					<h1 className='font-bold text-2xl'>
						Het clublied van Aesculapia wordt gezongen op de melodie van &apos;Het
						loze vissertje&apos;.
					</h1>
					<div className='flex flex-col justify-center'>
						<div className='my-5'>
							<p className='text-lg font-bold'>1.</p>
							<h1 className='text-md font-semibold'>
								Aesculapia moet marcheren,
							</h1>
							<h1 className='text-md font-medium'>
								De porren komen aan, ja aan.
							</h1>
							<h1 className='text-md font-medium'>
								Poepen zullen wij nooit verleren,
							</h1>
							<h1 className='text-md font-medium'>
								Want hij blijft altijd staan, ja staan.
							</h1>
						</div>
						<div className='my-5'>
							<p className='text-lg font-bold italic'>Refrein:</p>
							<h1 className='text-md font-semibold'>
								Met ons kapotje, met ons klein zotje,
							</h1>
							<h1 className='text-md font-medium'>
								En met de stoten van onze kloten.
							</h1>
							<h1 className='text-md font-medium'>
								Met onze knuppel kunnen wij je naar de hemel,
							</h1>
							<h1 className='text-md font-medium'>
								Ja, naar de hemel laten gaan
							</h1>
							<h1 className='text-md font-medium'>
								met onze knuppel kunnen wij je naar de hemel
							</h1>
							<h1 className='text-md font-medium'>
								ja, naar de hemel laten gaan
							</h1>
						</div>
						<div className='my-5'>
							<p className='text-lg font-bold'>2.</p>
							<h1 className='text-md font-semibold'>
								Wij weten niet van stoppen,
							</h1>
							<h1 className='text-md font-medium'>
								Wij weten niet van gaan, ja gaan.
							</h1>
							<h1 className='text-md font-medium'>
								Als &apos;t bier komt op de proppen,
							</h1>
							<h1 className='text-md font-medium'>
								Zijn wij niet weg te slaan, ja slaan.
							</h1>
						</div>
						<div className='my-5'>
							<p className='text-lg font-bold'>3.</p>
							<h1 className='text-md font-semibold'>
								Aesculapia moet studeren,
							</h1>
							<h1 className='text-md font-medium'>
								Dat hebben wij nooit gedaan, ja daan.
							</h1>
							<h1 className='text-md font-medium'>
								Welke prof zal ons dat leren,
							</h1>
							<h1 className='text-md font-medium'>
								Hij laat ons altijd staan, ja staan.
							</h1>
						</div>
					</div>
					<h1 className='my-5 text-xl font-bold ml-10'>
						Prosit Aesculapia{' '}
					</h1>
				</div>
			</Layout>
		</>
	);
};

export default SongIndex;