import React, { useEffect, useState } from 'react'

import { withA11y } from '@storybook/addon-a11y'

import { ToastContainer, useToasts } from './Toast.jsx'

export default {
	title: 'ToastContainer',
	decorators: [withA11y],
	component: ToastContainer
}

export const General = () => {
	const { add } = useToasts()
	const [n, setN] = useState(0)
	const toasts = [
		{ type: 'info', text: 'Hello!' + n },
		{ type: 'warn', text: 'Hello!' + n },
		{ type: 'danger', text: 'Hello!' + n },
		{ type: 'success', text: 'Hello!' + n }
	]

	useEffect(() => {
		add(toasts[Math.floor(Math.random() * toasts.length)])
	}, [n])

	return (
		<div>
			<button onClick={() => setN(n + 1)}>add</button>
			<ToastContainer />
		</div>
	)
}
