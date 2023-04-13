import ReactPlayer from 'react-player/youtube'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import queryString from 'query-string'
import Comments from '@/components/Commets'
import Footer from '@/layouts/Footer'
import { getReview } from '@/apis/review.api'
import { Category, Review } from '@/types/movies.type'
import { fetchDetailMovie } from '@/hooks/fetchApi'
import { isActive } from '@/hooks/isActive'
import { server } from '@/mockapi/server'

interface Watching {
    detailID?: string
}

function Watching() {
    const [openOverview, setOpenOverview] = useState<boolean>(false)
    const [review, setReview] = useState<Review[]>()
    const { detailID }: Watching = useParams()

    const location = useLocation()
    const params = queryString.parse(location.search)

    const { data } = useQuery('detailMovie', async () => fetchDetailMovie(Number(detailID), Category.Tv))

    // handle show overview when user click
    const handleShowOverview = () => {
        setOpenOverview(!openOverview)
    }

    return (
        <>
            {data && (
                <>
                    <div className='relative  pt-[50%] lg:pt-[35%]'>
                        <iframe
                            width='100%'
                            height='100%'
                            style={{ position: 'absolute', top: 0 }}
                            src={`https://2embed.org/embed/series?tmdb=${detailID}&s=${params.season}&e=${params.episodes}`}
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className='flex flex-col gap-y-3 md:gap-y-4  px-4 py-6 md:p-10 bg-white dark:bg-secondary'>
                        <ul className='flex items-center justify-center gap-3 md:gap-4'>
                            {server.map((server, serverID) => (
                                <li key={uuidv4()}>
                                    <NavLink
                                        to={`?server=${server.number}&season=1&episodes=1`}
                                        className={() =>
                                            clsx(
                                                'btnCustom text-black dark:text-white text-lg capitalize px-3 py-3 md:min-w-[172px] min-w-[100px]  min-h-[40px] ',
                                                isActive(serverID + 1, 'server')
                                                    ? 'bg-green-500'
                                                    : 'bg-gray-300 dark:bg-base200'
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
                                <span>
                                    {data?.release_date?.slice(0, 4) || data?.first_air_date.slice(0, 4)}
                                </span>
                            </div>
                            <p className='flex flex-wrap text-gray-400'>
                                Genres:{' '}
                                {data?.genres?.map((genres, i) => (
                                    <span
                                        key={genres.id}
                                        className='pl-1 text-black dark:text-white lowercase'
                                    >
                                        {genres.name}
                                        {i !== data.genres.length - 1 ? ',' : ''}
                                    </span>
                                ))}
                            </p>
                        </div>
                        <div className='flex flex-col gap-y-3 text-lg text-start w-full md:w-[80%]  overflow-hidden text-black dark:text-white'>
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
                                {data?.overview || data?.number_of_episodes}
                            </p>
                        </div>

                        <ul className='flex item-center gap-3 md:gap-4 overflow-x-auto scrollBarCustom '>
                            {data?.seasons?.map((season) => {
                                return (
                                    <li
                                        key={uuidv4()}
                                        className='flex-shrink-0 btnCustom min-w-[50px] min-h-10  text-lg md:text-xl hover:bg-red-500 capitalize dark:bg-base200 bg-slate-400 rounded-xl text-white '
                                    >
                                        <NavLink
                                            to={`?server=${params.server}&season=${
                                                season.season_number !== 0 ? season.season_number : ''
                                            }&episodes=1`}
                                            className={clsx(
                                                'inline-block p-3',
                                                isActive(season.season_number, 'season')
                                                    ? 'bg-red-500 rounded-xl'
                                                    : ''
                                            )}
                                        >
                                            {season.name}
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>

                        <ul className=''>
                            {data?.seasons?.map((season, seasonID) => {
                                const arrNumberEpisodes: number[] = Array(season.episode_count)
                                    .fill('')
                                    ?.map((__, index) => index + 1)

                                return (
                                    <li key={uuidv4()} className='flex items-center gap-3 md:gap-4 flex-wrap'>
                                        {params.season === (seasonID + 1).toString() &&
                                            arrNumberEpisodes?.map((episodes: number) => (
                                                <NavLink
                                                    key={uuidv4()}
                                                    to={`?server=${params.server}&season=${params.season}&episodes=${episodes}`}
                                                    className={clsx(
                                                        'btn-number',
                                                        isActive(episodes, 'episodes')
                                                            ? 'bg-green-500 dark:bg-green-500'
                                                            : ''
                                                    )}
                                                >
                                                    {episodes}
                                                </NavLink>
                                            ))}
                                    </li>
                                )
                            })}
                        </ul>

                        <Comments />
                    </div>
                </>
            )}

            <Footer />
        </>
    )
}

export default Watching
