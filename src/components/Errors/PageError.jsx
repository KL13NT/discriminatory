import React from 'react'

import styles from './Errors.module.sass'

class PageError extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hasError: true,
			error: null
		}
	}

	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			error
		}
	}

	render() {
		if (this.state.hasError)
			return (
				<div className={styles.page}>
					<span>{this.state.error ? this.state.error.code : 404}</span>
					<h1>Yikes, this is embarassing</h1>
					<p>
						Try double-checking or going back. If this persists{' '}
						<a href='/contact'>contact us</a>.
					</p>
				</div>
			)

		return this.props.children
	}
}

export default PageError
