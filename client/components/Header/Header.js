import Router from 'next/router';
import NProgress from 'nprogress';
import { HeaderStyle } from '../../styles/_index';
import Logo from './Logo';
import Navigation from './Navigation/Navigation';

const Header = () => {
	Router.events.on('routeChangeStart', () => NProgress.start());
	Router.events.on('routeChangeComplete', () => NProgress.done());
	Router.events.on('routeChangeError', () => NProgress.done());

	return (
		<HeaderStyle justifyContent="space-between">
			<Logo src="/site-logo.png" title="Foodies" />
			<Navigation />
		</HeaderStyle>
	);
};

export default Header;
