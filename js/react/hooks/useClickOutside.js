import { useEffect } from 'react'

const useClickOutside = (ref, clickOutsideAction) => {
	const handleClickOutside = event => {
		if (ref.current && !ref.current.contains(event.target)) {
			clickOutsideAction()
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside)
		document.addEventListener('touch', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
			document.removeEventListener('touch', handleClickOutside)
		}
	}, [])
}

export default useClickOutside
