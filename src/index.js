import React from 'react'
import ReactDOM from 'react-dom'

import Router from './router.jsx'
import Navbar from './components/Navbar/Navbar.jsx'

import('./style/base.global.sass')

const root = document.querySelector('#root')

if (process.env.NODE_ENV !== 'production') {
	const axe = require('react-axe')
	axe(React, ReactDOM, 1000)
}

class App extends React.Component {
	render() {
		return (
			<>
				<Router>
					<Navbar />
				</Router>
			</>
		)
	}
}

ReactDOM.render(<App />, root)
