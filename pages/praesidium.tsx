import type { NextPage } from 'next';
import { useMetaData } from '../lib/hooks/useMetaData';
import Layout from '../components/Layout';
import Profile, { UserProfile } from '../components/Profile';

const people: UserProfile[] = [
	{
		name: 'Margot Dellaert',
		role: 'Praeses',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Noa van Mook',
		role: 'Vice - praeses bal',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Siebe Van Poeyer',
		role: 'Vice praeses ski',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Dries Van der Paal',
		role: 'Quaestor',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Stan Reijnen',
		role: 'Sport',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Nina Ramezani',
		role: 'Sport',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Eros BLoemen',
		role: 'Media',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Eline Derkoningen',
		role: 'Cultuur',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Silke Roymans',
		role: 'Ab-actis',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Maithé Hendricx',
		role: 'Scriptor',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Wout Van Opdenbosch',
		role: 'Feest',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Sterre Vanderghinste',
		role: 'Feest',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Xavier Bogman',
		role: 'Feest',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Floris Van Hemel',
		role: 'Schachtentemmer',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Fynn Hille',
		role: 'Zedenmeester',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Charlotte Peeters',
		role: 'Mentor',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Enya Moerbeek',
		role: 'Cantor',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Delano Creton',
		role: 'P.R.',
		photo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?description=foto`,
	},
	{
		name: 'Lena Ceulemans',
		role: 'Praegustator',
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