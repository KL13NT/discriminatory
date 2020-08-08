import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { isLoggedIn } from './controllers/auth'

import routes from './config/routes'

export const PrivateRoute = ({ component: Component, ...rest }) => {
	console.log(rest)
	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route
			{...rest}
			render={props =>
				isLoggedIn() ? <Component {...props} /> : <Redirect to='/login' />
			}
		/>
	)
}

export const PublicRoute = ({
	component: Component,
	anonymousOnly,
	redirectTo,
	...rest
}) => {
	return (
		// restricted = false meaning public route
		// restricted = true meaning restricted route
		<Route
			{...rest}
			render={props =>
				isLoggedIn() && anonymousOnly ? (
					<Redirect to={redirectTo} />
				) : (
					<Component {...props} />
				)
			}
		/>
	)
}

export default class Router extends React.Component {
	render() {
		return (
			<BrowserRouter>
				{this.props.children}
				<Switch>
					{routes.map(route => {
						return (
							<Route
								path={route.path}
								key={route.path}
								component={route.component}
							/>
						)
					})}
				</Switch>
			</BrowserRouter>
		)
	}
}
