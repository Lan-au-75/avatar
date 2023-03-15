import { useEffect, useRef } from 'react'
import { handleImgError } from '@/hooks/handleImgError'
import { MENU_ITEM_CARD1, MENU_ITEM_CARD2 } from '@/mockapi/menu-item'
import { baseUrl } from '@/requests'
import { Movie, TV } from '@/types/movies.type'
import { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'
import MenuBox from './MenuBox'

interface Props {
    movie: Movie | TV
}

function Card({ movie }: Props) {
    const location = useLocation()
    const navigate = useNavigate()

    const [showMenu, setShowMenu] = useState<boolean>(false)

    const menuRef = useRef<HTMLInputElement>(null)
    const iconRef = useRef<HTMLInputElement>(null)

    // handle menu when outside
    const handleOutsideClick = (e: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(e.target as Node) &&
            !iconRef.current?.contains(e.target as Node)
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

    // show menu when click
    const handleOpenMenu = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation()
        setShowMenu(!showMenu)
    }

    // handle navigate when path movie/tv
    const handleNavigate = () => {
        if (movie.media_type !== 'tv') {
            navigate(`/detail/${movie.id} `)
        } else {
            navigate(`/detailTV/${movie.id}`)
        }
    }

    return (
        <div className='relative hover:scale-110 transition-all ease-linear duration-200 cursor-pointer'>
            <div onClick={handleNavigate}>
                <figure
                    title={movie?.name || movie?.original_title}
                    className='relative pt-[100%] min-h-[270px] sm:min-h-[330px] md:min-h-[350px] '
                >
                    <img
                        src={`${baseUrl + (movie?.poster_path || movie?.backdrop_path)}`}
                        alt={movie.original_title || movie.name}
                        className='absolute top-0 bottom-0 object-cover object-center rounded-t-[30px] '
                        onError={(e) => handleImgError(e)}
                    />
                    <span
                        ref={iconRef}
                        onClick={(e) => handleOpenMenu(e)}
                        className='absolute top-2 right-2 p-2 rounded-full hover:bg-white/30'
                    >
                        <BsThreeDotsVertical className='text-base100 text-xl md:text-lg' />
                    </span>
                    {showMenu && (
                        <MenuBox
                            ref={menuRef}
                            movie={movie}
                            menuItem={
                                location.pathname !== '/bookmarked'
                                    ? MENU_ITEM_CARD1
                                    : MENU_ITEM_CARD2
                            }
                            className='absolute top-11 right-0 md:right-2 min-w-full min-h-full md:min-w-[80px] md:min-h-[50px] bg-base200 rounded-md origin-top-right shadow-md'
                        />
                    )}
                </figure>
            </div>

            <div className='card-content'>
                <h2 className='text-base md:text-xl line-clamp-1'>
                    {movie?.name || movie?.original_title}
                </h2>

                <div className='flex items-center gap-1'>
                    <AiFillStar size={16} className='text-yellow-500' />
                    <span className='text-sm rounded-xl'>
                        {movie?.vote_average?.toString()?.slice(0, 3)}
                    </span>
                </div>
                {movie?.release_date ? (
                    <span className='text-base'>{movie?.release_date?.slice(0, 4)}</span>
                ) : (
                    <span className='text-base'>{movie.first_air_date?.slice(0, 4)}</span>
                )}
            </div>
        </div>
    )
}

export default Card
