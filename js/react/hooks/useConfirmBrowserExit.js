import { useEffect } from 'react'

const useConfirmBrowserExit = (showConfirm = true) => {
	const handleBeforeUnload = event => {
		if (showConfirm) {
			// message is ignored by modern browsers
			return event.returnValue = 'Sure to leave this page?'
		}
	}

	useEffect(() => {
		window.addEventListener('beforeunload', handleBeforeUnload)

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [showConfirm])
}

export default useConfirmBrowserExit
