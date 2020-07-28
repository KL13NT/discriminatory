import React from 'react'
import PropTypes from 'prop-types'
import Container from '../Container/Container'

import { ReactComponent as Close } from '../../assets/x.svg'

import styles from './Overlay.module.sass'

function Overlay({ title, subtitle, children, onClose, ...props }) {
	return (
		<div className={styles.overlay} {...props}>
			<Container>
				<div className={styles.meta}>
					<div>
						<span>{title}</span>
						<span>{subtitle}</span>
					</div>
					<button aria-label='close overlay' onClick={onClose}>
						<Close />
					</button>
				</div>
				{children}
			</Container>
		</div>
	)
}

Overlay.proptypes = {
	title: PropTypes.node.isRequired,
	children: PropTypes.node.isRequired,
	onClose: PropTypes.func.isRequired
}

export default Overlay
