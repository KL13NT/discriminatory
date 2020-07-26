import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import styles from './Select.module.sass'

import checkSVG from '../../assets/check.svg'


const DOWN_ARROW_KEY_CODE = 40
const UP_ARROW_KEY_CODE = 38
const SELECTION_KEY_CODES = [ 0, 32, 13 ]
const CLOSE_KEY_CODE = 27


function SelectDropdownOption ({ changeHandler, children, option, selected }) {

	const focusNextListItem = (listItem) => {
		const indexOfListItem = [ ...listItem.parentNode.children ].indexOf(listItem)
		const nextListItem = listItem.parentNode.children[indexOfListItem + 1]

		if(nextListItem) nextListItem.focus()
	}

	const focusPrevListItem = (listItem) => {
		const indexOfListItem = [ ...listItem.parentNode.children ].indexOf(listItem)
		const prevListItem = listItem.parentNode.children[indexOfListItem - 1]

		if(prevListItem) prevListItem.focus()
	}

	const navigationHandler = e => {
		if(e.keyCode === DOWN_ARROW_KEY_CODE || e.keyCode === UP_ARROW_KEY_CODE){
			e.preventDefault()
			e.stopPropagation()

			if(e.keyCode === DOWN_ARROW_KEY_CODE) focusNextListItem(e.currentTarget)
			else if(e.keyCode === UP_ARROW_KEY_CODE) focusPrevListItem(e.currentTarget)
		}
	}

	const keyPressHandler = e =>
		e.keyCode === DOWN_ARROW_KEY_CODE || e.keyCode === UP_ARROW_KEY_CODE
			? navigationHandler(e)
			: changeHandler(e)

	return (
		<span
			aria-selected={ selected }
			className={ selected? styles.dropdownOptionSelected: styles.dropdownOption }
			data-value={ option }
			role="option"
			tabIndex={ 0 }
			onClick={ changeHandler }
			onKeyDown={ keyPressHandler }>
			<img alt='check' aria-hidden={ true } src={ checkSVG } />
			<span>{ children }</span>
		</span>
	)
}

const SelectDropdown = ({ changeHandler, id, isExpanded, listRef, options, selected }) =>
	<div
		ref={ listRef }
		aria-expanded={ isExpanded }
		aria-labelledby={ id+'-dropdown-label' }
		className={ styles.selectDropdown }
		role='listbox'>
		{ Array.isArray(options)
			? options.map(option =>
				<SelectDropdownOption
					key={ option }
					changeHandler={ changeHandler }
					id={ id }
					option={ option }
					selected={ selected.some(value => value === option) ? true : false }>
					{ option }
				</SelectDropdownOption>
			)
			: null }
	</div>

function Select (props) {
	const { className, disabled, id, isMulti, label, onChange, options } = props

	const [ selected, updateSelected ] = useState([ props.options[0] ])
	const [ isExpanded, setExpanded ] = useState(false)

	const listRef = useRef(null)
	const labelRef = useRef(null)

	useEffect(() => {
		if(isExpanded && listRef.current) listRef.current.focus()
		else if(labelRef.current) labelRef.current.focus()
	}, [ isExpanded ])

	const changeHandler = (e) => {
		const { currentTarget: { dataset: { value } } } = e

		e.preventDefault()
		toggleDropdown(e)

		if(SELECTION_KEY_CODES.includes(e.keyCode) || e.type === 'click'){
			if (isMulti) {
				if (selected.some(option => option === value))
					updateSelected(selected.filter(option => option !== value))
				else updateSelected([ ...selected, value ])
			}
			else {
				updateSelected([ value ])
			}
		}

		if(onChange) onChange(selected)
	}

	const toggleDropdown = (e) => {
		if(disabled) return

		if((!isMulti && SELECTION_KEY_CODES.includes(e.keyCode))
		|| (SELECTION_KEY_CODES.includes(e.keyCode) && e.currentTarget === labelRef.current)
		|| (e.type === 'click' && e.currentTarget === labelRef.current)
		|| (!isMulti && e.type === 'click')
		|| (e.keyCode === CLOSE_KEY_CODE && isExpanded)) {
			setExpanded(!isExpanded)
		}
	}

	const toggleDropdownButtonName = isExpanded? 'Expanded. Close dropdown': 'Not expanded. Expand dropdown'
	const dropdownOpenedClass = isExpanded ? styles.dropdownOpened : null
	const classes = [ styles.select, dropdownOpenedClass, className ].join(' ')

	return (
		<div
			className={ classes }
			data-disabled={ disabled }>
			<div
				ref={ labelRef }
				aria-disabled={ disabled }
				aria-haspopup="listbox"
				aria-label={ toggleDropdownButtonName }
				disabled={ disabled }
				id={ id+'-dropdown' }
				role='button'
				tabIndex={ disabled? -1: 0 }
				onClick={ toggleDropdown }
				onKeyPress={ toggleDropdown }>
				<span
					aria-label='dropdown-label'
					className={ styles.dropdownLabel }
					id={ id+'-dropdown-label' }> { label }
				</span>
				<span
					aria-label={ toggleDropdownButtonName }
					className={ styles.dropdownTick }
					tabIndex='-1'/>
			</div>
			<SelectDropdown
				changeHandler={ changeHandler }
				disabled={ disabled }
				id={ id }
				isExpanded={ isExpanded }
				options={ options }
				selected={ selected } />
		</div>
	)
}


const propTypes = {
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	isMulti: PropTypes.bool,
	className: PropTypes.string
}

const defaultProps = {
	isMulti: false,
	disabled: false,
	options: []
}

Select.defaultProps = defaultProps
Select.propTypes = propTypes




export { Select }