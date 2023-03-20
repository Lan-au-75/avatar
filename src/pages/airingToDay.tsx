import MovieItem from '@/components/MovieItem'
import { usePagination } from '@/context/PaginationContext'
import { fetchAiringToDay } from '@/hooks/fetchApi'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'

function AiringToDay() {
    const { page } = usePagination()
    const queryClient = useQueryClient()

    const airingToDay = useQuery(
        ['airingToDayData', { page }],
        async () => fetchAiringToDay(page),
        {
            staleTime: 60 * 1000, // 1 minute
            keepPreviousData: true,
        }
    )

    useEffect(() => {
        queryClient.prefetchQuery(['airingToDayData', { page: page + 1 }], () =>
            fetchAiringToDay(page + 1)
        )
    }, [airingToDay.data, page, queryClient])

    return <MovieItem data={airingToDay} />
}

export default AiringToDay
