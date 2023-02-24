import clsx from 'clsx'
import { BsPlayFill } from 'react-icons/bs'
import { baseUrl } from '@/requests'
import { Movie } from '@/types/movies.type'
import { NavLink } from 'react-router-dom'

interface Props {
    movie?: Movie
}

function Thumbnail3({ movie }: Props) {
    return (
        <div className='thumbnail min-w-[calc(300px-50px)] h-[calc(300px-80px)] md:min-w-[300px] md:h-[300px]'>
            <img
                src={clsx(baseUrl + movie?.poster_path)}
                alt=''
                className='object-cover object-center w-full h-full'
            />
            <NavLink to='/'>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base100/60 p-4 hover:bg-red-500 rounded-full shadow-lg cursor-pointer'>
                    <BsPlayFill className='' size={24} color='white' />
                </div>
            </NavLink>
            <div className='absolute top-[58%] inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black text-white'>
                <div className='flex flex-col gap-y-2 px-6 py-2'>
                    <h2 className='text-xl md:text-2xl up capitalize line-clamp-1'>
                        {movie?.original_title || movie?.title || movie?.name}
                    </h2>
                    <p>{movie?.release_date}</p>
                    <div className='flex items-center justify-between gap-2 md:gap-4'>
                        <span>42:31</span>
                        <input type='range' name='' id='' min='0' max='100' className='w-full' />
                        <span>1:20:06</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Thumbnail3
