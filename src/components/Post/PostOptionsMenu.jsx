import React, { useEffect, useCallback } from 'react'

import { ReactComponent as Arrow } from '../../assets/arrow.svg'
import { ReactComponent as Report } from '../../assets/police-badge.svg'
import { ReactComponent as Delete } from '../../assets/delete.svg'
import { ReactComponent as Pin } from '../../assets/security-pin.svg'

import { useIntl } from 'react-intl'
import { useRef } from 'react'
import { useState } from 'react'

import styles from './PostOptionsMenu.module.sass'

import { findParentByRef } from '../../utils/general'

function PostOptionsMenu({ onReport, onDelete, onPin }) {
	const menuRef = useRef()
	const [isMenuOpened, toggle] = useState()
	const { formatMessage: f } = useIntl()

	const onClickOutside = useCallback(e => {
		if (
			!findParentByRef(e.target, menuRef) ||
			(findParentByRef(e.target, menuRef) && e.target.nodeName === 'BUTTON')
		) {
			toggle(false)
			document.removeEventListener('click', onClickOutside)
		}
	}, [])

	useEffect(() => {
		if (isMenuOpened) document.addEventListener('click', onClickOutside)
	}, [isMenuOpened, onClickOutside])

	const onToggle = () => toggle(!isMenuOpened)

	return (
		<div ref={menuRef}>
			<button onClick={onToggle} className={styles.menuToggle}>
				<Arrow alt={f({ id: 'postOptions.toggle' })} />
			</button>

			{isMenuOpened ? (
				<div className={styles.menu}>
					{!onPin && !onReport && !onDelete ? (
						<p>{f({ id: 'post.options.empty' })}</p>
					) : null}
					{onPin ? (
						<button onClick={onPin} className={styles.pin}>
							<Pin />
							<span>{f({ id: 'postOptions.pin' })}</span>
						</button>
					) : null}
					{onDelete ? (
						<button onClick={onDelete} className={styles.delete}>
							<Delete />
							<span>{f({ id: 'postOptions.delete' })}</span>
						</button>
					) : null}
					{onReport ? (
						<button onClick={onReport} className={styles.report}>
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
