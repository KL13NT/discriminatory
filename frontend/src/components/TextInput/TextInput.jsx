import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './TextInput.module.sass'

const ClearButton = ({ disabled, onClick }) =>
	<button
		aria-label='clear field'
		disabled={ disabled }
		onClick={ onClick }/>

const InputField = ({ inset, onChange, placeholder, value, ...props }) =>
	<input
		{ ...props }
		placeholder={ inset? '': placeholder }
		value={ value }
		onChange={ onChange }/>

function RenderWithExternalLabel (props, value, changeHandler, clearHandler) {
	return (
		<div className={ styles.input }>
			<label htmlFor={ props.id }>{ props.label }</label>
			<div>
				<InputField { ...props }
					value={ value }
					onChange={ changeHandler }/>
				{
					value.length > 0
						? <ClearButton
							disabled={ props.disabled }
							onClick={ clearHandler }/>
						: null
				}
			</div>
		</div>
	)
}

function RenderWithInsetLabel ({ active, changeHandler, clearHandler, props, value }) {
	return (
		<div className={ [ styles.inset, active ].join(' ') }>
			<InputField
				{ ...props }
				inset
				value={ value }
				onChange={ changeHandler }/>
			<label htmlFor={ props.id }>{ props.label }</label>
			{
				value.length > 0
					? <ClearButton
						disabled={ props.disabled }
						onClick={ clearHandler }/>
					: null
			}
		</div>
	)
}

function TextInput (props) {
	const [ value, setValue ] = useState(props.value)
	const active = value.length > 0 ? styles.active : null

	const clearHandler = () => setValue('')
	const changeHandler = (e) => {
		setValue(e.currentTarget.value)
		if(props.onChange) onchange({ ...e })
	}

	if (props.inset)
		return RenderWithInsetLabel({ props, value, changeHandler, clearHandler, active })
	else
		return RenderWithExternalLabel(props, value, changeHandler, clearHandler)
}


const propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	spellcheck: PropTypes.bool,
	tabIndex: PropTypes.number,
	inset: PropTypes.bool,
	value: PropTypes.oneOf([ PropTypes.string, PropTypes.number ])
}

const defaultProps = {
	spellCheck: false,
	tabIndex: 0,
	inset: false,
	value: ''
}

TextInput.defaultProps = defaultProps
TextInput.propTypes = propTypes


export { TextInput }