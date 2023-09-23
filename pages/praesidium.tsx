import type { NextPage } from 'next';
import { useMetaData } from '../lib/hooks/useMetaData';
import Layout from '../components/Layout';
import Profile, { UserProfile } from '../components/Profile';

const people: UserProfile[] = [
	{
		name: 'Lena Ceulemans',
		role: 'Praeses',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Margot Dellaert',
		role: 'Vice-praeses',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Floris Van Hemel',
		role: 'Quaestor',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Noa van Mook',
		role: 'Cantor',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Siebe Van Poeyer',
		role: 'Schachtentemmer',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Dries Van der Paal',
		role: 'Zedenmeester',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Victor Van den Bosch',
		role: 'Feest',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Timo Dobbeleir',
		role: 'Feest',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Charlotte Breems',
		role: 'Cultuur',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Wout Van Opdenbosch',
		role: 'Media',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Stan Reijnen',
		role: 'P.R',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Fynn Hille',
		role: 'Sport',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Evy Janssens',
		role: 'Sport',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Adriana Dane',
		role: 'Scriptor',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Ilsa Bons',
		role: 'Mentor',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
];

const Praesidium: NextPage = () => {
	return (
		<>
			{useMetaData('Praesidium', 'Praesidium', '/praesidium')}
			<Layout>
				<div className='container mb-12'>
					<h1 className='text-5xl font-bold mb-5'>Praesidium</h1>
					<div className='my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-center space-y-3'>
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