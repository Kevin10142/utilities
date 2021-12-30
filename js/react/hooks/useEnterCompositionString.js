import { useState } from 'react'

const useEnterCompositionString = (ref, clickOutsideAction) => {
	const [textValue, setTextValue] = useState('')
	const [isComposition, setIsComposition] = useState(false)

	const handleValueOnChange = event => {
		const newValue = event.target.value

		setTextValue(newValue)
	}
	const handleOnCompositionStart = () => setIsComposition(true)
	// hack for safari: after IME enter select word, compositionend will fire before keydown enter event
	const handleOnCompositionEnd = () => setTimeout(() => {
		setIsComposition(false)
	}, 0);

	return {
		isComposition,
		handleOnCompositionEnd,
		handleOnCompositionStart,
		handleValueOnChange,
		textValue
	}
}

export default useEnterCompositionString
