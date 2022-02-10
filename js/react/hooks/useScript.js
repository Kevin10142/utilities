import { useEffect } from 'react'

const useScript = (scriptSrc, options) =>
	useEffect(() => {
		const scriptDom = document.createElement('script')

		scriptDom.src = scriptSrc
		scriptDom.async = options?.async ?? false
		scriptDom.defer = options?.defer ?? false


		document.body.appendChild(scriptDom)

		return () => { document.body.removeChild(scriptDom) }
	}, [src])

export default useScript
