import { useState } from 'react'
import { NavLink, Outlet, useOutletContext } from 'react-router-dom'
import {
    fetchNowPlaying,
    fetchPopularity,
    fetchTopRated,
    fetchTrendingMovie,
    fetchUpcoming,
} from '@/hooks/fetchApi'
import { useQuery, UseQueryResult } from 'react-query'
import { Movie } from '@/types/movies.type'

interface Props {
    page: number
    setPage: React.Dispatch<React.SetStateAction<string | number>>
    trendingMovie: UseQueryResult<Movie[], unknown>
    nowPlaying: UseQueryResult<Movie[], unknown>
    topRated: UseQueryResult<Movie[], unknown>
    upcoming: UseQueryResult<Movie[], unknown>
    popularity: UseQueryResult<Movie[], unknown>
}

type ContextMovie = { movies: Props }

function Movies() {
    const [page, setPage] = useState<number | string>(1)
    const trendingMovie = useQuery(['trendingData', { page }], () => fetchTrendingMovie(page), {})
    const nowPlaying = useQuery(['nowPlayingData', { page }], async () => fetchNowPlaying(page))
    const topRated = useQuery(['topRatedData', { page }], async () => fetchTopRated(page))
    const upcoming = useQuery(['upcomingData', { page }], async () => fetchUpcoming(page))
    const popularity = useQuery(['popularityData', { page }], async () => fetchPopularity(page))

    const movies = {
        page,
        setPage,
        trendingMovie,
        nowPlaying,
        topRated,
        upcoming,
        popularity,
    }

    return (
        <main className='relative h-screen overflow-y-auto scrollbar-hide flex flex-col items-center flex-1 p-1 md:p-5 pc:items-start mt-5 gap-5 md:gap-7'>
            <div className='absolute top-0 -left-8 h-[300px] w-[300px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
            <div className='absolute top-0 left-1/2 h-[300px] w-[300px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
            <div>
                <ul className='flex w-screen  mobile:justify-center pc:justify-start  overflow-x-auto scrollbar-hide gap-4'>
                    <li className='movie-item'>
                        <NavLink to='trending'>Trending</NavLink>
                    </li>

                    <li className='movie-item'>
                        <NavLink to='now-playing'>Continue watching</NavLink>
                    </li>

                    <li className='movie-item'>
                        <NavLink to='top-rated'>Top rated</NavLink>
                    </li>

                    <li className='movie-item'>
                        <NavLink to='upcoming'>Upcoming</NavLink>
                    </li>

                    <li className='movie-item'>
                        <NavLink to='popular'>Popular</NavLink>
                    </li>
                </ul>
            </div>

            <Outlet context={{ movies }} />
        </main>
    )
}

export default Movies

export function useMovies() {
    return useOutletContext<ContextMovie>()
}
