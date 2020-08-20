import React from 'react'

import { ReactComponent as Arrow } from '../../assets/arrow.svg'
import { ReactComponent as Report } from '../../assets/police-badge.svg'
import { ReactComponent as Delete } from '../../assets/delete.svg'
import { ReactComponent as Pin } from '../../assets/security-pin.svg'

import styles from './PostOptionsMenu.module.sass'
import { useIntl } from 'react-intl'

function PostOptionsMenu({
	onAction,
	onReport,
	onDelete,
	onPin,
	toggle,
	isMenuOpened
}) {
	const { formatMessage: f } = useIntl()

	return (
		<div>
			<button onClick={toggle} className={styles.menuToggle}>
				<Arrow alt={f({ id: 'postOptions.toggle' })} />
			</button>

			{isMenuOpened ? (
				<div className={styles.menu}>
					{onPin ? (
						<button onClick={e => onAction('pin', e)} className={styles.pin}>
							<Pin />
							<span>{f({ id: 'postOptions.pin' })}</span>
						</button>
					) : null}
					{onDelete ? (
						<button
							onClick={e => onAction('delete', e)}
							className={styles.delete}
						>
							<Delete />
							<span>{f({ id: 'postOptions.delete' })}</span>
						</button>
					) : null}
					{onReport ? (
						<button
							onClick={e => onAction('report', e)}
							className={styles.report}
						>
							<Report />
							<span>{f({ id: 'postOptions.report' })}</span>
						</button>
					) : null}
				</div>
			) : null}
		</div>
	)
}

export default PostOptionsMenu
