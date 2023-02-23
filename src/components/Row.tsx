import { Movie } from '@/types/movies.type'

interface Props {
    title?: string
    movies?: Movie[]
    Thumbnail?: any
}

function Row({ title, movies, Thumbnail }: Props) {
    return (
        <div className='flex flex-col gap-y-4'>
            <h2 className='text-xl text-white font-bold capitalize'>{title}</h2>
            <div className='flex w-screen items-center gap-2 md:gap-3 overflow-x-scroll scrollbar-hide  '>
                {movies?.map((movie) => (
                    <Thumbnail key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default Row
