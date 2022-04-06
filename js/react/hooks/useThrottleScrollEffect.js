import { useEffect } from 'react'

function throttle(callbackFn, delay) {
	let lastExecuteTime = 0

	return function (...args) {
		const currentTime = Date.now()

		if ((currentTime - lastExecuteTime) > delay) {
			lastExecuteTime = currentTime

			return callbackFn(...args)
		}
	}
}

const useThrottleScrollEffect = (handleScroll, throttleTime = 250) =>
	useEffect(() => {
		const throttled = throttle(handleScroll, throttleTime)

		window.addEventListener('scroll', throttled)

		return () => { window.addEventListener('scroll', throttled) }
	}, [handleScroll, throttleTime])

export default useThrottleScrollEffect
