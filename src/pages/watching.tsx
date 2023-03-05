import Comments from '@/components/Commets'
import Footer from '@/layouts/Footer'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getReview } from '@/apis/review.api'
import { Category, Review } from '@/types/movies.type'
import { useQuery } from 'react-query'
import { fetchDetailMovie } from '@/hooks/fetchApi'

interface Watching {
    watchingKey?: string
    detailID?: string
}

function Watching() {
    const [review, setReview] = useState<Review[]>()
    const { watchingKey, detailID }: Watching = useParams()

    const { data } = useQuery('detailMovie', async () =>
        fetchDetailMovie(Number(detailID), Category.Movie)
    )

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
                            <span className='pl-1 text-white lowercase'>
                                {genres.name}
                                {i !== data.genres.length - 1 ? ',' : ''}
                            </span>
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

export default Watching
