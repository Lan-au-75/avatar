import MovieItem from '@/components/MovieItem'
import { usePagination } from '@/context/PaginationContext'
import { fetchNowPlaying } from '@/hooks/fetchApi'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'

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

    return <MovieItem data={nowPlaying} />
}

export default NowPlaying
