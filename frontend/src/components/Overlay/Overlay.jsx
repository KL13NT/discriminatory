import React from 'react'
import PropTypes from 'prop-types'
import Container from '../Container/Container'

import { ReactComponent as Close } from '../../assets/x.svg'

import styles from './Overlay.module.sass'

function Overlay({ children, onClose }) {
	return (
		<div className={styles.overlay}>
			<Container>
				<button aria-label='close overlay' onClick={onClose}>
					<Close />
				</button>
				{children}
			</Container>
		</div>
	)
}

Overlay.proptypes = {
	children: PropTypes.node.isRequired,
	onClose: PropTypes.func.isRequired
}

export default Overlay
