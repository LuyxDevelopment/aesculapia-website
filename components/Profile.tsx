import { FC } from 'react';
import Image from 'next/image';

export interface UserProfile {
	name: string;
	role: string;
	photo: string;
}

interface Props {
	profile: UserProfile;
}

const Profile: FC<Props> = ({ profile }) => {
	return (
		<div className='flex h-72 w-52 flex-col items-center justify-center rounded-lg shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-1 hover:scale-110'>
			<div>
				<Image
					className='rounded-full'
					src={profile.photo}
					width='175'
					height='175'
					alt={profile.name}
				/>
			</div>
			<h1 className='text-xl text-center pt-3 font-bold'>{profile.name}</h1>
			<p className='text-lg mt-1 font-semibold text-gray-700'>
				{profile.role}
			</p>
		</div>
	);
};

export default Profile;