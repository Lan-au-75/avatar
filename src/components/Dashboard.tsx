import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import TodoList from './TodoList'

function Dashboard() {
    const location = useLocation()

    return (
        <div className='flex justify-between'>
            <Sidebar />

            {location.pathname === '/dashboard' ? <TodoList /> : <Outlet />}
        </div>
    )
}

export default Dashboard
