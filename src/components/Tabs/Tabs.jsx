import React from 'react'
import { Tabs as BuTabs, useTabState, usePanelState } from '@bumaga/tabs'

import cls from '../../utils/cls'

import styles from './Tabs.module.sass'

function Tabs({ children, ...props }) {
	return (
		<BuTabs {...props}>
			<div className={styles.tabs}>{children}</div>
		</BuTabs>
	)
}

function TabList({ children, ...props }) {
	return (
		<div className={styles['tab-list']} {...props}>
			{children}
		</div>
	)
}

function Tab({ children, ...props }) {
	const { onClick, isActive } = useTabState()

	return (
		<button
			className={cls(styles.tab, isActive ? styles.active : null)}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	)
}

function Panel({ children, ...props }) {
	const isActive = usePanelState()

	return isActive ? (
		<div className={styles.panel} {...props}>
			{children}
		</div>
	) : null
}

export { Tabs, Tab, Panel, TabList }
