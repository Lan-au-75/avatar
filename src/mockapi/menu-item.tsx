import { AiOutlineLogout, AiOutlineBarChart } from 'react-icons/ai'
import { VscCommentDiscussion } from 'react-icons/vsc'
import { GrUnorderedList } from 'react-icons/gr'
import { RiMovie2Line } from 'react-icons/ri'
import { MdDarkMode, MdOutlineList } from 'react-icons/md'
import { BsChevronRight } from 'react-icons/bs'
import { IoLanguageOutline } from 'react-icons/io5'

export const MENU_ITEM = [
    {
        leftIcon: <VscCommentDiscussion />,
        title: 'Discussions',
        to: '#',
    },
    {
        leftIcon: <MdOutlineList />,
        title: 'Lists',
        to: '#',
    },
    {
        leftIcon: <AiOutlineBarChart />,
        title: 'Ratings',
        to: '#',
    },
    {
        leftIcon: <RiMovie2Line />,
        title: 'Watch list',
        to: '#',
    },
    {
        leftIcon: <MdDarkMode />,
        title: 'Appearance: Dark',
        to: '#',
        rightIcon: <BsChevronRight />,
    },
    {
        leftIcon: <IoLanguageOutline />,
        title: 'Language: English',
        to: '#',
        rightIcon: <BsChevronRight />,
    },
    {
        leftIcon: <AiOutlineLogout />,
        title: 'logout',
        to: '/login',
    },
]

export const MENU_ITEM_MOVIES = [
    {
        title: 'Trending Movies',
        to: '/#Trending Movies',
    },
    {
        title: 'Continue Watching',
        to: '/#Continue watching',
    },
    {
        title: 'Top Rated',
        to: '/#Top rated',
    },
    {
        title: 'Upcoming',
        to: '/#Upcoming',
    },
    {
        title: 'Popular',
        to: '/#Popular',
    },
]
