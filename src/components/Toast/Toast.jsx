import React, { useEffect, useState } from 'react'
import create from 'zustand'

import styles from './Toast.module.sass'
import cls from '../../utils/cls'

import { ReactComponent as Close } from '../../assets/x.svg'
import { useRef } from 'react'
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
						type: toast.type
					}
				]
			}
		}),

	remove: id =>
		set(state => ({
			toasts: state.toasts.filter(toast => toast.id !== id)
		}))
}))

function Toast({ type, text, id, remove }) {
	const [dismissed, setDismiss] = useState(false)
	const styleTimeout = useRef(null)
	const dismissTimeout = useRef(null)

	const dismiss = useCallback(() => {
		clearTimeout(styleTimeout.current)
		clearTimeout(dismissTimeout.current)

		remove(id)
	}, [remove, id])

	useEffect(() => {
		styleTimeout.current = setTimeout(() => {
			setDismiss(true)
			dismissTimeout.current = setTimeout(dismiss, 500)
		}, 5000)
	}, [dismiss])

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
			<button aria-label='Dismiss notification' onClick={dismiss}>
				<Close />
			</button>
			<div className={styles.progress}></div>
		</li>
	)
}

function ToastContainer() {
	const { toasts, remove } = useToasts()

	// if (toasts.length === 0) return null
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
