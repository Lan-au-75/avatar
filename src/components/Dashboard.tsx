import Container from './Container'
import Sidebar from './Sidebar'
import Widgets from './Widgets'

import { useLocation } from 'react-router-dom'

import { Outlet } from 'react-router-dom'

function Dashboard() {
    const location = useLocation()

    return (
        <div className='flex justify-between'>
            <Sidebar />

            {location.pathname === '/' ? <Container /> : <Outlet />}

            {/* <Widgets /> */}
        </div>
    )
}

export default Dashboard
