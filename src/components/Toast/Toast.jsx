import React from 'react'
import create from 'zustand'

import styles from './Toast.module.sass'
import cls from '../../utils/cls'

import { ReactComponent as Close } from '../../assets/x.svg'
import { useCallback } from 'react'

const [useToasts] = create(set => ({
	toasts: [],

	add: toast =>
		set(state => {
			if (state.toasts.find(t => t.id === toast.text)) return state

			return {
				toasts: [
					...state.toasts,
					{
						text: toast.text,
						id: toast.text,
						type: toast.type,
						timeout: setTimeout(() => state.remove(toast.text), 5000)
					}
				]
			}
		}),

	remove: id =>
		set(state => {
			const found = state.toasts.find(toast => toast.id === id)
			clearTimeout(found.timeout)

			return {
				toasts: state.toasts.filter(toast => toast.id !== id)
			}
		})
}))

function Toast({ type, text, id, remove }) {
	const dismiss = useCallback(() => {
		remove(id)
	}, [remove, id])

	return (
		<li key={text} className={cls(styles.toast, styles[type])}>
			{text}
			<button aria-label='Dismiss notification' onClick={dismiss}>
				<Close />
			</button>
		</li>
	)
}

function ToastContainer() {
	const { toasts, remove } = useToasts()

	if (toasts.length === 0) return null
	return (
		<div className={styles.container}>
			<ul>
				{Object.values(toasts).map(toast => {
					return <Toast {...toast} key={toast.id} remove={remove} />
				})}
			</ul>
		</div>
	)
}

export { ToastContainer, useToasts }
