import React from 'react'

import { ReactComponent as Arrow } from '../../assets/arrow.svg'
import { ReactComponent as Report } from '../../assets/police-badge.svg'
import { ReactComponent as Delete } from '../../assets/delete.svg'
import { ReactComponent as Pin } from '../../assets/security-pin.svg'

import styles from './PostOptionsMenu.module.sass'

function PostOptionsMenu({
	onAction,
	onReport,
	onDelete,
	onPin,
	toggle,
	isMenuOpened
}) {
	return (
		<div>
			<button onClick={toggle} className={styles.menuToggle}>
				<Arrow alt='Post list icon' />
			</button>

			{isMenuOpened ? (
				<div className={styles.menu}>
					{onPin ? (
						<button onClick={e => onAction('pin', e)} className={styles.pin}>
							<Pin />
							<span>Pin this post to your profile</span>
						</button>
					) : null}
					{onDelete ? (
						<button
							onClick={e => onAction('delete', e)}
							className={styles.delete}
						>
							<Delete />
							<span>Delete post permanently</span>
						</button>
					) : null}
					{onReport ? (
						<button
							onClick={e => onAction('report', e)}
							className={styles.report}
						>
							<Report />
							<span>Report this post to support</span>
						</button>
					) : null}
				</div>
			) : null}
		</div>
	)
}

export default PostOptionsMenu
