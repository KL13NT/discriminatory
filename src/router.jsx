import React from 'react'
import {
	BrowserRouter,
	Switch,
	Route,
	Redirect,
	useLocation,
	Link
} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useIntl } from 'react-intl'

import Navbar from './components/Navbar/Navbar'

import routes from './config/routes'
import Banner from './components/Banner/Banner'

export const PrivateRoute = ({ component: Component, user, ...rest }) => {
	if (user) {
		if (user.emailVerified) return <Route component={Component} {...rest} />
		else return <Redirect to='/explore' />
	} else return <Redirect to='/login' />
}

export const SharedRoute = ({ component: Component, ...rest }) => {
	return <Route {...rest} component={Component} {...rest} />
}

export const AnonymousOnly = ({ component: Component, user, ...rest }) => {
	if (!user) return <Route component={Component} {...rest} />
	else return <Redirect to='/home' />
}

const renderRoutes = (routes, user) =>
	routes.map(route => {
		if (!route.private && !route.anonymousOnly)
			return <SharedRoute {...route} user={user} />
		else if (route.private) return <PrivateRoute {...route} user={user} />
		else if (route.anonymousOnly)
			return <AnonymousOnly {...route} user={user} />
	})

const AnimatedRoutes = ({ user }) => {
	const { pathname } = useLocation()
	const { formatMessage: f } = useIntl()
	const isBannerVisible =
		!user && pathname !== '/login' && pathname !== '/register'

	console.log(pathname)
	return (
		// <TransitionGroup>
		// 	<CSSTransition key={location.key} classNames='fade' timeout={300}>
		<>
			{isBannerVisible ? (
				<Banner size='big'>
					<h6>
						{f({ id: 'banners.register.title' })}{' '}
						<Link to='/register' style={{ color: 'var(--color-primary)' }}>
							{f({ id: 'banners.register.link' })}
						</Link>
					</h6>
					<span>{f({ id: 'banners.register.subtitle' })}</span>
				</Banner>
			) : null}
			<Switch>
				{renderRoutes(routes, user)}
				<Redirect from='/' to='/home' exact />
			</Switch>
		</>
		// 	</CSSTransition>
		// </TransitionGroup>
	)
}

export default function Router({ user }) {
	return (
		<BrowserRouter>
			<Navbar user={user} />
			<AnimatedRoutes user={user} />
		</BrowserRouter>
	)
}
