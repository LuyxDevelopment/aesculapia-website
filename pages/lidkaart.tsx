import { NextPage } from 'next';
import Layout from '../components/Layout';
import { useMetaData } from '../lib/hooks/useMetaData';

const Lidkaart: NextPage = () => {
	return (
		<Layout>
			{useMetaData('Lidkaart', 'Lidkaart', '/lidkaart')}
			<div className='container m-12'>
				<h1 className='text-5xl font-bold mb-5'>Lidkaart</h1>
				<p className='text-2xl mb-5'>
					Wil je lid worden van onze fantastische vereniging?
					Ga dan naar onze webshop en schaf jezelf een lidmaatschap aan!
				</p>
				<p className='text-2xl'>
					Twijfel je nog?
					Hier nog eens alle voordelen die je uit een lidmaatschap haalt.
				</p>
				<ul className='mb-5 text-lg'>
					<li>
						⁃	Korting bij onze events
					</li>
					<li>
						⁃	Voorrang bij bepaalde van onze events
					</li>
					<li>
						⁃	Toegang tot onze exclusieve survivalgidsen
					</li>
					<li>
						⁃	Blijf up to date via onze ledenmails
					</li>
					<li>
						⁃	Unieke kans om jouw netwerk uit te breiden
					</li>
					Dit alles voor maar 10 euro!
				</ul>

				<h2 className='text-2xl'>
					Wanneer je een lidmaatschap van Aesculapia aankoopt, verklaar je jezelf akkoord met volgende voorwaarden:
				</h2>
				<ul className='text-lg'>
					<li>⁃	Het is verboden om documenten van Aesculapia (waaronder onze Survivalgids) naar niet-leden door te sturen.</li>
					<li>⁃	GDPR; Uw persoonlijke gegevens zullen alleen gebruikt worden voor de registratie van het lidmaatschap. De gegevens zullen bewaard worden zolang u lid bent en zal NIET verstrekt worden aan derden.</li>
				</ul>
			</div>
		</Layout>
	);
};

export default Lidkaart;