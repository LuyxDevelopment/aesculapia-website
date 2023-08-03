import { NextPage } from 'next';
import Layout from '../components/Layout';
import { useMetaData } from '../lib/hooks/useMetaData';
import Image from 'next/image';

const KnuppeltjePage: NextPage = () => {
	return (
		<Layout>
			{useMetaData('Knuppeltje', 'Knuppeltje', '/knuppeltje')}
			<div className='flex flex-col justify-center items-center m-12'>
				<Image
					className='rounded-lg drop-shadow-lg'
					src='/assets/beer.jpg'
					width={286}
					height={619}
					alt='Beer'
				/>
				<p className='mt-6 lg:w-1/3 text-lg font-semibold'>
					Het Knuppeltje is het studentenbier van Aesculapia. Dit kwaliteitsvolle, blonde bier heeft een heerlijke, fruitige smaak en bevat maar liefst 8%! Klinkt toch superlekker? Zelfs personen die bier niet lusten, waren positief over de smaak en de kwaliteit. Kom zeker eens proeven op 1 van onze evenementen!
				</p>
			</div>
		</Layout>
	);
};

export default KnuppeltjePage;