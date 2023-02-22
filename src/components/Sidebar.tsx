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

interface Props {
    className?: string
}

const sidebarData1 = [
    {
        href: 'home',
        title: 'Home',
        Icon: AiOutlineHome,
        ActiveIcon: AiFillHome,
    },
    {
        href: 'movie',
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
            <ul className='flex flex-col gap-y-4 py-6'>
                <label htmlFor='' className='px-3 uppercase'>
                    Menu
                </label>
                {sidebarData1.map((item) => (
                    <SidebarRow
                        key={item.title}
                        href={item.href}
                        title={item.title}
                        Icon={item.Icon}
                        ActiveIcon={item.ActiveIcon}
                    />
                ))}
            </ul>

            <ul className='flex flex-col gap-y-4 py-6'>
                <label htmlFor='' className='px-3 uppercase'>
                    Library
                </label>
                {sidebarData2.map((item) => (
                    <SidebarRow
                        key={item.title}
                        href={item.href}
                        title={item.title}
                        Icon={item.Icon}
                        ActiveIcon={item.ActiveIcon}
                    />
                ))}
            </ul>

            <ul className='flex flex-col gap-y-4 py-6'>
                {sidebarData3.map((item) => (
                    <SidebarRow
                        key={item.title}
                        href={item.href}
                        title={item.title}
                        Icon={item.Icon}
                        ActiveIcon={item.ActiveIcon}
                    />
                ))}
            </ul>
        </aside>
    )
}

export default Sidebar
