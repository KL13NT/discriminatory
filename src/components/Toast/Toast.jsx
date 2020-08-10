import React, { useEffect, useState } from 'react'
import create from 'zustand'

import styles from './Toast.module.sass'
import cls from '../../utils/cls'

import { ReactComponent as Close } from '../../assets/x.svg'
import { useRef } from 'react'
import { useCallback } from 'react'

const [useToasts] = create(set => ({
	toasts: {},

	add: toast =>
		set(state => ({
			toasts: { ...state.toasts, [toast.text]: toast }
		})),

	remove: toast =>
		set(state => {
			const newState = { toasts: { ...state.toasts } }
			delete newState.toasts[toast.text]

			return newState
		})
}))

function Toast({ type, text, remove }) {
	const [dismissed, setDismiss] = useState(false)
	const styleTimeout = useRef(null)
	const dismissTimeout = useRef(null)

	const dismiss = useCallback(() => {
		clearTimeout(styleTimeout.current)
		clearTimeout(dismissTimeout.current)

		remove({ text })
	}, [remove, text])

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
			<button onClick={dismiss}>
				<Close />
			</button>
			<div className={styles.progress}></div>
		</li>
	)
}

function ToastContainer() {
	const { toasts, remove } = useToasts()

	return (
		<div className={styles.container}>
			<ul>
				{Object.values(toasts).map((toast, index) => {
					return <Toast {...toast} key={toast.text + index} remove={remove} />
				})}
			</ul>
		</div>
	)
}

export { ToastContainer, useToasts }
