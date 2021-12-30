import { useState } from 'react'
import useTableContext from './useTableContext'
import { FIELD_CHANGE } from './TableContext'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

const checkError = errors => {
	let hasError = false

	Object.keys(errors).some(fieldName => {
		const currentError = errors[fieldName]

		if (isArray(currentError)) {
			currentError.some(error => {
				if (isObject(error)) {
					Object.keys(error).forEach(key => {
						if (error[key]) {
							hasError = true
						}
					})

					return hasError
				} else {
					if (error) {
						hasError = true
					}
				}
			})
		} else {
			if (currentError) {
				hasError = true
			}
		}

		return hasError
	})
}

const useTableSubmit = ({ action }) => {
	const [isSubmitted, setIsSubmitted] = useState(false)
	const { dispatch, errors, fields, validators } = useTableContext()

	const handleFieldChange = (fieldName, fieldValue, event) => {
		dispatch({
			payload: {
				fieldName,
				fieldValue,
				validators
			},
			type: FIELD_CHANGE
		})
	}

	const handleFormSubmit = event => {
		event.preventDefault()
		setIsSubmitted(true)
		const hasError = checkError(errors)

		if (!hasError) {
			action(fields)
		}
	}
	const displayErrors = isSubmitted ? errors : {}

	return {
		fields,
		handleOnChange: handleFieldChange,
		handleOnSubmit: handleFormSubmit,
		displayErrors
	}

}

export default useTableSubmit
