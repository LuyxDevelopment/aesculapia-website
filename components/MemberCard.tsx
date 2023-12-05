import { FC } from 'react';
import { IMember } from '../src/models/Member.js';

const MemberCard: FC<{ member: IMember; }> = ({ member }) => {
	return (
		<div className='group bg-red-500 rounded-md shadow-lg p-4 w-72 h-72 text-xl'>
			<p><span className='font-bold'>Naam:</span> {member.name}</p>
			<p><span className='font-bold'>E-mail:</span> {member.email}</p>
			<p><span className='font-bold'>Lidnummer:</span> {member.memberId}</p>
			<p><span className='font-bold'>Betaalwijze:</span> {member.paymentMethod}</p>
			<p><span className='font-bold'>LDC:</span> {member.ldc}</p>
		</div>
	);
};

export default MemberCard;