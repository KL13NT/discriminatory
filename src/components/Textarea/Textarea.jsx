import React from 'react'
import cls from '../../utils/cls'

import styles from './Textarea.module.sass'

// REFACTORME: move to utils
const resizeContainer = currentTarget => {
	const offset = currentTarget.offsetHeight - currentTarget.clientHeight

	event.target.style.height = 'auto'
	event.target.style.height = event.target.scrollHeight + offset + 'px'
}

function Textarea({ resize, children, className, onInput, ...props }) {
	const onInputHandler = e => {
		if (resize) resizeContainer(e.target)
		if (onInput) onInput(e)
	}
	return (
		<textarea
			className={cls(styles.textarea, className)}
			onInput={onInputHandler}
			{...props}
		>
			{children}
		</textarea>
	)
}

export default Textarea
