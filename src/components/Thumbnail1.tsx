import { AiFillStar } from 'react-icons/ai'
import { MdAdd } from 'react-icons/md'
import { BsCheck } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import HeaderIcon from './HeaderIcon'
import { Movie } from '@/types/movies.type'
import clsx from 'clsx'
import { baseUrl } from '@/requests'

interface Props {
    movie?: Movie
}

function Thumbnail1({ movie }: Props) {
    return (
        <div className='relative min-w-[calc(400px-160px)] h-[calc(250px-90px)] md:min-w-[400px] md:h-[250px] rounded-lg select-none overflow-hidden'>
            <div className='absolute top-3 right-5 flex items-center gap-1 bg-black/80 px-2 py-1 rounded-2xl'>
                <AiFillStar className='text-yellow-500' size={16} />
                <span className='text-white text-sm'>{movie?.vote_average}</span>
            </div>
            <img
                src={clsx(baseUrl + movie?.backdrop_path)}
                alt=''
                className='object-cover object-center w-full h-full'
            />
            <div className='absolute top-[20%] md:top-[40%] inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black text-white'>
                <div className='flex flex-col gap-y-2 px-6 py-2'>
                    <h2 className='text-xl md:text-2xl up capitalize line-clamp-1'>
                        {movie?.original_title || movie?.title}
                    </h2>
                    <p>{movie?.vote_average.toString().slice(0, 3)}</p>
                    <div className='flex items-end justify-between'>
                        <Link to='/' className='btn relative min-w-[100px] min-h-[41px]'>
                            Watch now
                        </Link>
                        <HeaderIcon Icon={MdAdd} ActiveIcon={BsCheck} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Thumbnail1
