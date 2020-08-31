import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import styles from './Select.module.sass'
import cls from '../../utils/cls'

import { ReactComponent as Arrow } from '../../assets/chev.svg'
import { ReactComponent as X } from '../../assets/xd.svg'
import { findParentByClass } from '../../utils/general'

const isDownArrow = key => key === 40
const isUpArrow = key => key === 38
const isEnter = key => [0, 32, 13].some(code => key === code)
const isEscape = key => key === 27

const isKeyRecognized = key =>
	isUpArrow(key) || isDownArrow(key) || isEnter(key) || isEscape(key)

const focusSibling = (dir, currentTarget) =>
	dir === 'prev' && currentTarget.previousSibling
		? currentTarget.previousSibling.focus()
		: dir === 'next' && currentTarget.nextSibling
		? currentTarget.nextSibling.focus()
		: null

const Icon = ({ icon, name }) => (
	<img className={styles.icon} src={icon} alt={name} />
)

// eslint-disable-next-line react/display-name
const Option = React.forwardRef((props, ref) => {
	const { option, onPick, selected, ...rest } = props
	const { value, name, icon } = option

	const onClick = () => onPick(option)
	const onKeyDown = e => {
		e.persist()

		const { currentTarget, keyCode } = e

		if (isKeyRecognized(keyCode)) {
			e.preventDefault()

			if (isDownArrow(keyCode)) focusSibling('next', currentTarget)
			else if (isUpArrow(keyCode)) focusSibling('prev', currentTarget)
			else if (isEnter(keyCode)) onPick(option)
		}
	}

	return (
		<li
			role='menuitem'
			tabIndex='0'
			className={styles.option}
			id={value}
			onClick={onClick}
			onKeyDown={onKeyDown}
			data-selected={selected}
			data-value={value}
			ref={ref}
			{...rest}
		>
			{icon ? <Icon {...option} /> : null}
			{name}
		</li>
	)
})

function Select(props) {
	const {
		className,
		disabled,
		options,
		onChange,
		defaultValue,
		canBeNull,
		minimalist
	} = props
	const [selected, select] = useState(!canBeNull ? options[defaultValue] : null)
	const [expander, setExpander] = useState('mouse')
	const [expanded, expand] = useState(null)

	const firstElement = useRef()
	const container = useRef()

	const clearSelection = () => select(null)
	const onClick = () => {
		if (!expanded) setExpander('mouse')
		expand(!expanded)
	}
	const onPick = option => {
		select(option)
		expand(false)
		if (onChange) onChange(option)
	}
	const onOutsideClick = e => {
		if (!findParentByClass(e.target, styles.select)) {
			expand(false)
			document.removeEventListener('click', onOutsideClick)
		}
	}

	useEffect(() => {
		document.addEventListener('click', onOutsideClick)
		return document.removeEventListener('click', onOutsideClick)
	})

	const renderedOptions = options.map((option, i) => (
		<Option
			option={option}
			ref={i === 0 ? firstElement : null}
			key={option.value}
			onPick={onPick}
		/>
	))

	const onKeyDown = e => {
		const { keyCode } = e

		if (isEnter(keyCode) || isEscape(keyCode)) {
			e.preventDefault()

			if (isEnter(keyCode)) {
				if (expanded === false) setExpander('keyboard')

				expand(!expanded)
			} else if (isEscape(keyCode)) expand(false)
		}
	}

	useEffect(() => {
		if (expanded && expander === 'keyboard') firstElement.current.focus()
	}, [expanded, expander])

	return (
		<div
			tabIndex='0'
			role='menuitem'
			aria-haspopup='true'
			aria-disabled={disabled}
			aria-expanded={expanded}
			onClick={onClick}
			onKeyDown={onKeyDown}
			data-focus={expanded}
			className={cls(
				styles.select,
				minimalist ? styles.minimalist : null,
				className
			)}
			ref={container}
		>
			{selected ? (
				<div className={styles.selected}>
					{selected.icon ? <Icon {...selected} /> : null}
					{selected ? selected.name : 'Select...'}
				</div>
			) : (
				'Select...'
			)}
			<div className={styles.actions}>
				{selected && canBeNull ? (
					<button onClick={clearSelection} aria-label='Clear selection'>
						<X />
					</button>
				) : null}
				<button onClick={onClick} aria-label='Toggle menu'>
					<Arrow />
				</button>
			</div>
			{expanded ? (
				<ul
					className={styles.dropdown}
					aria-activedescendant={selected ? selected.value : null}
					tabIndex='0'
					role='menu'
				>
					{renderedOptions}
				</ul>
			) : null}
		</div>
	)
}

const propTypes = {
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	defaultValue: PropTypes.number,
	canBeNull: PropTypes.bool
}

const defaultProps = {
	disabled: false,
	canBeNull: true,
	defaultValue: 0,
	options: []
}

Select.defaultProps = defaultProps
Select.propTypes = propTypes

export default Select
