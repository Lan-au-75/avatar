import { baseUrl } from '@/requests'
import { Movie } from '@/types/movies.type'
import clsx from 'clsx'
import { AiFillStar } from 'react-icons/ai'
import { SkeletonCard } from './Skeleton'

interface Props {
    movie: Movie
}

function Card({ movie }: Props) {
    return (
        <div className='relative hover:scale-110 transition-all ease-linear duration-200 w-[180px] lg:w-[250px]'>
            <figure className='max-w-[180px] max-h-[250px] lg:max-w-[250px] md:max-h-[350px]'>
                <img
                    src={clsx(baseUrl + movie?.poster_path)}
                    alt={movie?.name || movie?.original_title}
                    className='object-cover object-center rounded-[30px]'
                />
            </figure>

            <div className='card-content'>
                <h2 className='text-base md:text-xl line-clamp-1'>
                    {movie?.name || movie?.original_title}
                </h2>

                <div className='flex items-center gap-1'>
                    <AiFillStar size={16} className='text-yellow-500' />
                    <span className='text-sm rounded-xl'>
                        {movie?.vote_average.toString().slice(0, 3)}
                    </span>
                </div>
                <span className='text-base'>{movie?.release_date}</span>
            </div>
        </div>
    )
}

export default Card
