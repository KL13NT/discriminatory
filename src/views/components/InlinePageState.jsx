import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

const InlinePageState = () => {
	return (
		<p>
			<FormattedMessage
				id='states.emptyfeed'
				values={{
					// eslint-disable-next-line react/display-name
					explore: chunks => <Link to='/explore'>{chunks}</Link>
				}}
			/>
		</p>
	)
}

export default InlinePageState
