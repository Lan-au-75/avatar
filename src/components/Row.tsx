import clsx from 'clsx'
import { memo } from 'react'
import { useRef, useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { Movie } from '@/types/movies.type'
import { SkeletonRow } from './Skeleton'

enum Direction {
    Left = 'left',
    Right = 'right',
}

interface Props {
    title?: string
    movies?: Movie[]
    Thumbnail?: any
    isLoading?: boolean
}

function Row({ title, movies, Thumbnail, isLoading }: Props) {
    const rowRef = useRef<HTMLDivElement>(null)
    const [isMoved, setIsMoved] = useState<boolean>(false)
    // const [showScrollButton, setShowScrollButton] = useState(true)
    const navigate = useNavigate()

    // Skeleton
    if (isLoading) {
        return <SkeletonRow />
    }

    // handleClick when scroll left or right
    const handleClick = (direction: string) => {
        setIsMoved(true)
        if (rowRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = rowRef.current

            const scrollTo =
                direction === Direction.Left ? scrollLeft - clientWidth : scrollLeft + clientWidth

            rowRef.current.scrollTo({
                left: scrollTo,
                behavior: 'smooth',
            })

            // handle scrollLeft = 0 hidden button prev
            // scrollLeft === 0 ? setIsMoved(false) : setIsMoved(true)

            // handle when scroll end or start

            // scrollWidth === scrollLeft + clientWidth
            //     ? setShowScrollButton(false)
            //     : setShowScrollButton(true)
        }
    }

    // handle move page when click See all
    const handleMovedPage = () => {
        switch (title) {
            case 'Trending Movies':
                navigate('/movies/trending?page=1')
                break

            case 'Continue watching':
                navigate('/movies/now-playing?page=1')
                break

            case 'Top rated':
                navigate('/movies/top-rated?page=1')
                break

            case 'Upcoming':
                navigate('/movies/upcoming?page=1')
                break

            case 'Popular':
                navigate('/movies/popular?page=1')
                break

            default:
                navigate('/')
                break
        }
    }

    return (
        <>
            <div id={title} className='relative flex  flex-col gap-y-4'>
                <div className='absolute top-0 -left-8 h-[200px] w-[200px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
                <div className='absolute top-0 -left-8 h-[200px] w-[200px] rounded-full bg-blue-500 blur-3xl -z-10'></div>

                <div className='flex items-center justify-between'>
                    <h2 className='text-xl text-secondary dark:text-white font-bold capitalize'>
                        {title}
                    </h2>
                    <div
                        className='flex items-center gap-1 text-base100 hover:text-red-500 cursor-pointer transition-all duration-200 ease-in-out'
                        onClick={handleMovedPage}
                    >
                        See all
                        <AiOutlineRight className='text-base' />
                    </div>
                </div>
                <div className='relative group'>
                    <div
                        className={clsx('absolute left-2 scroll-x', !isMoved && 'hidden')}
                        onClick={() => handleClick(Direction.Left)}
                    >
                        <BiChevronLeft className='text-black/75 hover:text-black text-2xl' />
                    </div>

                    <div
                        ref={rowRef}
                        className='flex w-screen items-center gap-2 md:gap-3 overflow-x-scroll scrollbar-hide'
                    >
                        {movies?.map((movie) => (
                            <Thumbnail key={movie.id} movie={movie} />
                        ))}
                    </div>

                    <span
                        className={clsx('absolute right-2 scroll-x')}
                        onClick={() => handleClick(Direction.Right)}
                    >
                        <BiChevronRight className='text-black/75 hover:text-black text-2xl' />
                    </span>
                </div>
            </div>
        </>
    )
}

export default memo(Row)
