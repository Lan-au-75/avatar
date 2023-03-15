import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import { usePagination } from '@/context/PaginationContext'
import { fetchUpcoming } from '@/hooks/fetchApi'

function Upcoming() {
    const { page } = usePagination()
    const queryClient = useQueryClient()

    const upcoming = useQuery(['upcomingData', { page }], async () => fetchUpcoming(page), {
        staleTime: 60 * 1000, // 1 minute
        keepPreviousData: true,
    })

    useEffect(() => {
        queryClient.prefetchQuery(['upcomingData', { page: page + 1 }], () =>
            fetchUpcoming(page + 1)
        )
    }, [upcoming.data, page, queryClient])

    if (upcoming.isLoading) {
        return <SkeletonCard />
    }

    return <MovieItem data={upcoming} />
}

export default Upcoming
