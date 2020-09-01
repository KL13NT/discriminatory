import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, useLocation } from 'react-router-dom'

import Banner from '../../components/Banner/Banner'
import { useAuth } from '../../stores/auth'

export default function BannerController() {
	//TODO: add banner fetching logic

	const { user } = useAuth()
	const { pathname } = useLocation()
	const register = !user && pathname !== '/login' && pathname !== '/register'

	return <>{register ? <RegisterBanner /> : null}</>
}

function RegisterBanner() {
	return (
		<Banner size='big' title={<FormattedMessage id='banners.register.title' />}>
			<span>
				<FormattedMessage id='banners.register.subtitle' />{' '}
				<Link to='/register'>
					<FormattedMessage id='banners.register.link' />
				</Link>
			</span>
		</Banner>
	)
}
