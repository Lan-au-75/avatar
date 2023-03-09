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
        return (
            <div className='flex items-center justify-center'>
                <div className='min-w-[300px] min-h-[100px]'>
                    <img
                        src='/public/no-data.png'
                        alt=''
                        className='object-contain object-center'
                    />
                </div>
            </div>
        )
    }

    return <MovieItem data={popularity} />
}

export default Popular
