import React, { useEffect, useState } from 'react'
import create from 'zustand'

import styles from './Toast.module.sass'
import cls from '../../utils/cls'

import { ReactComponent as Close } from '../../assets/x.svg'

const [useToasts] = create(set => ({
	toasts: [],

	add: toast =>
		set(state => ({
			toasts: [...state.toasts, toast]
		})),

	remove: toast =>
		set(state => ({
			toasts: state.toasts.filter(t => t.text !== toast.text)
		}))
}))

function Toast({ type, text, remove }) {
	const [dismissed, setDismiss] = useState(false)
	const dismiss = () => remove({ text })

	useEffect(() => {
		setTimeout(() => {
			setDismiss(true)
			setTimeout(dismiss, 500)
		}, 3000)
	})

	return (
		<li
			key={text}
			className={cls(
				styles.toast,
				styles[type],
				dismissed ? styles.dismissed : null
			)}
		>
			{text}
			<button onClick={dismiss}>
				<Close />
			</button>
		</li>
	)
}

function ToastContainer() {
	const { toasts, remove } = useToasts()

	return (
		<div className={styles.container}>
			<ul>
				{toasts.map(toast => {
					return <Toast {...toast} key={toast.text} remove={remove} />
				})}
			</ul>
		</div>
	)
}

export { ToastContainer, useToasts }
