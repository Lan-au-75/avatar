import { useState, useRef, useEffect } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { useQuery } from 'react-query'
import { BiFilter } from 'react-icons/bi'
import { getGenres } from '@/apis/genres.api'
import SEO from '@/components/SEO'
import { Category, Genres, Movie } from '@/types/movies.type'
import { fetchTrendingMovie } from '@/hooks/fetchApi'
import clsx from 'clsx'
import Card from '@/components/Card'
import CircleShadow from '@/components/CircleShadow'

function Filter() {
    const [selectAll, setSelectAll] = useState<number[]>([])
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [filter, setFilter] = useState<Movie[]>()

    const { data } = useQuery(['Genres'], () => getGenres())
    const menuRef = useRef<HTMLUListElement>(null)
    const divRef = useRef<HTMLDivElement>(null)

    const trendingMovie = useQuery(['trendingData'], () => fetchTrendingMovie(Category.All), {
        staleTime: 60 * 1000,
    })

    const movies = trendingMovie.data?.movies

    // filter genres

    const handleFilter = () => {
        const filter = movies?.filter((movie) =>
            selectAll.every((selectID) => movie.genre_ids.includes(selectID))
        )

        setFilter(filter)
    }

    //  handle check type checkbox
    const handleCheck = (id: number) => {
        setSelectAll((prev) => {
            const isChecked = selectAll.includes(id)
            if (isChecked) {
                return selectAll.filter((selectID) => selectID !== id)
            } else {
                return [...prev, id]
            }
        })
    }

    // handle menu when outside
    const handleOutsideClick = (e: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(e.target as Node) &&
            !divRef.current?.contains(e.target as Node)
        ) {
            setShowMenu(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', (e) => handleOutsideClick(e))
        return () => {
            document.removeEventListener('mousedown', (e) => handleOutsideClick(e))
        }
    }, [])

    return (
        <>
            <SEO title='Filter' description='Filter Page' />
            <main className='h-screen overflow-y-auto scrollbar-hide flex flex-col gap-4 items-center flex-1 pt-4 sm:p-2 md:p-5 pc:items-start'>
                <CircleShadow />
                <div className='flex items-center justify-between w-full p-2'>
                    <div
                        ref={divRef}
                        className='relative w-[200px] flex items-center justify-between px-3 py-2 bg-slate-300 dark:bg-base200 rounded-sm'
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <div className='flex items-center gap-2'>
                            {selectAll.length > 0 && (
                                <span className='flex items-center justify-center h-5 w-5 rounded-full bg-blue-500 text-white'>
                                    {selectAll.length}
                                </span>
                            )}
                            <span className='text-black dark:text-white text-base md:text-lg'>Genre</span>
                        </div>
                        <AiFillCaretDown className=' text-black dark:text-white text-base md:text-lg' />

                        {/* menu Genre */}
                        {showMenu && (
                            <ul
                                ref={menuRef}
                                className='absolute top-14 right-0 px-3 py-2 w-full bg-white dark:bg-base200 max-h-[300px] overflow-y-hidden hover:overflow-y-auto scrollBarCustom rounded-md shadow-md z-10'
                                onClick={(e) => e.stopPropagation()}
                            >
                                {data &&
                                    (data?.genres as Genres[]).map((genre) => (
                                        <li
                                            key={genre.id}
                                            className='flex items-center gap-3 text-black dark:text-white cursor-pointer'
                                        >
                                            <input
                                                type='checkbox'
                                                name={genre.name}
                                                checked={selectAll.includes(genre.id)}
                                                className='w-4 h-4'
                                                onChange={() => handleCheck(genre.id)}
                                            />

                                            <span className='capitalize text-lg'>{genre.name}</span>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>

                    <span
                        className='p-3  bg-slate-300 dark:bg-base200 rounded-md hover:opacity-90 cursor-pointer'
                        onClick={handleFilter}
                    >
                        <BiFilter className='text-xl text-black dark:text-white' />
                    </span>
                </div>

                {/* list card */}

                <div className='flex flex-col gap-y-20 w-full mb-20'>
                    <ul
                        className={clsx(
                            'grid gap-x-1 mobile:gap-x-3 md:gap-x-4 justify-center pc:justify-start gap-y-20 grid-cols-autoMini sm:grid-cols-autoMobile md:grid-cols-autoTablet lg:grid-cols-autoPC'
                        )}
                    >
                        {filter?.map((movie) => (
                            <li key={movie.id}>
                                <Card movie={movie} />
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    )
}

export default Filter
