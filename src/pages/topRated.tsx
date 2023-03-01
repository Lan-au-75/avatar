import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import usePagination from '@/hooks/usePagination'
import { Category } from '@/types/movies.type'

function TopRated() {
    const { topRated, pageTopRated, setPageTopRated } = usePagination(Category.Movie)

    if (topRated.isLoading) {
        return <SkeletonCard />
    }

    return <MovieItem data={topRated} page={pageTopRated} setPage={setPageTopRated} />
}

export default TopRated
