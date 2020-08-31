import React from 'react'

import Button from '../Button/Button'

import { useIntl, FormattedMessage } from 'react-intl'

import styles from './Errors.module.sass'

export const PageState = ({ code, title, subtitle }) => {
	return (
		<div className={styles.inlinePage}>
			{code ? <span>{code}</span> : null}
			<h1>{title || <FormattedMessage id='errors.general.title' />}</h1>
			<p>{subtitle || <FormattedMessage id='errors.general.description' />}</p>
		</div>
	)
}

export const Four0Four = () => {
	const { formatMessage: f } = useIntl()

	return (
		<PageState
			code='404'
			title={f({ id: 'errors.404.title' })}
			subtitle={f({ id: 'errors.404.description' })}
		/>
	)
}

export class IntlErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hasError: false,
			error: null
		}
	}

	static getDerivedStateFromError(error) {
		console.log(error)
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
							id='errors.general.title'
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
							id='errors.general.description'
							defaultMessage='Try double-checking or going back.'
						/>{' '}
					</p>
					<Button small onClick={() => location.reload(false)}>
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
		this.state = {
			hasError: false,
			error: null
		}
	}

	static getDerivedStateFromError(error) {
		console.log(error)
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
					<p>Try double-checking or going back.</p>
					<Button small onClick={() => location.reload(false)}>
						<FormattedMessage id='actions.reload' />
					</Button>
				</div>
			)
		else return this.props.children
	}
}
