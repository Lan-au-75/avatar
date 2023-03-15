import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Category } from '@/types/movies.type'
import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import { usePagination } from '@/context/PaginationContext'
import { fetchTrendingMovie } from '@/hooks/fetchApi'

function Trending() {
    const { page } = usePagination()
    const queryClient = useQueryClient()

    const trendingMovie = useQuery(
        ['trendingData', { page }],
        () => fetchTrendingMovie(Category.Movie, page),
        {
            staleTime: 60 * 1000, // 1 minute
            keepPreviousData: true,
        }
    )

    useEffect(() => {
        queryClient.prefetchQuery(['trendingData', { page: page + 1 }], () =>
            fetchTrendingMovie(Category.Movie, page + 1)
        )
    }, [trendingMovie.data, page, queryClient])

    if (trendingMovie.isLoading) {
        return <SkeletonCard />
    }

    return <MovieItem data={trendingMovie} />
}

export default Trending
