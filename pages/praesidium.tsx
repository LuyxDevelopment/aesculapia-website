import type { NextPage } from 'next';
import { useMetaData } from '../lib/hooks/useMetaData';
import Layout from '../components/Layout';
import Profile, { UserProfile } from '../components/Profile';

const people: UserProfile[] = [
	{
		name: 'Lena Ceulemans',
		role: 'Praeses',
		photo: 'http://localhost:3000/api/og?description=foto',
	},
	{
		name: 'Margot Dellaert',
		role: 'Vice-praeses',
		photo: 'http://localhost:3000/api/og?description=foto',
	},
	{
		name: 'Floris Van Hemel',
		role: 'Quaestor',
		photo: 'http://localhost:3000/api/og?description=foto',
	},
	{
		name: 'Noa van Mook',
		role: 'Cantor',
		photo: 'http://localhost:3000/api/og?description=foto',
	},
	{
		name: 'Siebe Van Poeyer',
		role: 'Schachtentemmer',
		photo: 'http://localhost:3000/api/og?description=foto',
	},
	{
		name: 'Dries Van der Paal',
		role: 'Zedenmeester',
		photo: 'http://localhost:3000/api/og?description=foto',
	},
	{
		name: 'Victor Van den Bosch',
		role: 'Feest',
		photo: 'http://localhost:3000/api/og?description=foto',
	},
	{
		name: 'Timo Dobbeleir',
		role: 'Feest',
		photo: 'http://localhost:3000/api/og?description=foto',
	},
	{
		name: 'Charlotte Breems',
		role: 'Cultuur',
		photo: 'http://localhost:3000/api/og?description=foto',
	},
	{
		name: 'Wout Van Opdenbosch',
		role: 'Media',
		photo: 'http://localhost:3000/api/og?description=foto',
	},
	{
		name: 'Stan Reijnen',
		role: 'P.R',
		photo: 'http://localhost:3000/api/og?description=foto',
	},
	{
		name: 'Fynn Hille',
		role: 'Sport',
		photo: 'http://localhost:3000/api/og?description=foto',
	},
	{
		name: 'Evy Janssens',
		role: 'Sport',
		photo: 'http://localhost:3000/api/og?description=foto',
	},
	{
		name: 'Adriana Dane',
		role: 'Scriptor',
		photo: 'http://localhost:3000/api/og?description=foto',
	},
	{
		name: 'Ilsa Bons',
		role: 'Mentor',
		photo: 'http://localhost:3000/api/og?description=foto',
	},
];

const Praesidium: NextPage = () => {
	return (
		<>
			{useMetaData('Aesculapia | Praesidium', 'Praesidium', '/praesidium')}
			<Layout>
				<div className='container mb-12'>
					<h1 className='text-5xl font-bold mb-5'>Praesidium</h1>
					<div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 place-items-center space-y-3">
						{people.map((person, i) => {
							return (
								<Profile
									profile={person}
									key={i}
								/>
							);
						})}
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Praesidium;
