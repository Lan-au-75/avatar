import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import { Category } from '@/types/movies.type'
import { usePagination } from '@/context/PaginationContext'
import { fetchPopularity } from '@/hooks/fetchApi'

function Popular() {
    const { page } = usePagination()
    const queryClient = useQueryClient()

    const popularity = useQuery(
        ['popularityData', { page }],
        async () => fetchPopularity(Category.Movie, page),
        {
            staleTime: 60 * 1000, // 1 minute
            keepPreviousData: true,
        }
    )

    useEffect(() => {
        queryClient.prefetchQuery(['popularityData', { page: page + 1 }], () =>
            fetchPopularity(Category.Movie, page + 1)
        )
    }, [popularity.data, page, queryClient])

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
