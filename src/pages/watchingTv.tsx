import Comments from '@/components/Commets'
import Footer from '@/layouts/Footer'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getReview } from '@/apis/review.api'
import { Category, Review } from '@/types/movies.type'
import { useQuery } from 'react-query'
import { fetchDetailMovie } from '@/hooks/fetchApi'

interface WatchingTV {
    watchingKey?: string
    detailID?: string
}

function WatchingTV() {
    const [review, setReview] = useState<Review[]>()
    const { watchingKey, detailID }: WatchingTV = useParams()

    const { data } = useQuery('detailMovie', async () =>
        fetchDetailMovie(Number(detailID), Category.Tv)
    )

    console.log({ data })

    useEffect(() => {
        const video = async () => {
            const review: Review[] = await getReview(Number(detailID))
            setReview(review)
        }

        video()
    }, [])

    return (
        <>
            <div className='relative pt-[35%]'>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${watchingKey}`}
                    width='100%'
                    height='100%'
                    style={{ position: 'absolute', top: 0 }}
                    controls
                />
            </div>
            <div className='flex flex-col gap-y-3 md:gap-y-4  px-4 py-6 md:p-10'>
                <div className='text-green-500 text-3xl md:text-4xl font-semibold'>
                    {data?.name || data?.original_title} TV
                </div>
                <div className='flex items-center gap-3 md:gap-4'>
                    <span className='text-green-500'>
                        {data?.vote_average.toFixed(1)} | {data?.release_date?.slice(0, 4)}
                    </span>
                    <p className=' flex gap-2 md:gap-3 text-gray-400'>
                        genres:
                        {data?.genres.map((genres) => (
                            <span className='text-white lowercase'>{genres.name}</span>
                        ))}
                    </p>
                </div>
                <p className='text-lg text-start w-full md:w-[80%] text-white'>{data?.overview}</p>

                <Comments reviews={review} />
            </div>

            <Footer />
        </>
    )
}

export default WatchingTV
