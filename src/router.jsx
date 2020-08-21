import React from 'react'
import {
	BrowserRouter,
	Switch,
	Route,
	Redirect,
	useLocation,
	Link
} from 'react-router-dom'
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
	const location = useLocation()
	const { formatMessage: f } = useIntl()
	const { pathname } = location
	const isBannerVisible =
		!user && pathname !== '/login' && pathname !== '/register'

	return (
		<>
			{isBannerVisible ? (
				<Banner title={f({ id: 'banners.register.title' })}>
					<span>
						{f({ id: 'banners.register.subtitle' })}{' '}
						<Link to='/register'>{f({ id: 'banners.register.link' })}</Link>
					</span>
				</Banner>
			) : null}
			<Switch location={location}>
				<Route path='/' exact>
					<Redirect to='/home' />
				</Route>
				{renderRoutes(routes, user)}
			</Switch>
		</>
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
