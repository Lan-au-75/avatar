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
    const { isCollapsed } = useSidebarCollapse()

    return (
        <div className='flex flex-col gap-y-20'>
            <ul
                className={clsx(
                    'grid gap-x-3 md:gap-x-4 justify-start gap-y-20 grid-cols-2 mobile:grid-cols-3 md:grid-cols-3 xl:grid-cols-4',
                    isCollapsed && 'md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5'
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
