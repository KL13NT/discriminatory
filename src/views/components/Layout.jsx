import React, { useState } from 'react'

import styles from './Layout.module.sass'
import Ads from '../../components/Ads/Ads'
import Navbar from '../../components/Navbar/Navbar'
import TextInput from '../../components/TextInput/TextInput'

import { ReactComponent as Search } from '../../assets/search.svg'
import { useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

const SearchInput = () => {
	const [query, setQuery] = useState('')
	const [classes, setclasses] = useState('')
	const history = useHistory()

	const onChange = e => {
		setQuery(e.target.value)
	}

	const onSubmit = e => {
		e.preventDefault()
		e.stopPropagation()

		history.push(`search/?q=${query}`)
	}

	const onFocus = () => setclasses('search-active')
	const onBlur = () => setclasses('')

	return (
		<form onFocus={onFocus} onBlur={onBlur} onSubmit={onSubmit}>
			<TextInput
				name='query'
				icon={Search}
				onChange={onChange}
				maxLengh='60'
				placeholder='Search...'
			/>
			<div>
				<FormattedMessage id='search.tutorial' />
			</div>
		</form>
	)
}

function Layout({ children, user }) {
	return (
		<div className={styles.layout}>
			<div className={styles.left}>
				<Navbar user={user} />
			</div>

			<div className={styles.content}>{children}</div>

			<div className={styles.right}>
				<SearchInput />
				<Ads />
				{/* search and ads go here */}
			</div>
		</div>
	)
}

export default Layout
