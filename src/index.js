import client from 'firebase'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { createClient, Provider } from 'urql'

import('./style/base.global.sass')

import Router from './router.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import { LoadingPage } from './components/Loading/LoadingPage.jsx'

import config from '../client.firebase.json'

client.initializeApp(config)
const graphql = createClient({ url: `http://${process.env.api}/graphql` })

const root = document.querySelector('#root')

if (process.env.NODE_ENV !== 'production') {
	const axe = require('react-axe')
	axe(React, ReactDOM, 1000)
}

class App extends React.Component {
	render() {
		return (
			<>
				<Provider value={graphql}>
					<Suspense fallback={<LoadingPage />}>
						<Router>{this.props.user ? <Navbar /> : null}</Router>
					</Suspense>
				</Provider>
			</>
		)
	}
}

ReactDOM.render(<App />, root)
