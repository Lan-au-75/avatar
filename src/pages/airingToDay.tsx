import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import { usePagination } from '@/context/PaginationContext'
import { fetchAiringToDay } from '@/hooks/fetchApi'

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

    if (airingToDay.isLoading) {
        return <SkeletonCard />
    }

    return <MovieItem data={airingToDay} />
}

export default AiringToDay
