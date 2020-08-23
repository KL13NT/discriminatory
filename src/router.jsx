import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Layout from './views/components/Layout'
import BannerController from './views/controllers/BannerController'
import { Four0Four } from './components/Errors/PageError'

const Home = React.lazy(() => import('./views/home'))
const Profile = React.lazy(() => import('./views/profile'))
const Explore = React.lazy(() => import('./views/explore'))
const Register = React.lazy(() => import('./views/register'))
const Login = React.lazy(() => import('./views/login'))
const Verify = React.lazy(() => import('./views/verify'))

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

function Router({ user }) {
	return (
		<BrowserRouter>
			<Switch>
				{/* <Redirect from='/' to='/home' exact /> */}

				<AnonymousOnly component={Login} path='/login' user={user} />
				<PrivateRoute component={Verify} path='/verify' user={user} />
				<AnonymousOnly component={Register} path='/register' user={user} />
				<Route>
					<Layout user={user}>
						<Switch>
							<PrivateRoute component={Home} path='/home' user={user} />
							<SharedRoute component={Explore} path='/explore' user={user} />
							<SharedRoute
								component={() => 'search'}
								path='/search'
								user={user}
							/>
							<SharedRoute
								component={() => 'disc'}
								path='/discriminators'
								user={user}
							/>
							<PrivateRoute
								component={() => 'Settings'}
								path='/settings'
								user={user}
							/>
							<PrivateRoute component={Profile} path='/:user_id' user={user} />
						</Switch>
					</Layout>
				</Route>

				<Route path='*' component={Four0Four} exact />
			</Switch>
			<BannerController />
		</BrowserRouter>
	)
}

export default Router
