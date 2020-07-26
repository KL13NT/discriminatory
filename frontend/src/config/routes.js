import React from 'react'
import { Redirect } from 'react-router-dom'

const routes = [
	{
		path: '/register', // Route path
		name: 'Register',
		component: () => 'Register',
		requiresLogin: false, // Requires loggin in
		anonymousOnly: true, // Whether path go home when login
		redirectTo: '/'
	},
	{
		path: '/login',
		name: 'Login',
		component: () => 'Login',
		requiresLogin: false,
		anonymousOnly: true,
		redirectTo: '/'
	},

	{
		path: '/home',
		name: 'Home',
		component: () => 'Home',
		requiresLogin: true,
		anonymousOnly: false,
		redirectTo: '/register',
		exact: true
	},
	{
		path: '/explore',
		name: 'Explore',
		component: () => 'Explore',
		requiresLogin: false,
		anonymousOnly: false,
		redirectTo: null
	},
	{
		path: '/notifications',
		name: 'Notifications',
		component: () => 'Notifications',
		requiresLogin: true,
		anonymousOnly: false,
		redirectTo: '/register'
	},

	{
		path: '/discriminators',
		name: 'Discriminators',
		component: () => 'discriminators',
		requiresLogin: false,
		anonymousOnly: false,
		redirectTo: null
	},
	{
		path: '/verify/:pathken',
		name: 'Verify',
		component: () => 'Verify',
		requiresLogin: false,
		anonymousOnly: true,
		redirectTo: '/'
	},
	{
		path: '/search',
		name: 'Search',
		component: () => 'Search',
		requiresLogin: false,
		anonymousOnly: false,
		redirectTo: null
	},
	{
		path: '/settings',
		name: 'Settings',
		component: () => 'Settings',
		requiresLogin: false,
		anonymousOnly: false,
		redirectTo: '/'
	},
	{
		path: '/:user_id',
		name: 'Profile',
		component: () => 'Profile',
		requiresLogin: false,
		anonymousOnly: false,
		redirectTo: null
	},
	{
		path: '/',
		name: 'Home Redirect',
		// eslint-disable-next-line react/display-name
		component: () => <Redirect to='/home' />,
		requiresLogin: false,
		anonymousOnly: false,
		redirectTo: '/register',
		exact: true
	}
]

export default routes
