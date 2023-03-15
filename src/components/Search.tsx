import { useEffect, useRef, useState, useTransition } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import { getSearch } from '@/apis/search.api'
import { handleImgError } from '@/hooks/handleImgError'
import { baseUrl } from '@/requests'
import { Movie } from '@/types/movies.type'
import { IoCloseOutline } from 'react-icons/io5'
import { BiLoaderCircle } from 'react-icons/bi'

function Search() {
    const [query, setQuery] = useState<string>('')
    const [data, setData] = useState<Movie[] | null>(null)
    const [isLoading, startTransition] = useTransition()
    const [debounce] = useDebounce(query, 1000)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleCloseInput = () => {
        setQuery('')
        inputRef.current?.focus()
    }

    useEffect(() => {
        if (!debounce.trim()) {
            return
        }
        ;(async function fetchSearch() {
            const res = await getSearch({ query: debounce })
            startTransition(() => setData(res.results))
        })()
    }, [debounce])

    return (
        <>
            <div className='relative hidden min-w-[340px] lg:min-w-[360px] sm:flex items-center text-gray-400 bg-base200 px-3 py-2 lg:py-1  rounded-2xl gap-4 focus-within:border focus-within:border-solid focus-within:border-blue-500'>
                <BsSearch className='cursor-pointer' />
                <input
                    ref={inputRef}
                    value={query}
                    type='text'
                    placeholder='Search'
                    className='outline-none bg-base200 mr-3 flex-1'
                    onChange={(e) => setQuery(e.target.value)}
                    spellCheck={false}
                />

                {isLoading ? (
                    <BiLoaderCircle className='text-lg cursor-pointer animate-spin' />
                ) : (
                    <IoCloseOutline className='text-lg cursor-pointer' onClick={handleCloseInput} />
                )}

                {/* menu Search */}
                {query.length > 0 && data && (
                    <ul
                        className='absolute top-11 lg:top-10 right-0 flex flex-col gap-y-4 md:gap-y-3 w-full max-h-[400px] overflow-y-hidden hover:overflow-y-auto scrollBarCustom 
                bg-base200 py-2 md:py-4 rounded-lg shadow-md z-10'
                    >
                        {data?.map((movie) => (
                            <Link
                                key={movie.id}
                                to={
                                    movie.media_type !== 'tv'
                                        ? `/detail/${movie.id}`
                                        : `/detailTV/${movie.id}`
                                }
                                className='flex items-center gap-2 hover:bg-base100 px-2 rounded-md'
                            >
                                <img
                                    src={`${
                                        baseUrl + (movie?.poster_path || movie?.backdrop_path)
                                    }`}
                                    alt=''
                                    className='h-14 w-14 object-cover object-center rounded-full flex-shrink-0'
                                    onError={(e) => handleImgError(e)}
                                />

                                <span className='text-base md:text-lg capitalize line-clamp-2'>
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
