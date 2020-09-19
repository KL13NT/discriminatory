import React from 'react'
import {
	useIntl,
	FormattedMessage,
	FormattedPlural,
	FormattedNumber
} from 'react-intl'

export const IntlPlural = ({ value, localeContainId }) => {
	const { formatMessage: f } = useIntl()

	const zero = f({ id: `${localeContainId}.zero` })
	const one = f({ id: `${localeContainId}.one` })
	const two = f({ id: `${localeContainId}.two` })
	const few = f({ id: `${localeContainId}.few` })
	const many = f({ id: `${localeContainId}.many` })
	const other = f({ id: `${localeContainId}.other` })

	return (
		<>
			{value === 0 ? (
				<FormattedMessage id='numbers.zero' />
			) : (
				<FormattedNumber value={value} />
			)}{' '}
			<FormattedPlural
				value={value}
				zero={zero}
				one={one}
				two={two}
				other={other}
				few={few}
				many={many}
			/>
		</>
	)
}
