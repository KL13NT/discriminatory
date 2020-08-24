import React from 'react'

import styles from './Errors.module.sass'
import { useIntl, FormattedMessage } from 'react-intl'
import Button from '../Button/Button'

export const Four0Four = () => {
	const { formatMessage: f } = useIntl()

	return (
		<div className={styles.page}>
			<span>404</span>
			<h1>{f({ id: 'pageerrors.404.title' })}</h1>
			<p>{f({ id: 'pageerrors.404.description' })}</p>
		</div>
	)
}

export class IntlErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = this.props || {
			hasError: false,
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
		const { error, hasError } = this.state

		if (hasError)
			return (
				<div className={styles.page}>
					<span>{error.code || 'BEEP_BOOP_ERROR'}</span>
					<h1>
						<FormattedMessage
							id='pageerrors.general.title'
							defaultMessage='Yikes, this is embarassing'
						/>{' '}
						<span
							role='img'
							aria-label={<FormattedMessage id='emojis.pleading' />}
						>
							&#129402;
						</span>
					</h1>
					<p>
						<FormattedMessage
							id='pageerrors.general.description'
							defaultMessage='Try double-checking or going back.'
						/>{' '}
						<span>
							<FormattedMessage
								id='pageerrors.general.subtitle'
								defaultMessage='We promise to fix it if you'
							/>{' '}
							<a href='/bug'>
								<FormattedMessage
									id='pageerrors.general.report'
									defaultMessage='report it'
								/>
							</a>
							!
						</span>
					</p>
					<Button onClick={reload}>
						<FormattedMessage id='actions.reload' />
					</Button>
				</div>
			)
		else return this.props.children
	}
}

export class ErrorBoundaryPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = this.props || {
			hasError: false,
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
		const { error, hasError } = this.state

		if (hasError)
			return (
				<div className={styles.page}>
					<span>{error.code || 'BEEP_BOOP_ERROR'}</span>
					<h1>
						Yikes, this is embarassing{' '}
						<span role='img' aria-label='Face with big pleading eyes'>
							&#129402;
						</span>
					</h1>
					<p>
						Try double-checking or going back.
						<span>
							We promise to fix it if you <a href='/bug'>report it</a>!
						</span>
					</p>
				</div>
			)
		else return this.props.children
	}
}
