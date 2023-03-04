import HeaderIcon from './HeaderIcon'

import { MdAdd } from 'react-icons/md'
import { BsCheck } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { Movie } from '@/types/movies.type'
import { baseUrl } from '@/requests'

interface Props {
    movie?: Movie
}

function Thumbnail2({ movie }: Props) {
    return (
        <div className='thumbnail min-w-[calc(500px-200px)] h-[calc(300px-90px)] md:min-w-[500px] md:h-[300px]'>
            <img
                src={clsx(baseUrl + movie?.backdrop_path)}
                alt={movie?.name || movie?.original_title}
                className='object-cover object-center w-full h-full'
            />
            <div className='absolute top-[30%] md:top-1/2 inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black text-white'>
                <div className='flex flex-col gap-y-2 px-6 py-2'>
                    <h2 className='text-xl md:text-2xl up capitalize line-clamp-1'>
                        {movie?.original_title || movie?.title || movie?.name}
                    </h2>
                    <p>{movie?.release_date.slice(0, 4) || movie?.first_air_date.slice(0, 4)}</p>

                    <div className='flex flex-col md:flex-row gap-y-2 md:items-center md:justify-between'>
                        <div className='flex items-center gap-4 text-sm'>
                            <span className='bg-yellow-500 rounded-sm text-black font-semibold p-1 uppercase'>
                                imdb
                            </span>
                            <span>{movie?.vote_average.toString().slice(0, 3)} rating</span>
                        </div>

                        <div className='flex items-end justify-between gap-4'>
                            <Link
                                to={`/detail/${movie?.id}`}
                                className='btn relative min-w-[80px] min-h-[38px]  md:min-w-[100px] md:min-h-[41px]'
                            >
                                Watch now
                            </Link>
                            <HeaderIcon
                                Icon={MdAdd}
                                ActiveIcon={BsCheck}
                                classIcon='iconDefault'
                                classActiveIcon='iconActiveDefault text-white bg-green-500'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Thumbnail2
