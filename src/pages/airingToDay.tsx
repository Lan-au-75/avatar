import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import { usePagination } from '@/context/PaginationContext'
import { fetchAiringToDay } from '@/hooks/fetchApi'
import { useQuery } from 'react-query'

function AiringToDay() {
    const { page } = usePagination()

    const airingToDay = useQuery(
        ['airingToDayData', { page }],
        async () => fetchAiringToDay(page),
        {
            staleTime: 60 * 1000, // 1 minute
            keepPreviousData: true,
        }
    )

    if (airingToDay.isLoading) {
        return <SkeletonCard />
    }

    return <MovieItem data={airingToDay} />
}

export default AiringToDay
