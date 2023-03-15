import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Card from '@/components/Card'
import SEO from '@/components/SEO'
import { useBookmark } from '@/context/BookmarkContext'
import { Movie } from '@/types/movies.type'

function Bookmark() {
    const { result } = useBookmark()

    const [data, setData] = useState<Movie[]>([])

    useEffect(() => {
        const savedMovies = JSON.parse(localStorage.getItem('saveMovies') as string)
        setData(savedMovies)
    }, [result])

    //  const totalPages = data.data?.totalPages

    return (
        <>
            <SEO title='Bookmark' description='Bookmark Page' />

            <main className='relative h-screen overflow-y-auto scrollbar-hide flex flex-col items-center flex-1 pt-4 sm:p-2 md:p-5 pc:items-start gap-5 md:gap-7'>
                <div className='absolute top-0 -left-8 h-[300px] w-[300px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
                <div className='absolute top-0 left-1/2 h-[300px] w-[300px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
                <div className='flex flex-col gap-y-20 w-full'>
                    <ul
                        className={clsx(
                            'grid gap-x-1 mobile:gap-x-3 md:gap-x-4 justify-center pc:justify-start gap-y-20 grid-cols-autoMini sm:grid-cols-autoMobile md:grid-cols-autoTablet lg:grid-cols-autoPC'
                        )}
                    >
                        {data?.map((savedMovie: Movie) => (
                            <li key={savedMovie.id}>
                                <Card movie={savedMovie} />
                            </li>
                        ))}
                    </ul>
                    {/* <div className='flex justify-center'>
                        <Pagination totalPages={totalPages} />
                    </div> */}
                </div>
            </main>
        </>
    )
}

export default Bookmark
