import React from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import { useIntl } from 'react-intl'
import Composer from '../components/Composer/Composer'

function Home() {
	const { formatMessage: f } = useIntl()
	return (
		<>
			<PageTitle>{f({ id: 'home.title' })}</PageTitle>
			<Composer />
			{/* Post list goes here */}
		</>
	)
}

export default Home
