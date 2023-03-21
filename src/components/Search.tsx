import { useEffect, useRef, useState, useTransition } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import { IoCloseOutline } from 'react-icons/io5'
import { BiLoaderCircle } from 'react-icons/bi'
import { getSearch } from '@/apis/search.api'
import { handleImgError } from '@/hooks/handleImgError'
import { baseUrl } from '@/requests'
import { Movie } from '@/types/movies.type'
import HeaderIcon from './HeaderIcon'
import { AiOutlineArrowLeft } from 'react-icons/ai'

function Search() {
    const [query, setQuery] = useState<string>('')
    const [data, setData] = useState<Movie[] | null>(null)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [showMenuMobile, setShowMenuMobile] = useState<boolean>(false)
    const [isLoading, startTransition] = useTransition()
    const [debounce] = useDebounce(query, 1000)

    const inputRef = useRef<HTMLInputElement>(null)
    const menuRef = useRef<HTMLUListElement>(null)
    const menuRefMobile = useRef<HTMLUListElement>(null)
    const iconRef = useRef<any>(null)

    // show menu mobile
    const handleSearch = () => {
        setShowMenuMobile(true)
    }

    // hidden menu mobile
    const handleBackMenu = () => {
        setShowMenuMobile(false)
        iconRef.current.setToggleIcon(false)
    }

    //  close input
    const handleCloseInput = () => {
        setQuery('')
        inputRef.current?.focus()
    }

    // debounce
    useEffect(() => {
        if (!debounce.trim()) {
            return
        }
        ;(async function fetchSearch() {
            const res = await getSearch({ query: debounce })
            startTransition(() => setData(res.results))
        })()
    }, [debounce])

    // handle menu when outside
    const handleOutsideClick = (e: MouseEvent) => {
        if (
            (menuRef.current && !menuRef.current.contains(e.target as Node)) ||
            (menuRefMobile.current && !menuRefMobile.current.contains(e.target as Node))
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
            {/* mobile Search */}
            <HeaderIcon
                ref={iconRef}
                Icon={BsSearch}
                ActiveIcon={BsSearch}
                classIcon='iconDefault text-black dark:text-white sm:hidden'
                classActiveIcon='iconActiveDefault sm:hidden'
                offset='top-12 -right-4'
                tooltip='Search'
                onMouseUp={handleSearch}
            />

            {/* menu mobile search  */}
            {showMenuMobile && (
                <div className='fixed top-0 left-0  w-screen h-16 bg-white dark:bg-base200 shadow-lg z-10'>
                    <div className='flex items-center gap-2 md:gap-3 px-3 py-2'>
                        <span
                            className='p-3 rounded-full  dark:text-white hover:bg-slate-300 dark:hover:bg-base100 cursor-pointer'
                            onClick={handleBackMenu}
                        >
                            <AiOutlineArrowLeft className='text-xl md:text:2xl text-base100 dark:text-white' />
                        </span>
                        <div className='relative flex-1 flex items-center text-gray-400 bg-white dark:bg-base200 px-3 py-2 lg:py-1  rounded-2xl gap-2 sm:gap-4 focus-within:border focus-within:border-solid focus-within:border-blue-500'>
                            <span>
                                <BsSearch className='cursor-pointer text-lg' />
                            </span>
                            <input
                                ref={inputRef}
                                value={query}
                                type='text'
                                placeholder='Search'
                                className='outline-none bg-white dark:bg-base200 flex-1 text-lg'
                                onChange={(e) => setQuery(e.target.value)}
                                spellCheck={false}
                                onFocus={() => setShowMenu(true)}
                            />

                            {isLoading ? (
                                <span>
                                    <BiLoaderCircle className='text-lg cursor-pointer animate-spin' />
                                </span>
                            ) : (
                                <span>
                                    <IoCloseOutline
                                        className='text-lg cursor-pointer'
                                        onClick={handleCloseInput}
                                    />
                                </span>
                            )}
                        </div>
                    </div>
                    {/* menu Search */}
                    {query.length > 0 && data && (
                        <ul
                            ref={menuRefMobile}
                            className='absolute top-16 lg:top-10 right-0 flex flex-col gap-y-4 md:gap-y-3 w-full h-screen overflow-y-auto lg:overflow-y-hidden hover:overflow-y-auto scrollBarCustom 
                bg-white dark:bg-base200 py-2 md:py-4 rounded-lg shadow-md border-t border-solid border-gray-400 z-10'
                        >
                            {data?.map((movie) => (
                                <Link
                                    key={movie.id}
                                    to={
                                        movie.media_type !== 'tv'
                                            ? `/detail/${movie.id}`
                                            : `/detailTV/${movie.id}`
                                    }
                                    className='flex items-center gap-2 hover:bg-slate-300 dark:hover:bg-base100 px-2 rounded-md'
                                >
                                    <img
                                        src={`${
                                            baseUrl + (movie?.poster_path || movie?.backdrop_path)
                                        }`}
                                        alt=''
                                        className='h-14 w-14 object-cover object-center rounded-full flex-shrink-0'
                                        onError={(e) => handleImgError(e)}
                                    />

                                    <span className='text-base md:text-lg capitalize line-clamp-2 text-black dark:text-white'>
                                        {movie.original_title || movie.name}
                                    </span>
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* > mobile Search*/}
            <div className='relative hidden min-w-[340px] lg:min-w-[360px] sm:flex items-center text-gray-400 bg-[#F1F1F2] dark:bg-base200 px-3 py-2 lg:py-1  rounded-2xl gap-4 focus-within:border focus-within:border-solid focus-within:border-blue-500'>
                <BsSearch className='cursor-pointer' />
                <input
                    ref={inputRef}
                    value={query}
                    type='text'
                    placeholder='Search'
                    className='outline-none bg-[#F1F1F2] dark:bg-base200 mr-3 flex-1'
                    onChange={(e) => setQuery(e.target.value)}
                    spellCheck={false}
                    onFocus={() => setShowMenu(true)}
                />

                {isLoading ? (
                    <BiLoaderCircle className='text-lg cursor-pointer animate-spin' />
                ) : (
                    <IoCloseOutline className='text-lg cursor-pointer' onClick={handleCloseInput} />
                )}

                {/* menu Search */}
                {query.length > 0 && data && showMenu && (
                    <ul
                        ref={menuRef}
                        className='absolute top-11 lg:top-10 right-0 flex flex-col gap-y-4 md:gap-y-3 w-full max-h-[400px] overflow-y-auto lg:overflow-y-hidden hover:overflow-y-auto scrollBarCustom 
                 bg-white dark:bg-base200 py-2 md:py-4 rounded-lg shadow-md z-10'
                    >
                        {data?.map((movie) => (
                            <Link
                                key={movie.id}
                                to={
                                    movie.media_type !== 'tv'
                                        ? `/detail/${movie.id}`
                                        : `/detailTV/${movie.id}`
                                }
                                className='flex items-center gap-2 hover:bg-slate-300 dark:hover:bg-base100 px-2 rounded-md'
                            >
                                <img
                                    src={`${
                                        baseUrl + (movie?.poster_path || movie?.backdrop_path)
                                    }`}
                                    alt=''
                                    className='h-14 w-14 object-cover object-center rounded-full flex-shrink-0'
                                    onError={(e) => handleImgError(e)}
                                />

                                <span className='text-black dark:text-base100 text-base md:text-lg capitalize line-clamp-2'>
                                    {movie.original_title || movie.name}
                                </span>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default Search
