import MovieItem from '@/components/MovieItem'
import { SkeletonCard } from '@/components/Skeleton'
import usePagination from '@/hooks/usePagination'
import { Category } from '@/types/movies.type'

function AiringToDay() {
    const { airingToDay, pageAiringToDay, setPageAiringToDay } = usePagination(Category.Tv)

    if (airingToDay.isLoading) {
        return <SkeletonCard />
    }

    return <MovieItem data={airingToDay} page={pageAiringToDay} setPage={setPageAiringToDay} />
}

export default AiringToDay
