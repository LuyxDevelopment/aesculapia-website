import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface Props {
	children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
	return (
		<div className='flex flex-col h-screen'>
			<Navbar />
			<div className='flex-grow'>{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
