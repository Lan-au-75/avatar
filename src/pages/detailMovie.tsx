import { getVideo } from '@/apis/getVideo.api'
import SEO from '@/components/SEO'
import { fetchDetailMovie } from '@/hooks/fetchApi'
import { formattedDate } from '@/hooks/formattedDate'
import { baseUrl } from '@/requests'
import { Category, Video } from '@/types/movies.type'
import { startTransition, useEffect, useState } from 'react'
import { HiBars3BottomLeft } from 'react-icons/hi2'
import ReactPlayer from 'react-player/youtube'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import Modal from '../components/Modal'
import { userAth } from '@/context/AuthContext'
import { handleImgError } from '@/hooks/handleImgError'

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
    const { user, fullName } = userAth()
    const { detailID } = useParams<{ detailID?: string }>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [videoMovie, setVideoMovie] = useState<Video[]>()
    const [isPlaying, setIsPlaying] = useState(false)
    const [errorVideos, setErrorVideos] = useState<string[]>([])

    const detailMovie = useQuery('detailMovie', async () =>
        fetchDetailMovie(Number(detailID), Category.Movie)
    )

    const data = detailMovie.data!
    const videos = videoMovie!

    useEffect(() => {
        const video = async () => {
            const res: Video[] = await getVideo(Number(detailID), Category.Movie)
            startTransition(() => {
                setVideoMovie(res)
            })
        }

        video()
    }, [])

    // handle video error
    const handleVideoError = (videoId: string) => {
        setErrorVideos((errorVideos) => [...errorVideos, videoId])
    }

    // render a movie trailer

    const trailerMovie = videos?.find((video) => video.type.includes('Trailer'))

    // render list movie trailer
    const trailerMovies = videos
        ?.filter((video) => video.type.includes('Trailer') && !errorVideos.includes(video.id))
        ?.map((video) => {
            if (video.type.includes('Trailer') && video.key) {
                return (
                    <ReactPlayer
                        key={video?.id}
                        url={`https://www.youtube.com/watch?v=${video.key}`}
                        width='100%'
                        height='100%'
                        controls
                        onError={() => handleVideoError(video.id)}
                    />
                )
            }
            return null
        })

    // fallBack video

    const fallBack = videos
        ?.filter(
            (video) =>
                (video.type.includes('Teaser') || video.type.includes('Featurette')) &&
                !errorVideos.includes(video.id)
        )
        ?.map((video) => {
            if (video.key) {
                return (
                    <ReactPlayer
                        key={video?.key}
                        url={`https://www.youtube.com/watch?v=${video.key}`}
                        width='100%'
                        height='100%'
                        controls
                        onError={() => handleVideoError(video.id)}
                    />
                )
            }
            return null
        })

    // handle close and open

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setIsPlaying(false)
    }

    return (
        <>
            <SEO
                title={`${data?.original_title || data?.name} - avatar`}
                description={data?.original_title || data?.name}
            />
            {data && (
                <section className='relative isolate'>
                    <div
                        style={{
                            backgroundImage: `url(${baseUrl + (data?.backdrop_path || data?.poster_path)})`,
                        }}
                        className='h-screen bg-no-repeat bg-center bg-cover -z-30'
                    >
                        <div className='absolute inset-0 bg-black/5 flex flex-col md:flex-row justify-between gap-6 md:gap-10 p-4 mobile:p-10 md:p-16'>
                            {/* left */}

                            <div className='flex  flex-col h-[530px] w-full md:w-[70%] justify-between'>
                                <div className='flex items-center  justify-between'>
                                    <p className='text-2xl lg:text-3xl font-semibold text-red-500 text-shadow-md line-clamp-2'>
                                        {data?.original_title || data?.name}
                                    </p>
                                    <HiBars3BottomLeft className='text-4xl md:text-3xl text-white cursor-pointer hover:opacity-90' />
                                </div>

                                <div className='text-shadow-md md:pl-[6px]'>
                                    <p className='text-gray-400 text-2xl font-medium pt-2 md:pt-0 md:pl-[6px]'>
                                        <span className='text-white'>{formattedDate(data)}</span>
                                    </p>
                                    <h2 className='text-5xl md:text-7xl text-white font-semibold mt-5 line-clamp-3'>
                                        {data?.original_title || data?.name}
                                    </h2>
                                    <div className='flex gap-4 md:gap-6 mt-10 text-shadow-lg'>
                                        <Link
                                            to={`/watching/${trailerMovie?.key}/${data?.id}?server=1`}
                                            className='btn2 bg-base200/80  hover:bg-red-500 transition-all ease-linear'
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
                            <div className='flex flex-col gap-6 md:gap-10'>
                                <div className='flex items-center gap-4'>
                                    <figure>
                                        <img
                                            src={(user?.photoURL as string) || '/user-account.jpg'}
                                            alt={user?.displayName as string}
                                            onError={(e) => handleImgError(e, '/no-img-avatar.png')}
                                            className='h-16 w-16 md:h-10 md:w-10 rounded-full flex-shrink-0 object-cover object-center cursor-pointer'
                                        />
                                    </figure>
                                    <div className='text-shadow-md'>
                                        <p className='text-xl  md:text-lg text-white font-semibold'>
                                            {user?.displayName || fullName}
                                        </p>
                                        <p className='text-lg md:text-base text-gray-400'>{user?.email}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-y-5'>
                                    <span className='text-white text-xl text-shadow-md capitalize'>
                                        Trailer
                                    </span>
                                    <div className='h-[364px] overflow-y-auto scrollbar-hide'>
                                        <ul className='flex flex-col gap-3 w-full h-full sm:w-[254px] sm:h-[160px]'>
                                            {trailerMovies}
                                            {fallBack}
                                        </ul>
                                    </div>
                                </div>

                                <hr className='border border-solid mx-4 border-red-500' />

                                <div className='flex items-center justify-center text-xs gap-3 mb-10 md:mb-0'>
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
                    <Modal
                        close={handleCancel}
                        open={isModalOpen}
                        videos={videos}
                        data={data}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                    />
                </section>
            )}
        </>
    )
}

export default DetailMovie
