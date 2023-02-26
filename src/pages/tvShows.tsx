import { NavLink, Outlet } from 'react-router-dom'

function TVShow() {
    return (
        <>
            <ul className='flex gap-4'>
                <li>
                    <NavLink to='latest'>latest</NavLink>
                </li>

                <li>
                    <NavLink to='airing_today'>airing today</NavLink>
                </li>

                <li>
                    <NavLink to='on_the_air'>on_the_air</NavLink>
                </li>

                <li>
                    <NavLink to='popular'>popular</NavLink>
                </li>

                <li>
                    <NavLink to='top_rated'>top rated</NavLink>
                </li>
            </ul>

            <Outlet />
        </>
    )
}

export default TVShow
