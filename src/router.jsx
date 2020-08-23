import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import routes from './config/routes'
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
	return (
		<Switch location={location}>
			<Route path='/' exact>
				<Redirect to='/home' />
			</Route>
			<Layout user={user}>
				{renderRoutes(
					routes.filter(route => route.hasLayout),
					user
				)}
			</Layout>
			{renderRoutes(
				routes.filter(route => !route.hasLayout),
				user
			)}
		</Switch>
	)
}

export default function Router({ user }) {
	return (
		<BrowserRouter>
			<AnimatedRoutes user={user} />
		</BrowserRouter>
	)
}
