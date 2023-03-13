import clsx from 'clsx'
import { UseQueryResult } from 'react-query'
import { Movie, TV } from '@/types/movies.type'
import Card from './Card'
import Pagination from './Pagination'
import { useSidebarCollapse } from '@/context/SidebarCollapseContext'

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
        <div className='flex flex-col gap-y-20 w-full'>
            <ul
                className={clsx(
                    'grid gap-x-1 mobile:gap-x-3 md:gap-x-4 justify-center pc:justify-start gap-y-20 grid-cols-autoMini sm:grid-cols-autoMobile md:grid-cols-autoTablet lg:grid-cols-autoPC'
                )}
            >
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
