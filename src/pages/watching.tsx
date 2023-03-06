import { v4 as uuidv4 } from 'uuid'
import Comments from '@/components/Commets'
import ReactPlayer from 'react-player/youtube'
import { NavLink, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import clsx from 'clsx'
import Footer from '@/layouts/Footer'
import { getReview } from '@/apis/review.api'
import { Category, Review } from '@/types/movies.type'
import { fetchDetailMovie } from '@/hooks/fetchApi'
import { isActive } from '@/hooks/isActive'
import { server } from '@/mockapi/server'

interface Watching {
    watchingKey?: string
    detailID?: string
}

function Watching() {
    const [openOverview, setOpenOverview] = useState<boolean>(false)
    const [review, setReview] = useState<Review[]>()
    const { watchingKey, detailID }: Watching = useParams()

    const { data } = useQuery('detailMovie', async () =>
        fetchDetailMovie(Number(detailID), Category.Movie)
    )

    useEffect(() => {
        const video = async () => {
            const review: Review[] = await getReview(Number(detailID), Category.Movie)
            setReview(review)
        }

        video()
    }, [])

    // handle show overview when user click
    const handleShowOverview = () => {
        setOpenOverview(!openOverview)
    }

    return (
        <>
            <div className='relative  pt-[50%] lg:pt-[35%]'>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${watchingKey}`}
                    width='100%'
                    height='100%'
                    style={{ position: 'absolute', top: 0 }}
                    controls
                />
            </div>
            <div className='flex flex-col gap-y-3 md:gap-y-4  px-4 py-6 md:p-10'>
                <ul className='flex items-center justify-center gap-3 md:gap-4'>
                    {server.map((server, serverID) => (
                        <li key={uuidv4()}>
                            <NavLink
                                to={`?server=${server.number}`}
                                className={() =>
                                    clsx(
                                        'btn2 bg-base200 transition-all duration-300 ease-in',
                                        isActive(serverID + 1, 'server') ? 'bg-green-500' : ''
                                    )
                                }
                            >
                                {server.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className='text-green-500 text-3xl md:text-4xl font-semibold'>
                    {data?.name || data?.original_title}
                </div>
                <div className='flex items-center gap-3 md:gap-4'>
                    <div className='text-green-500 flex gap-3 '>
                        <span className='relative divide'>{data?.vote_average.toFixed(1)}</span>
                        <span>{data?.release_date.slice(0, 4)}</span>
                    </div>
                    <p className='flex text-gray-400'>
                        Genres:{' '}
                        {data?.genres.map((genres, i) => (
                            <span key={genres.id} className='pl-1 text-white lowercase'>
                                {genres.name}
                                {i !== data.genres.length - 1 ? ',' : ''}
                            </span>
                        ))}
                    </p>
                </div>
                <div className='flex flex-col gap-y-3 text-lg text-start w-full md:w-[80%]  overflow-hidden text-white'>
                    <span
                        className='flex items-center justify-center flex-shrink-0 select-none w-12 h-12 
                        md:w-10 md:h-10 rounded-lg bg-red-500 text-2xl cursor-pointer'
                        onClick={handleShowOverview}
                    >
                        {openOverview ? '-' : '+'}
                    </span>
                    <p
                        className={clsx(
                            'transition-all duration-500 ease-in-out',
                            openOverview
                                ? 'max-h-[300px] transition-all'
                                : 'max-h-[50px] transition-all'
                        )}
                    >
                        {data?.overview}
                    </p>
                </div>

                <Comments reviews={review} />
            </div>

            <Footer />
        </>
    )
}

export default Watching
