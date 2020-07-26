import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'


import styles from './UtilityBar.module.sass'


import NotificationsSVG from '../../assets/bell.svg'
import ThumbImg from '../../assets/73_thumb.jpg'


const UtilityBar = ({ name, thumbnail }) => {
	return(
		<nav className={ styles.utilityContainer }>
			<NavLink aria-label="Notifications" to='/notifications'>
				<img alt='Go to notifications' src={ NotificationsSVG }/>
			</NavLink>
			<NavLink aria-label="User Profile" to='/profile/@me'>
				<img alt='Go to your profile' src={ thumbnail }/>
				<span>
					Hi, { name.split(' ')[0] }
				</span>
			</NavLink>
		</nav>
	)
}


const propTypes = {
	name: PropTypes.string.isRequired,
	thumbnail: PropTypes.string
}
const defaultProps = {
	thumbnail: ThumbImg
}

UtilityBar.propTypes = propTypes
UtilityBar.defaultProps = defaultProps

export { UtilityBar }