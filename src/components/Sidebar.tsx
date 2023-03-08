import { navbarData } from '@/mockapi/navbar'
import { sidebarData1, sidebarData2, sidebarData3 } from '@/mockapi/sidebar'
import clsx from 'clsx'
import SidebarMenu from './SidebarMenu'
import { useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

interface Props {
    className?: string
}

function Sidebar({ className }: Props) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    // toggle sidebar-collapse
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <div className='flex relative'>
            <aside
                className={clsx('sidebar', className, isCollapsed ? 'w-[70px]' : 'w-[300px] p-4')}
            >
                <SidebarMenu title='Menu' data={sidebarData1} isCollapsed={isCollapsed} />
                <div className='pc:hidden'>
                    <SidebarMenu data={navbarData} />
                </div>
                <SidebarMenu title='Library' data={sidebarData2} isCollapsed={isCollapsed} />
                <div className='mb-14'>
                    <SidebarMenu data={sidebarData3} isCollapsed={isCollapsed} />
                </div>
            </aside>

            {/* click sidebar collapse */}
            <div
                className='flex items-center justify-center rounded-full absolute top-8 -right-2 w-6 bg-blue-500 hover:scale-105 
            h-6 cursor-pointer transition-all duration-300 ease-in-out z-10'
                onClick={toggleSidebar}
            >
                {isCollapsed ? (
                    <AiOutlineRight className='text-sm text-white' />
                ) : (
                    <AiOutlineLeft className='text-sm text-white' />
                )}
            </div>
        </div>
    )
}

export default Sidebar
