import React from 'react'
import PropTypes from 'prop-types'

import styles from './PageTitle.module.sass'

function PageTitle({ children, subtitle, tick, ...props }) {
	return (
		<div className={styles.title} {...props}>
			<div>
				<h1>{children}</h1>
				{tick ? <span>{tick}</span> : null}
			</div>
			{subtitle ? <span>{subtitle}</span> : null}
		</div>
	)
}

const propTypes = {
	children: PropTypes.node.isRequired,
	subtitle: PropTypes.string,
	tick: PropTypes.string
}

const defaultProps = {}

PageTitle.defaultProps = defaultProps
PageTitle.propTypes = propTypes

export default PageTitle
