import React from 'react';
import { FC } from 'react';
import { ISponsor } from '../src/models/Sponsor';

interface Props {
	sponsor: ISponsor & { _id: string; };
}

const SponsorCard: FC<Props> = ({ sponsor }) => {
	return <>
		<div className='group bg-gray-200 p-4 rounded-lg shadow-md hover:scale-[1.04] transiton-all duration-[400ms] ease-in-out relative cursor-pointer' onClick={(): string => (window.location.href = sponsor.url)}>
			<img className='w-52 rounded-lg transition-all duration-[400ms] ease-in-out group-hover:shadow-md group-hover:scale-[]' draggable={false} src={sponsor.imageURL} alt={sponsor.name} width='256' height='256' />
			<h1 className='text-xl font-bold'>{sponsor.name}</h1>
		</div>
	</>;
};

export default SponsorCard;