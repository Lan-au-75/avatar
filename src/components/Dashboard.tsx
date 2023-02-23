import Container from './Container'
import Sidebar from './Sidebar'
import Widgets from './Widgets'

function Dashboard() {
    return (
        <div className='flex justify-between'>
            <Sidebar />
            <Container />
            {/* <Widgets /> */}
        </div>
    )
}

export default Dashboard
