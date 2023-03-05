import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import { Category } from '@/types/movies.type'
import { usePagination } from '@/context/PaginationContext'
import { useQuery } from 'react-query'
import { fetchPopularity } from '@/hooks/fetchApi'

function Popular() {
    const { page } = usePagination()

    const popularity = useQuery(
        ['popularityData', { page }],
        async () => fetchPopularity(Category.Movie, page),
        {
            staleTime: 60 * 1000, // 1 minute
            keepPreviousData: true,
        }
    )

    if (popularity.isLoading) {
        return <SkeletonCard />
    }

    if (popularity.data?.movies === undefined) {
        return <div className='text-red-500 text-2xl md:text-3xl'>No Data</div>
    }

    return <MovieItem data={popularity} />
}

export default Popular
