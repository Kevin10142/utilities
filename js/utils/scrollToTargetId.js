const scrollByScrollTop = (scrollTop) => {
	if (!('scrollBehavior' in document.documentElement?.style ?? {})) {
		window.scroll(0, scrollTop)
	} else {
		window.scroll({
			top: scrollTop,
			behavior: 'smooth'
		})
	}
}

const scrollToTargetId = (
	id,
	reservedSpace = 20
) => {
	const windowScrolledY = window.scrollY || window.pageYOffset
	const targetScrollTop = document.getElementById(id)?.getBoundingClientRect()?.top + windowScrolledY

	if (targetScrollTop) {
		scrollByScrollTop(targetScrollTop - reservedSpace)
	}
}

export default scrollToTargetId
