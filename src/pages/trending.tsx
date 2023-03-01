import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import usePagination from '@/hooks/usePagination'
import { Category } from '@/types/movies.type'

function Trending() {
    const { trendingMovie, pageTrending, setPageTrending } = usePagination(Category.Movie)

    if (trendingMovie.isLoading) {
        return <SkeletonCard />
    }

    return <MovieItem data={trendingMovie} page={pageTrending} setPage={setPageTrending} />
}

export default Trending
