import { useQuery } from 'react-query'
import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import { usePagination } from '@/context/PaginationContext'
import { fetchUpcoming } from '@/hooks/fetchApi'

function Upcoming() {
    const { page } = usePagination()

    const upcoming = useQuery(['upcomingData', { page }], async () => fetchUpcoming(page), {
        staleTime: 60 * 1000, // 1 minute
        keepPreviousData: true,
    })

    if (upcoming.isLoading) {
        return <SkeletonCard />
    }

    return <MovieItem data={upcoming} />
}

export default Upcoming
