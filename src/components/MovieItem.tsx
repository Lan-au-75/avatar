import { Movie, TV } from '@/types/movies.type'
import { useEffect } from 'react'
import { UseQueryResult } from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import Card from './Card'
import Pagination from './Pagination'

interface Props {
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    data: UseQueryResult<
        {
            totalPages: string | number
            movies: Movie[] | TV[]
        },
        unknown
    >
}

function MovieItem({ data, page, setPage }: Props) {
    const totalPages = data.data?.totalPages

    const location = useLocation()

    const id = useParams()

    useEffect(() => {
        setPage(Number(id.pageID))
    }, [id.pageID])

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
                <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </div>
        </div>
    )
}

export default MovieItem
