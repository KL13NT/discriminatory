import React from 'react'

const withStyles = styles => Component => {
	return function render(props) {
		const classNames = Object.keys(Component.propTypes).reduce((res, key) => {
			if (key.startsWith('_') && props[key]) return `${res} ${styles[key]}`
			return `${res}`
		}, '')

		return <Component {...props} className={classNames} />
	}
}

export default withStyles
