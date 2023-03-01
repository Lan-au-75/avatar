import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import usePagination from '@/hooks/usePagination'
import { Category } from '@/types/movies.type'

function NowPlaying() {
    const { nowPlaying, pageNowPlaying, setPageNowPlaying } = usePagination(Category.Movie)

    if (nowPlaying.isLoading) {
        return <SkeletonCard />
    }

    return <MovieItem data={nowPlaying} page={pageNowPlaying} setPage={setPageNowPlaying} />
}

export default NowPlaying
