import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import { Category } from '@/types/movies.type'
import { usePagination } from '@/context/PaginationContext'
import { useQuery } from 'react-query'
import { fetchTopRated } from '@/hooks/fetchApi'

function TopRated() {
    const { page } = usePagination()

    const topRated = useQuery(
        ['topRatedData', { page }],
        async () => {
            return fetchTopRated(Category.Movie, page)
        },
        {
            staleTime: 60 * 1000, // 1 minute
            keepPreviousData: true,
        }
    )

    if (topRated.isLoading) {
        return <SkeletonCard />
    }

    if (topRated.data?.movies === undefined) {
        return <div className='text-red-500 text-2xl md:text-3xl'>No Data</div>
    }

    return <MovieItem data={topRated} />
}

export default TopRated
