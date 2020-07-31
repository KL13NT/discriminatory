import React from 'react'
import PropTypes from 'prop-types'
import Container from '../Container/Container'

import { ReactComponent as Close } from '../../assets/x.svg'

import styles from './Overlay.module.sass'
import cls from '../../utils/cls'

function Overlay({ title, subtitle, children, onClose, className, ...props }) {
	return (
		<div className={cls(styles.overlay, className)} {...props}>
			<Container>
				<div className={styles.meta}>
					<div>
						<span>{title}</span>
						<span>{subtitle}</span>
					</div>
					<button aria-label='close overlay' type='button' onClick={onClose}>
						<Close />
					</button>
				</div>
				{children}
			</Container>
		</div>
	)
}

Overlay.propTypes = {
	title: PropTypes.node.isRequired,
	children: PropTypes.node.isRequired,
	onClose: PropTypes.func.isRequired
}

export default Overlay
