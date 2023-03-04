import { useState, useEffect, startTransition } from 'react'
import { HiBars3BottomLeft } from 'react-icons/hi2'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { baseUrl } from '@/requests'
import { Category, Detail, Video } from '@/types/movies.type'
import ReactPlayer from 'react-player'
import { formattedDate } from '@/hooks/formattedDate'
import Modal from './Modal'
import { fetchDetailMovie } from '@/hooks/fetchApi'
import { getVideo } from '@/apis/getVideo.api'

const socials = [
    {
        path: '/',
        title: 'instagram',
    },
    {
        path: '/',
        title: 'twitter',
    },
    {
        path: '/',
        title: 'facebook',
    },
]

function DetailMovie() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [videoMovie, setVideoMovie] = useState<Video[]>()

    const { detailID } = useParams<{ detailID?: string }>()

    const detailMovie = useQuery('detailMovie', async () =>
        fetchDetailMovie(Number(detailID), Category.Movie)
    )

    let data = detailMovie.data!
    let videos = videoMovie!

    useEffect(() => {
        const video = async () => {
            const res: Video[] = await getVideo(Number(detailID), Category.Movie)
            startTransition(() => {
                setVideoMovie(res)
            })
        }

        video()
    }, [])

    // render list movie trailer
    const trailerMovies = videos?.map((video) => {
        if (video.type === 'Trailer') {
            return (
                <ReactPlayer
                    key={video?.id}
                    url={`https://www.youtube.com/watch?v=${video.key}`}
                    width={254}
                    height={160}
                    controls
                />
            )
        }
    })

    // render a movie trailer

    const trailerMovie = videos?.find((video) => video.type === 'Trailer')

    // handle close and open

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            {data && (
                <section>
                    <div
                        style={{
                            backgroundImage: `url(${
                                baseUrl + (data?.backdrop_path || data?.poster_path)
                            })`,
                        }}
                        className='h-screen bg-no-repeat bg-center bg-cover -z-30'
                    >
                        <div className='flex flex-col md:flex-row justify-between gap-6 md:gap-10 p-4 mobile:p-10 md:p-14'>
                            {/* left */}

                            <div className='flex flex-col h-[530px] w-full md:w-[70%] justify-between'>
                                <div className='flex items-center  justify-between'>
                                    <p className='text-2xl lg:text-3xl font-semibold text-gray-600 text-shadow-md'>
                                        {data?.original_title || data?.name}
                                    </p>
                                    <HiBars3BottomLeft className='text-4xl md:text-3xl text-white cursor-pointer hover:opacity-90' />
                                </div>

                                <div className='text-shadow-md'>
                                    <p className='text-gray-400 text-2xl font-medium'>
                                        <span className='text-white'>{formattedDate(data)}</span>
                                    </p>
                                    <h2 className='text-5xl md:text-7xl text-white font-semibold mt-5'>
                                        {data?.original_title || data?.name}
                                    </h2>
                                    <div className='flex gap-4 md:gap-6 mt-10 text-shadow-lg'>
                                        <Link
                                            to={`/watching/${trailerMovie?.key}/${data?.id}`}
                                            className='btn2 bg-base200/80 op hover:bg-red-500 transition-all ease-linear'
                                        >
                                            Watch now
                                        </Link>
                                        <button
                                            className='btn2 bg-transparent relative btn-effect-2'
                                            onClick={showModal}
                                        >
                                            <span>Watch the trailer</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* right */}
                            <div className='flex flex-col gap-10 justify-between md:gap-14'>
                                <div className='flex items-center gap-4'>
                                    <figure>
                                        <img
                                            src='/avatar-user.jpg'
                                            alt=''
                                            className=' h-10 w-10 rounded-full object-cover object-center'
                                        />
                                    </figure>
                                    <div className='text-shadow-md'>
                                        <p className='text-sm md:text-lg text-white font-semibold capitalize'>
                                            Rito
                                        </p>
                                        <p className='text-gray-400 capitalize'>nothing</p>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-y-5'>
                                    <span className='text-white text-xl text-shadow-md'>
                                        Trailer
                                    </span>

                                    <div className='flex flex-col gap-3 h-[364px] overflow-y-auto scrollbar-hide'>
                                        {' '}
                                        {trailerMovies}
                                    </div>
                                </div>

                                <div className='flex items-center justify-center text-xs gap-3'>
                                    {socials.map((social) => (
                                        <Link to='/' key={social.title}>
                                            <span className='text-white uppercase font-medium cursor-pointer text-shadow-md'>
                                                {social.title}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* modal */}
                    <Modal close={handleCancel} open={isModalOpen} videos={videos} data={data} />
                </section>
            )}
        </>
    )
}

export default DetailMovie
