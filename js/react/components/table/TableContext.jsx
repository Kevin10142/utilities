import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import cloneDeep from 'lodash/cloneDeep'
import isArray from 'lodash/isArray'
import merge from 'lodash/merge'

export const FIELD_CHANGE = 'FIELD_CHANGE'

const TableContext = createContext()

const validate = ({ fields, fieldValidators, fieldValue }) => {
	let errorMessage

	if (isArray(fieldValidators)) {
		fieldValidators.some(validator => {
			if (typeof validator === 'function') {
				const currentError = validator(fieldValue, fields)

				if (isArray(error)) {
					errorMessage = merge(errorMessage, currentError)
				} else {
					errorMessage = currentError
				}

				// early break
				if (errorMessage && typeof errorMessage === 'string') {
					return true
				}
			}

			return false
		})
	}

	return errorMessage
}

const getInitialState = value => {
	const {
		fields = {},
		validators = {}
	} = value

	let initialState = {
		errors: {},
		fields: {}
	}

	Object.keys(fields).forEach(fieldKey => {
		initialState.fields[fieldKey] = cloneDeep(fields[fieldKey])
	})
	Object.keys(validators).forEach(fieldKey => {
		const fieldValidators = validators[fieldKey] || []

		initialState.errors[fieldKey] = validate({
			fields: initialState.fields,
			fieldValidators,
			fieldValue = initialState.fields[fieldKey]
		})
	})

	return initialState
}

const tableReducer = (state, action) => {
	const { payload, type } = action

	switch (type) {
		case FIELD_CHANGE: {
			const { fieldName, fieldValue, validators } = payload
			const { errors, fields } = state
			const fieldValidators = validators[fieldName]
			const error = validate({ fields, fieldValidators, fieldValue })

			return {
				...state,
				fields: {
					...fields,
					[fieldName]: fieldValue
				},
				errors: {
					...errors,
					[fieldName]: error
				}
			}
		}
		default:
			throw new Error(`action type not exist: ${action.type}`)
	}
}

const TableContextProvider = ({ children, value }) => {
	const [state, dispatch] = useReducer(tableReducer, value, getInitialState)
	const contextValue = {
		dispatch,
		errors: state.errors ?? {},
		fields: state.fields ?? {},
		validators: value.validators ?? {}
	}

	return <TableContext.Provider value={contextValue}>{children}</TableContext.Provider>
}

TableContextProvider.propTypes = {
	children: PropTypes.any,
	value: PropTypes.shape({
		fields: PropTypes.object,
		validators: PropTypes.object
	})
}

export { TableContext, TableContextProvider, }
