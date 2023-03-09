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

    return <MovieItem data={topRated} />
}

export default TopRated
