import { useQuery } from 'react-query'
import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import { fetchNowPlaying } from '@/hooks/fetchApi'
import { usePagination } from '@/context/PaginationContext'

function NowPlaying() {
    const { page } = usePagination()

    const nowPlaying = useQuery(['nowPlayingData', { page }], async () => fetchNowPlaying(page), {
        staleTime: 60 * 1000, // 1 minute
        keepPreviousData: true,
    })

    if (nowPlaying.isLoading) {
        return <SkeletonCard />
    }

    return <MovieItem data={nowPlaying} />
}

export default NowPlaying
