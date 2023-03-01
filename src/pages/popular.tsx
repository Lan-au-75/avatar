import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import usePagination from '@/hooks/usePagination'
import { Category } from '@/types/movies.type'

function Popular() {
    const { popularity, pagePopularity, setPagePopularity } = usePagination(Category.Movie)

    if (popularity.isLoading) {
        return <SkeletonCard />
    }

    return <MovieItem data={popularity} page={pagePopularity} setPage={setPagePopularity} />
}

export default Popular
