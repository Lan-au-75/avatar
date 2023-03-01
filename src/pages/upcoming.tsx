import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import usePagination from '@/hooks/usePagination'
import { Category } from '@/types/movies.type'

function Upcoming() {
    const { upcoming, pageUpcoming, setPageUpcoming } = usePagination(Category.Movie)

    if (upcoming.isLoading) {
        return <SkeletonCard />
    }

    return <MovieItem data={upcoming} page={pageUpcoming} setPage={setPageUpcoming} />
}

export default Upcoming
