import { Movie, TV } from '@/types/movies.type'
import { UseQueryResult } from 'react-query'
import Card from './Card'
import Pagination from './Pagination'

interface Props {
    data: UseQueryResult<
        | {
              totalPages: string | number
              movies: Movie[] | TV[]
          }
        | undefined,
        unknown
    >
}

function MovieItem({ data }: Props) {
    const totalPages = data.data?.totalPages

    return (
        <div className='flex flex-col gap-y-20'>
            <ul className='grid gap-x-3 md:gap-x-4 justify-start gap-y-20 grid-cols-2 mobile:grid-cols-3 md:grid-cols-3 xl:grid-cols-4'>
                {data.data?.movies?.map((movie) => (
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

export default MovieItem
