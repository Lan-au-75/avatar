import { NavLink, Outlet } from 'react-router-dom'

function TVShow() {
    return (
        <main className='relative h-screen overflow-y-auto scrollbar-hide flex flex-col items-center flex-1 p-2 md:p-5 pc:items-start gap-5 md:gap-7'>
            <div className='absolute top-0 -left-8 h-[300px] w-[300px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
            <div className='absolute top-0 left-1/2 h-[300px] w-[300px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
            <div>
                <ul className='flex w-screen  mobile:justify-center pc:justify-start  overflow-x-auto scrollbar-hide gap-4'>
                    <li className='movie-item capitalize'>
                        <NavLink to='airingToDay?page=1'>airing today</NavLink>
                    </li>
                </ul>
            </div>

            <Outlet />
        </main>
    )
}

export default TVShow
