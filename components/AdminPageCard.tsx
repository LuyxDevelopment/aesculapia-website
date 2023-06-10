import { FC } from 'react';

interface Props {
	name: string;
	url: string;
	svg: string;
}

const AdminPageCard: FC<Props> = ({ name, url, svg }) => {
	return <>
		<div className='items-center flex justify-center flex-col bg-gray-200 p-4 rounded-lg shadow-md hover:scale-[1.04] transiton-all duration-[400ms] ease-in-out relative cursor-pointer' onClick={(): string => (window.location.href = url)}>
			<img className='w-24 rounded-lg transition-all duration-[400ms] ease-in-out p-4' draggable={false} src={svg} alt={name} width='128' height='128' />
			<h1 className='text-xl font-bold'>{name}</h1>
		</div>
	</>;
};

export default AdminPageCard;