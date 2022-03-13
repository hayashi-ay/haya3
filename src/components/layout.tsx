import Footer from '@/organism/footer'
import { ReactElement } from 'react';
import Header from './organism/header';

type LayoutProps = Required<{
	readonly children: ReactElement
}>

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Header></Header>
			<main>{children}</main>
			<Footer></Footer>
		</>
	)
}

export default Layout;
