import clsx from 'clsx'
import { AiFillStar } from 'react-icons/ai'
import { BsCheck } from 'react-icons/bs'
import { MdAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { baseUrl } from '@/requests'
import { Movie } from '@/types/movies.type'
import HeaderIcon from './HeaderIcon'

interface Props {
    movie: Movie
    handleShowToast?: (movie: Movie) => Promise<void>
}

function Thumbnail1({ movie, handleShowToast }: Props) {
    return (
        <div className='thumbnail min-w-[calc(400px-160px)] h-[calc(250px-90px)] md:min-w-[400px] md:h-[250px]'>
            <div className='absolute top-3 right-5 flex items-center gap-1 bg-black/80 px-2 py-1 rounded-2xl'>
                <AiFillStar className='text-yellow-500' size={16} />
                <span className='text-white text-sm'>
                    {movie?.vote_average.toString()?.slice(0, 3)}
                </span>
            </div>
            <img
                src={clsx(baseUrl + movie?.backdrop_path)}
                alt={movie?.name || movie?.original_title}
                className='object-cover object-center w-full h-full'
            />

            <div className='absolute top-[26%] md:top-[40%] inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black text-white'>
                <div className='flex flex-col gap-y-2 px-6 py-2'>
                    <h2 className='text-xl md:text-2xl up capitalize line-clamp-1'>
                        {movie?.original_title || movie?.title || movie?.name}
                    </h2>
                    <p>{movie?.vote_average.toString()?.slice(0, 3)}</p>
                    <div className='flex items-end justify-between'>
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
                            onMouseUp={() => {
                                if (typeof handleShowToast === 'function') {
                                    handleShowToast(movie as Movie)
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Thumbnail1
