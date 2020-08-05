import React from 'react'
import cls from '../../utils/cls'

import styles from './Textarea.module.sass'

function autoGrow(element) {
	const offset = element.offsetHeight - element.clientHeight

	element.style.height = 'auto'
	element.style.height = element.scrollHeight + offset + 'px'
}

function Textarea({ resize, children, className, onInput, ...props }) {
	const onInputHandler = e => {
		if (resize) autoGrow(e.target)
		onInput(e)
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
