import queryString from 'query-string'
import { createContext, useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'

interface Props {
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const PaginationContext = createContext<Props>({
    page: 1,
    setPage: () => {},
})

function PaginationProvider({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState<number>(1)

    const location = useLocation()
    const queryParams = queryString.parse(location.search)

    useEffect(() => {
        const currentPage = parseInt(queryParams.page as string, 10)
        if (!isNaN(currentPage) && currentPage > 0) {
            setPage(currentPage)
        }
    }, [queryParams.page])

    return (
        <PaginationContext.Provider value={{ page, setPage }}>
            {children}
        </PaginationContext.Provider>
    )
}

export default PaginationProvider

export const usePagination = () => {
    const context = useContext(PaginationContext)
    return context
}
