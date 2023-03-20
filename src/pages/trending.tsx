import MovieItem from '@/components/MovieItem'
import { usePagination } from '@/context/PaginationContext'
import { fetchTrendingMovie } from '@/hooks/fetchApi'
import { Category } from '@/types/movies.type'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'

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

    return <MovieItem data={trendingMovie} />
}

export default Trending
