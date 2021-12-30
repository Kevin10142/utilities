import { useEffect, useRef, useState } from 'react'

const useIsMouseEnter = () => {
	const ref = useRef(null)
	const [isEntered, setIsEntered] = useState(false)
	const handleMouseEnter = () => setIsEntered(true)
	const handleMouseLeave = () => setIsEntered(false)

	useEffect(() => {
		const node = ref.current

		if (node) {
			node.addEventListener('mouseenter', handleMouseEnter)
			node.addEventListener('mouseleave', handleMouseLeave)

			return () => {
				node.removeEventListener('mouseenter', handleMouseEnter)
				node.removeEventListener('mouseleave', handleMouseLeave)
			}
		}
	}, [])

	return [ref, isEntered]
}

export default useIsMouseEnter
