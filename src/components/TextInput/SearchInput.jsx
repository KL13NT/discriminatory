import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import TextInput from './TextInput'

import { FormattedMessage, useIntl } from 'react-intl'
import { ReactComponent as Search } from '../../assets/search.svg'

import styles from './SearchInput.module.sass'

import cls from '../../utils/cls'
import Container from '../Container/Container'

const SearchInput = () => {
	const { formatMessage: f } = useIntl('')

	const history = useHistory()
	const [query, setQuery] = useState('')
	const [classes, setclasses] = useState('')

	const onChange = e => {
		setQuery(e.target.value)
	}

	const onSubmit = e => {
		e.preventDefault()
		e.stopPropagation()

		history.push(`/search/?q=${query}`)
	}

	const onFocus = () => setclasses(styles.active)
	const onBlur = () => setclasses('')

	return (
		<Container className={cls(styles.search, classes)}>
			<form onFocus={onFocus} onBlur={onBlur} onSubmit={onSubmit}>
				<TextInput
					aria-label={f({ id: 'placeholders.search' })}
					name='query'
					icon={Search}
					onChange={onChange}
					maxLength={60}
					// eslint-disable-next-line jsx-a11y/tabindex-no-positive
					tabIndex={2}
					placeholder={f({ id: 'placeholders.search' })}
				/>
			</form>
			<div className='u-disclaimer'>
				<FormattedMessage id='search.tutorial' />
			</div>
			<div className='u-warn'>
				<FormattedMessage id='search.warning' />
			</div>
		</Container>
	)
}

export default SearchInput
