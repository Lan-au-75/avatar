import Card from '@/components/Card'
import Pagination from '@/components/Pagination'
import { SkeletonCard } from '@/components/Skeleton'
import { useMovies } from './movies'

const totalPages = 1000

function Trending() {
    const {
        movies: { trendingMovie },
    } = useMovies()

    if (trendingMovie.isLoading) {
        return <SkeletonCard />
    }

    return (
        <div className='flex flex-col gap-y-20'>
            <ul
                className='grid gap-x-3 justify-start gap-y-20 mobile:grid-cols-[repeat(3,180px)] md:gap-x-4 md:gap-y-20 grid-cols-[repeat(2,180px)] sm:grid-cols-[repeat(3,180px)]
              lg:grid-cols-3 xl:grid-cols-4'
            >
                {trendingMovie.data?.map((movie) => (
                    <li key={movie.id}>
                        <Card movie={movie} />
                    </li>
                ))}
            </ul>
            <div className='flex justify-center'>
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}

export default Trending
