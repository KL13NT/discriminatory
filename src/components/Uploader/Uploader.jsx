import React from 'react'
import PropTypes from 'prop-types'

import styles from './Uploader.module.sass'
import Button from '../Button/Button'
import { useRef } from 'react'
import { useState } from 'react'
import cls from '../../utils/cls'
import { useEffect } from 'react'
import { useCallback } from 'react'

import { ReactComponent as Download } from '../../assets/direct-download.svg'
import { findParentByClass } from '../../utils/general'

/**
 * Returns an array of Files
 */
function Uploader({ onChange, name, ...props }) {
	const inputRef = useRef()
	const previewRef = useRef()
	const dropAreaRef = useRef()

	const [value, setValue] = useState([])

	const onClick = () => onBrowse()
	const onKeyDown = () => null
	const onBrowse = e => {
		if (e) preventDefaults(e)

		inputRef.current.click()
	}

	const preventDefaults = e => {
		e.preventDefault()
		e.stopPropagation()
	}

	const onDragOn = e => {
		preventDefaults(e)

		if (dropAreaRef.current) dropAreaRef.current.classList.add(styles.focus)
	}

	const onDragOff = e => {
		preventDefaults(e)

		if (!e.target || !findParentByClass(e.target, styles.uploader))
			if (dropAreaRef.current)
				dropAreaRef.current.classList.remove(styles.focus)
	}

	const previewFiles = useCallback(
		file => {
			const reader = new FileReader()

			reader.readAsDataURL(file)
			reader.onloadend = () => {
				previewRef.current.src = reader.result
			}
		},
		[previewRef]
	)

	const onDrop = e => {
		preventDefaults(e)

		if (dropAreaRef.current) dropAreaRef.current.classList.remove(styles.focus)

		const { dataTransfer } = e
		const { files } = dataTransfer

		setValue(files)
	}

	const onInputChange = () => {
		setValue(Array.from(inputRef.current.files))
	}

	useEffect(() => {
		if (value.length > 0) {
			previewFiles(value[0])
			onChange(value)
		}
	}, [value])

	return (
		<div
			role='button'
			tabIndex={0}
			ref={dropAreaRef}
			onKeyDown={onKeyDown}
			className={cls(styles.uploader)}
			onClick={onClick}
			onDragEnter={onDragOn}
			onDragOver={onDragOn}
			onDragLeave={onDragOff}
			onDragEnd={onDragOff}
			onDrop={onDrop}
		>
			<div>
				{value.length > 0 ? <p>{value[0].name}</p> : null}
				<p>Drag and Drop a file or </p>
				<Button variant='link' onClick={onBrowse}>
					Browse
				</Button>
			</div>

			<div>
				<p>Drop your files here</p>
				<Download />
			</div>

			<img src='' alt='preview' className={styles.preview} ref={previewRef} />

			<input
				type='file'
				id={name}
				name={name}
				ref={inputRef}
				onChange={onInputChange}
				{...props}
			/>
		</div>
	)
}

Uploader.propTypes = {
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired
}

export default Uploader