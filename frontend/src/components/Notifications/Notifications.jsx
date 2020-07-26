import React from 'react'
import PropTypes from 'prop-types'

import { PageTitle } from '../PageTitle/PageTitle'



import MarkReadSVG from '../../assets/tick.svg'


import styles from './Notifications.module.sass'


const Notification = ({ campus, courseId, description, location, read }) => {
	const href = `/courses/@${courseId}/${location}`

	return (
		<a
			className={ styles.notificationCard }
			data-read={ read }
			href={ href }>
			<span>
				{ description }
			</span>
			<span>
				{ campus }
			</span>
		</a>
	)
}

/**
 * Use `Notifications` to display notifications
 */
const Notifications = ({ notifications, onMarkAsRead }) => {
	return(
		<div className={ styles.notificationsContainer }>
			<div>
				<PageTitle>Notifications</PageTitle>
				<button onClick={ onMarkAsRead }>
					<img alt='notification button' src={ MarkReadSVG }/>
				</button>
			</div>

			{
				notifications.map(notification  =>
					<Notification key={ notification.id } { ...notification }/>
				)
			}
		</div>
	)
}



const propTypes = {
	/** Array of notifications */
	notifications: PropTypes.array.isRequired,
	/** Handler for the `mark all as read` button */
	onMarkAsRead: PropTypes.func.isRequired,
	isFullPage: PropTypes.bool.isRequired
}

const defaultProps = {}

Notifications.propTypes = propTypes
Notifications.defaultProps = defaultProps


export { Notifications }