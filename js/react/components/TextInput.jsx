import React from 'react'
import PropTypes from 'prop-types'
import useEnterCompositionString from '../hooks/useEnterCompositionString'

const TextInput = ({
	handleInputChange,
	name,
	placeholder
}) => {
	const {
		isComposition,
		handleOnCompositionEnd,
		handleOnCompositionStart,
		handleValueOnChange,
		textValue
	} = useEnterCompositionString()

	const handleTextOnChange = event => {
		handleInputChange(textValue, event)
	}
	const handleOnKeyDown = event => {
		if (isComposition) { return }

		if (event.key === 'Enter') {
			handleTextOnChange(event)
		}
	}

	return <div>
		<input
			name={name}
			value={textValue}
			placeholder={placeholder}
			onChange={handleValueOnChange}
			onCompositionStart={handleOnCompositionStart}
			onCompositionEnd={handleOnCompositionEnd}
			onKeyDown={handleOnKeyDown}
		/>

	</div>
}

TextInput.propTypes = {
	handleInputChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired
}

export default TextInput
