import usePagination from '@/hooks/usePagination'
import { Category } from '@/types/movies.type'
import {
    NowPlayingPage,
    PopularityPage,
    TopRatedPage,
    TrendingPage,
    UpcomingPage,
} from '@/types/pagination.type'
import { NavLink, Outlet, useOutletContext } from 'react-router-dom'

interface Props extends TrendingPage, NowPlayingPage, TopRatedPage, UpcomingPage, PopularityPage {}

type ContextMovie = { movies: Props }

function Movies() {
    const movies = usePagination(Category.Movie)

    return (
        <main className='relative h-screen overflow-y-auto scrollbar-hide flex flex-col items-center flex-1 p-2 md:p-5 pc:items-start gap-5 md:gap-7'>
            <div className='absolute top-0 -left-8 h-[300px] w-[300px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
            <div className='absolute top-0 left-1/2 h-[300px] w-[300px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
            <div>
                <ul className='flex w-screen  mobile:justify-center pc:justify-start  overflow-x-auto scrollbar-hide gap-4'>
                    <li className='movie-item'>
                        <NavLink to='trending/1'>Trending</NavLink>
                    </li>

                    <li className='movie-item'>
                        <NavLink to='now-playing/1'>Continue watching</NavLink>
                    </li>

                    <li className='movie-item'>
                        <NavLink to='top-rated/1'>Top rated</NavLink>
                    </li>

                    <li className='movie-item'>
                        <NavLink to='upcoming/1'>Upcoming</NavLink>
                    </li>

                    <li className='movie-item'>
                        <NavLink to='popular/1'>Popular</NavLink>
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
