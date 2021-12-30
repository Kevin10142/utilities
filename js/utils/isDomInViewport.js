function isDomInViewport(DOMNode) {
	const windowHeight = window.innerHeight || document.documentElement.clientHeight
	const windowWidth = window.innerWidth || document.documentElement.clientWidth
	const { top, left, height, width } = DOMNode?.getBoundingClientRect() ?? {}

	const verticalInView = top <= windowHeight && top + height >= 0
	const horizontalInView = left <= windowWidth && left + width >= 0

	return verticalInView && horizontalInView
}

module.exports = isDomInViewport
