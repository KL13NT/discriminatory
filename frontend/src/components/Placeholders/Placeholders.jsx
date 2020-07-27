import React from 'react'

import { ReactComponent as PostPlaceholder } from '../../assets/placeholder_post.svg'

import styles from './Placeholders.module.sass'

const Post = () => {
	return (
		<div className={styles.container}>
			<PostPlaceholder />
		</div>
	)
}

const propTypes = {}

const defaultProps = {}

Post.propTypes = propTypes
Post.defaultProps = defaultProps

export { Post }
