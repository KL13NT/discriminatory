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

import routes from './config/routes'
import Banner from './components/Banner/Banner'
import Layout from './views/components/Layout'

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
				<Banner title={f({ id: 'banners.register.title' })}>
					<span>
						{f({ id: 'banners.register.subtitle' })}{' '}
						<Link to='/register'>{f({ id: 'banners.register.link' })}</Link>
					</span>
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
			<Layout user={user}>
				<AnimatedRoutes user={user} />
			</Layout>
		</BrowserRouter>
	)
}
