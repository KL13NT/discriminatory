import React from 'react'
import {
	BrowserRouter,
	Switch,
	Route,
	Redirect,
	useLocation
} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Navbar from './components/Navbar/Navbar'

import routes from './config/routes'

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
	// const location = useLocation()

	return (
		// <TransitionGroup>
		// 	<CSSTransition key={location.key} classNames='fade' timeout={300}>
		<Switch>
			{renderRoutes(routes, user)}
			<Redirect from='/' to='/home' exact />
		</Switch>
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
