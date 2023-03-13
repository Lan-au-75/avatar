import { FaPause, FaPlay } from 'react-icons/fa'
import { GoMute, GoUnmute } from 'react-icons/go'
import clsx from 'clsx'
import { useState } from 'react'
import {
    AiFillLike,
    AiOutlineClose,
    AiOutlineDislike,
    AiOutlineLike,
    AiTwotoneDislike,
} from 'react-icons/ai'
import ReactPlayer from 'react-player/youtube'
import HeaderIcon from './HeaderIcon'
import { formattedDate } from '@/hooks/formattedDate'
import { Detail, Video } from '@/types/movies.type'
import timeConvert from '@/hooks/timeConvert'

interface Props {
    close: () => void
    open: boolean
    videos: Video[]
    data: Detail
}

function Modal({ close, open, videos, data }: Props) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [muted, setMuted] = useState(false)
    const [errorVideos, setErrorVideos] = useState<string[]>([])

    // handle stopPropagation
    const handleStop = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
    }

    // handle video error
    const handleVideoError = (video: string) => {
        setErrorVideos((errorVideos) => [...errorVideos, video])
    }

    // render video trailer
    const trailerMovies = videos
        ?.filter((video) => video.type.includes('Trailer') && !errorVideos.includes(video.id))
        ?.map((video) => {
            if (video.type.includes('Trailer') && video?.key) {
                return (
                    <ReactPlayer
                        key={video?.key}
                        url={`https://www.youtube.com/watch?v=${video?.key}`}
                        width='100%'
                        height='100%'
                        style={{ position: 'absolute', top: '0', left: '0' }}
                        playing={isPlaying}
                        muted={muted}
                        onError={() => handleVideoError(video.id)}
                    />
                )
            }
        })

    // fallBack video

    const fallBack = videos?.map((video) => {
        if (
            video.type === 'Teaser' ||
            video.type === 'Featurette' ||
            video.type === 'Official Teaser Trailer' ||
            video.type === 'Official Trailer' ||
            video.type === 'SDCC Trailer'
        ) {
            return (
                <ReactPlayer
                    key={video?.key}
                    url={`https://www.youtube.com/watch?v=${video?.key}`}
                    width='100%'
                    height='100%'
                    style={{ position: 'absolute', top: '0', left: '0' }}
                    playing={isPlaying}
                    muted={muted}
                    onError={() => handleVideoError(video.id)}
                />
            )
        }
    })

    return (
        // overplay
        <div
            className={clsx(
                'items-center justify-center fixed inset-0 bg-black/70',
                open ? 'flex' : 'hidden'
            )}
            onClick={close}
        >
            {/* modal container */}
            <div
                className={clsx(
                    'relative w-full md:w-[70%] rounded-lg bg-base200 overflow-hidden animate-modalFadeIn select-none'
                )}
                onClick={(e) => handleStop(e)}
            >
                <div className='relative pt-[50%] xl:pt-[45%]'>
                    {trailerMovies ? trailerMovies[0] : errorVideos.length > 0 && fallBack}
                    <span
                        className='absolute right-4 top-3 text-xl md:text-2xl text-white bg-base200 rounded-full 
                     p-3 md:p-1 cursor-pointer hover:opacity-80'
                        onClick={close}
                    >
                        <AiOutlineClose />
                    </span>

                    {/* function */}
                    <div className='absolute bottom-5 flex w-full px-5 md:px-10 justify-between  md:gap-4'>
                        <div className='flex items-center gap-3'>
                            <button
                                className='btn2 min-w-[130px] md:min-w-[160px] bg-white text-black flex items-center justify-center rounded-md 
                            hover:opacity-90 gap-2 md:gap-3 outline-none'
                                onClick={() => setIsPlaying(!isPlaying)}
                            >
                                {!isPlaying ? (
                                    <>
                                        <FaPlay className='text-2xl md:text-3xl' />
                                        <span className='font-semibold'>Play</span>
                                    </>
                                ) : (
                                    <>
                                        <FaPause className='text-2xl md:text-3xl' />
                                        <span className='font-semibold  '>Pause</span>
                                    </>
                                )}
                            </button>

                            <HeaderIcon
                                Icon={AiOutlineLike}
                                classIcon='p-3 text-white text-2xl md:text-3xl bg-base200 rounded-full'
                                ActiveIcon={AiFillLike}
                                classActiveIcon='p-3 text-2xl md:text-3xl bg-base200 text-green-500 rounded-full animate-like'
                            />

                            <HeaderIcon
                                Icon={AiOutlineDislike}
                                classIcon='p-3 text-white text-2xl md:text-3xl bg-base200 rounded-full'
                                ActiveIcon={AiTwotoneDislike}
                                classActiveIcon='p-3 text-2xl md:text-3xl bg-base200 text-red-500 rounded-full'
                            />
                        </div>

                        <span
                            className='p-3  text-2xl md:text-3xl bg-base200 rounded-full cursor-pointer'
                            onClick={() => setMuted(!muted)}
                        >
                            {muted ? (
                                <GoMute className='text-white' />
                            ) : (
                                <GoUnmute className='text-green-500' />
                            )}
                        </span>
                    </div>
                </div>
                <div className='flex flex-col gap-y-4 px-5 py-4  md:px-10 md:py-8'>
                    <p className='text-green-500 text-sm gap-3 flex  '>
                        <span className='relative divide'>IMDB {data.vote_average.toFixed(1)}</span>
                        <span className='text-white'> {formattedDate(data)}</span>
                    </p>
                    <div className='flex flex-col md:flex-row justify-between gap-3 md:gap-5'>
                        <p className=' text-lg w-full md:w-[60%] flex-1 text-white'>
                            <span className='line-clamp-4'>{data.overview}</span>
                        </p>
                        <div className='flex flex-col gap-y-3 text-sm'>
                            <p className='text-gray-300'>
                                Genres:{' '}
                                {data.genres.map((genre, i) => (
                                    <span key={genre.id} className='text-white'>
                                        {' '}
                                        {genre.name}
                                        {i !== data.genres.length - 1 ? ',' : ''}
                                    </span>
                                ))}
                            </p>
                            <p className='text-gray-300'>
                                Run time:{' '}
                                <span className='text-white'>{timeConvert(data.runtime)}</span>
                            </p>
                            <p className='text-gray-300'>
                                Original language:{' '}
                                <span className='text-white'>{data.original_language}</span>
                            </p>
                            <p className='text-gray-300'>
                                Total votes: <span className='text-white'> {data.vote_count}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
