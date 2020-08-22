import React from 'react'

const Home = React.lazy(() => import('../views/home'))
const Profile = React.lazy(() => import('../views/profile'))
const Explore = React.lazy(() => import('../views/explore'))
const Register = React.lazy(() => import('../views/register'))
const Login = React.lazy(() => import('../views/login'))
const Verify = React.lazy(() => import('../views/verify'))

import { Four0Four } from '../components/Errors/PageError'

const routes = [
	{
		path: '/home',
		name: 'Home',
		component: Home,
		private: true,
		anonymousOnly: false
	},
	{
		path: '/explore',
		name: 'Explore',
		component: Explore,
		private: false,
		anonymousOnly: false
	},
	// {
	// 	path: '/notifications',
	// 	name: 'Notifications',
	// 	component: () => 'Notifications',
	// 	private: true,
	// 	anonymousOnly: false
	// },
	{
		path: '/discriminators',
		name: 'Discriminators',
		component: () => 'discriminators',
		private: false,
		anonymousOnly: false
	},
	{
		path: '/search',
		name: 'Search',
		component: () => 'Search',
		private: true,
		anonymousOnly: false
	},
	{
		path: '/settings',
		name: 'Settings',
		component: () => 'Settings',
		private: false,
		anonymousOnly: false
	},
	{
		path: '/verify',
		name: 'Verify',
		component: Verify,
		private: false,
		anonymousOnly: true
	},

	{
		path: '/register', // Route path
		name: 'Register',
		component: Register,
		private: false, // Requires loggin in
		anonymousOnly: true // Whether path go home when login
	},

	{
		path: '/login',
		name: 'Login',
		component: Login,
		private: false,
		anonymousOnly: true
	},
	{
		path: '/:user_id',
		name: 'Profile',
		component: Profile,
		private: true,
		anonymousOnly: false,
		exact: true
	},
	{
		path: '*',
		name: '404',
		component: Four0Four,
		private: false,
		anonymousOnly: false,
		exact: true
	}
]

export default routes
