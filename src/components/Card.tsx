import { AiFillStar } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'
import { handleImgError } from '@/hooks/handleImgError'
import { baseUrl } from '@/requests'
import { Movie, TV } from '@/types/movies.type'

interface Props {
    movie: Movie | TV
}

function Card({ movie }: Props) {
    const location = useLocation()
    const navigate = useNavigate()

    // handle navigate when path movie/tv
    const handleNavigate = () => {
        if (location.pathname.match('movies')) {
            navigate(`/detail/${movie.id} `)
        } else {
            navigate(`/detailTV/${movie.id}`)
        }
    }

    return (
        <div className='relative hover:scale-110 transition-all ease-linear duration-200 w-[180px] sm:w-[200px] md:w-[230px] lg:w-[250px] cursor-pointer'>
            <div onClick={handleNavigate}>
                <figure className='relative pt-[100%] min-h-[270px] sm:min-h-[330px] md:min-h-[350px] '>
                    <img
                        src={`${baseUrl + (movie?.poster_path || movie?.backdrop_path)}`}
                        alt={movie.original_title || movie.name}
                        className='absolute top-0 bottom-0 object-cover object-center rounded-t-[30px] '
                        onError={(e) => handleImgError(e)}
                    />
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
