import { Outlet, useLocation } from 'react-router-dom'
import Container from './Container'
import Sidebar from './Sidebar'

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
