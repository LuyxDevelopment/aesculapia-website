import { FC, ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
	return (
		<div className="flex flex-col h-screen">
			{/* <Navbar /> */}
			<div className="flex-grow">{children}</div>
			{/* <Footer /> */}
		</div>
	);
};

export default Layout;
