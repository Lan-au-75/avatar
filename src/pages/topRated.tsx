import MovieItem from '@/components/MovieItem'
import { usePagination } from '@/context/PaginationContext'
import { fetchTopRated } from '@/hooks/fetchApi'
import { Category } from '@/types/movies.type'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'

function TopRated() {
    const { page } = usePagination()
    const queryClient = useQueryClient()

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

    useEffect(() => {
        queryClient.prefetchQuery(['topRatedData', { page: page + 1 }], () =>
            fetchTopRated(Category.Movie, page + 1)
        )
    }, [topRated.data, page, queryClient])

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
