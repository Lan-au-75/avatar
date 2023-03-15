import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import { fetchNowPlaying } from '@/hooks/fetchApi'
import { usePagination } from '@/context/PaginationContext'

function NowPlaying() {
    const { page } = usePagination()
    const queryClient = useQueryClient()

    const nowPlaying = useQuery(['nowPlayingData', { page }], async () => fetchNowPlaying(page), {
        staleTime: 60 * 1000, // 1 minute
        keepPreviousData: true,
    })

    useEffect(() => {
        queryClient.prefetchQuery(['nowPlayingData', { page: page + 1 }], () =>
            fetchNowPlaying(page + 1)
        )
    }, [nowPlaying.data, page, queryClient])

    if (nowPlaying.isLoading) {
        return <SkeletonCard />
    }

    return <MovieItem data={nowPlaying} />
}

export default NowPlaying
