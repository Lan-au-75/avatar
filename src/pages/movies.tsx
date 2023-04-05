import CircleShadow from '@/components/CircleShadow'
import { NavLink, Outlet } from 'react-router-dom'

function Movies() {
    return (
        <main className='relative h-screen overflow-y-auto scrollbar-hide flex flex-col items-center flex-1 sm:p-2 md:p-5 pc:items-start gap-5 md:gap-7'>
            <CircleShadow />
            <div>
                <ul className='flex w-screen  mobile:justify-center pc:justify-start  overflow-x-auto scrollbar-hide gap-4'>
                    <li className='movie-item'>
                        <NavLink to='trending?page=1'>Trending</NavLink>
                    </li>

                    <li className='movie-item'>
                        <NavLink to='now-playing?page=1'>Continue watching</NavLink>
                    </li>

                    <li className='movie-item'>
                        <NavLink to='top-rated?page=1'>Top rated</NavLink>
                    </li>

                    <li className='movie-item'>
                        <NavLink to='upcoming?page=1'>Upcoming</NavLink>
                    </li>

                    <li className='movie-item'>
                        <NavLink to='popular?page=1'>Popular</NavLink>
                    </li>
                </ul>
            </div>

            <Outlet />
        </main>
    )
}

export default Movies
