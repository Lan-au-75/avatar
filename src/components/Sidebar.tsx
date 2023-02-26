import {
    AiOutlineHome,
    AiFillHome,
    AiOutlineCompass,
    AiFillCompass,
    AiOutlineClockCircle,
    AiFillClockCircle,
    AiOutlineStar,
    AiFillStar,
    AiOutlineSetting,
    AiTwotoneSetting,
} from 'react-icons/ai'
import { HiOutlineUserGroup, HiUserGroup } from 'react-icons/hi'
import { TfiAlarmClock } from 'react-icons/tfi'
import { FcAlarmClock } from 'react-icons/fc'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import { BiDownload } from 'react-icons/bi'
import { IoHelpCircleOutline, IoHelpCircleSharp } from 'react-icons/io5'
import { MdMovie, MdLocalMovies } from 'react-icons/md'
import { RiMovie2Line, RiMovie2Fill } from 'react-icons/ri'

import SidebarRow from './SidebarRow'
import clsx from 'clsx'
import SidebarMenu from './SidebarMenu'

interface Props {
    className?: string
}

const sidebarData1 = [
    {
        href: '/',
        title: 'Home',
        Icon: AiOutlineHome,
        ActiveIcon: AiFillHome,
        active: true,
    },

    {
        href: 'discovery',
        title: 'Discovery',
        Icon: AiOutlineCompass,
        ActiveIcon: AiFillCompass,
    },
    {
        href: 'community',
        title: 'Community',
        Icon: HiOutlineUserGroup,
        ActiveIcon: HiUserGroup,
    },
    {
        href: 'coming soon',
        title: 'Coming soon',
        Icon: TfiAlarmClock,
        ActiveIcon: FcAlarmClock,
    },
]

const navbarData = [
    {
        href: '/movies',
        title: 'Movie',
        Icon: MdMovie,
        ActiveIcon: MdMovie,
    },
    {
        href: 'series',
        title: 'Series',
        Icon: MdLocalMovies,
        ActiveIcon: MdLocalMovies,
    },
    {
        href: 'tv shows',
        title: 'Tv shows',
        Icon: RiMovie2Line,
        ActiveIcon: RiMovie2Fill,
    },
]

const sidebarData2 = [
    {
        href: 'recent',
        title: 'Recent',
        Icon: AiOutlineClockCircle,
        ActiveIcon: AiFillClockCircle,
    },
    {
        href: 'bookmarked',
        title: 'Bookmarked',
        Icon: BsBookmarkStar,
        ActiveIcon: BsBookmarkStarFill,
    },
    {
        href: 'top rated',
        title: 'Top rated',
        Icon: AiOutlineStar,
        ActiveIcon: AiFillStar,
    },
    {
        href: 'downloaded',
        title: 'Downloaded',
        Icon: BiDownload,
        ActiveIcon: BiDownload,
    },
]

const sidebarData3 = [
    {
        href: 'settings',
        title: 'Settings',
        Icon: AiOutlineSetting,
        ActiveIcon: AiTwotoneSetting,
    },
    {
        href: 'help',
        title: 'Help',
        Icon: IoHelpCircleOutline,
        ActiveIcon: IoHelpCircleSharp,
    },
]

function Sidebar({ className }: Props) {
    return (
        <aside className={clsx('sidebar', className)}>
            <SidebarMenu title='Menu' data={sidebarData1} />
            <div className='pc:hidden'>
                <SidebarMenu data={navbarData} />
            </div>
            <SidebarMenu title='Library' data={sidebarData2} />
            <SidebarMenu data={sidebarData3} />
        </aside>
    )
}

export default Sidebar
