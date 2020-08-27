import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Layout from './views/components/Layout'
import BannerController from './views/controllers/BannerController'

import { Four0Four } from './components/Errors/PageError'
import {
	Basics,
	Display,
	Ads,
	Profile as ProfileSettings,
	Settings
} from './views/settings'

const Home = React.lazy(() => import('./views/home'))
const Profile = React.lazy(() => import('./views/profile'))
const Explore = React.lazy(() => import('./views/explore'))
const Register = React.lazy(() => import('./views/register'))
const Login = React.lazy(() => import('./views/login'))
const Verify = React.lazy(() => import('./views/verify'))
const Search = React.lazy(() => import('./views/search'))
const Post = React.lazy(() => import('./views/post'))

export const PrivateRoute = ({
	component: Component,
	user,
	profile,
	...rest
}) => {
	if (user) {
		if (user.emailVerified && profile)
			return <Route component={Component} {...rest} />
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

function Router({ user, profile }) {
	return (
		<BrowserRouter>
			<Switch>
				<Redirect from='/' to='/home' exact />
				<Redirect from='/settings' to='/settings/basics' exact />

				<AnonymousOnly component={Login} path='/login' user={user} exact />
				<PrivateRoute component={Verify} path='/verify' user={user} exact />
				<AnonymousOnly
					component={Register}
					path='/register'
					user={user}
					exact
				/>
				<Route>
					<Layout user={user}>
						<Switch>
							<PrivateRoute
								component={Home}
								path='/home'
								user={user}
								profile={profile}
								exact
							/>
							<SharedRoute component={Explore} path='/explore' user={user} />

							<SharedRoute path='/settings' user={user}>
								<Settings />
								<Switch>
									<SharedRoute
										path='/settings/basics'
										component={Basics}
										user={user}
										exact
									/>
									<PrivateRoute
										path='/settings/profile'
										component={ProfileSettings}
										user={user}
										profile={profile}
										exact
									/>
									<SharedRoute
										path='/settings/display'
										component={Display}
										user={user}
										exact
									/>
									<SharedRoute
										path='/settings/ads'
										component={Ads}
										user={user}
										exact
									/>
								</Switch>
							</SharedRoute>
							<PrivateRoute
								component={Search}
								path='/search'
								user={user}
								profile={profile}
								exact
							/>
							<PrivateRoute
								component={Profile}
								path='/:user_id'
								user={user}
								profile={profile}
								exact
							/>
							<SharedRoute
								component={Post}
								path='/:user_id/:post'
								user={user}
								profile={profile}
								exact
							/>
							<Route component={Four0Four} />
						</Switch>
					</Layout>
				</Route>
			</Switch>
			<BannerController />
		</BrowserRouter>
	)
}

export default Router
