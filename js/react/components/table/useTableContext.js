import { useContext } from 'react'
import { TableContext } from './TableContext'

const useTableContext = () => {
	const context = useContext(TableContext)

	if (!context) {
		throw new Error("useTableContext cannot find parent TableContextProvider's  TableContext")
	}

	return context
}

export default useTableContext
