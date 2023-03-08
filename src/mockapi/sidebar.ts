import {
    AiFillClockCircle,
    AiFillCompass,
    AiFillHome,
    AiFillStar,
    AiOutlineClockCircle,
    AiOutlineCompass,
    AiOutlineHome,
    AiOutlineSetting,
    AiOutlineStar,
    AiTwotoneSetting,
} from 'react-icons/ai'
import { BiDownload } from 'react-icons/bi'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import { FcAlarmClock } from 'react-icons/fc'
import { HiOutlineUserGroup, HiUserGroup } from 'react-icons/hi'
import { IoHelpCircleOutline, IoHelpCircleSharp } from 'react-icons/io5'

import { TfiAlarmClock } from 'react-icons/tfi'

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

export { sidebarData1, sidebarData2, sidebarData3 }
