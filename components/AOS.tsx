import { useEffect, ReactNode, FC } from 'react';

export interface Props {
	// left-right | right-left | top-bottom | bottom-top
	dir: 'lr' | 'rl' | 'tb' | 'bt';
	children: ReactNode;
}

const AOS: FC<Props> = ({ dir, children }) => {
	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add(`show-aos-${dir}`);
				} else {
					entry.target.classList.remove(`show-aos-${dir}`);
				}
			});
		});
		const hidden = document.querySelectorAll(`.hidden-aos-${dir}`);
		hidden.forEach((el) => observer.observe(el));
	}, []);

	return <div className={`hidden-aos-${dir}`}>{children}</div>;
};

export default AOS;
