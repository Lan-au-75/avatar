import { getGenres } from '@/apis/genres.api'
import SEO from '@/components/SEO'
import { Genres } from '@/types/movies.type'
import clsx from 'clsx'
import { useState } from 'react'
import { BsCheck2 } from 'react-icons/bs'
import { IoMdAdd } from 'react-icons/io'
import { useQuery } from 'react-query'

function Filter() {
    const [check, setCheck] = useState<boolean>(false)

    const { data } = useQuery(['Genres'], () => getGenres())

    const handleCheck = () => {
        setCheck(!check)
    }

    return (
        <>
            <SEO title='Filter' description='Filter Page' />
            <main className='relative h-screen overflow-y-auto scrollbar-hide flex flex-col items-center flex-1 pt-4 sm:p-2 md:p-5 pc:items-start'>
                <div className='absolute top-0 -left-8 h-[300px] w-[300px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
                <div className='absolute top-0 left-1/2 h-[300px] w-[300px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
                <div className='flex flex-col gap-y-2 w-full'>
                    <span className='text-white text-lg md:text-xl'>Genre</span>

                    <ul className='flex items-center gap-3 flex-wrap'>
                        {(data.genres as Genres[]).map((genre, i) => (
                            <li
                                key={genre.id}
                                className={clsx(
                                    'w-[150px] flex items-center justify-between px-3 py-2  text-white hover:bg-red-500 rounded-2xl cursor-pointer transition-all duration-200 ease-linear',
                                    check ? 'bg-red-500' : 'bg-base100'
                                )}
                                onClick={() => handleCheck()}
                            >
                                <span className='capitalize text-sm'>{genre.name}</span>
                                {check ? (
                                    <BsCheck2 className='text-base md:text-lg text-white' />
                                ) : (
                                    <IoMdAdd className='text-base md:text-lg text-white' />
                                )}
                            </li>
                        ))}
                    </ul>
                    {/* <ul
                        className={clsx(
                            'grid gap-x-1 mobile:gap-x-3 md:gap-x-4 justify-center pc:justify-start gap-y-20 grid-cols-autoMini sm:grid-cols-autoMobile md:grid-cols-autoTablet lg:grid-cols-autoPC'
                        )}
                    >
                        {data?.map((savedMovie: Movie) => (
                            <li key={savedMovie.id}>
                                <Card movie={savedMovie} />
                            </li>
                        ))}
                    </ul> */}
                    {/* <div className='flex justify-center'>
                        <Pagination totalPages={totalPages} />
                    </div> */}
                </div>
            </main>
        </>
    )
}

export default Filter
