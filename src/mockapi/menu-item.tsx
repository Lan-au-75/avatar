import { AiOutlineBarChart, AiOutlineLogout } from 'react-icons/ai'
import { BsChevronRight } from 'react-icons/bs'
import { IoLanguageOutline } from 'react-icons/io5'
import { MdDarkMode, MdOutlineList } from 'react-icons/md'
import { RiMovie2Line } from 'react-icons/ri'
import { VscCommentDiscussion } from 'react-icons/vsc'
import { RxDashboard } from 'react-icons/rx'

export const MENU_ITEM = [
    {
        leftIcon: <RxDashboard />,
        title: 'Dashboard',
        to: 'dashboard',
    },
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
        children: {
            title: 'Appearance',
            data: [
                {
                    title: 'Dark',
                },
                {
                    title: 'Light',
                },
            ],
        },
    },
    {
        leftIcon: <IoLanguageOutline />,
        title: 'Language: English',
        to: '#',
        rightIcon: <BsChevronRight />,
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'VietNamese',
                },
                {
                    code: '',
                    title: 'العربية',
                },
                {
                    code: '',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: '',
                    title: 'Cebuano (Pilipinas)',
                },
                {
                    code: '',
                    title: 'Čeština (Česká republika)',
                },
                {
                    code: '',
                    title: 'Deutsch',
                },
                {
                    code: '',
                    title: 'Ελληνικά (Ελλάδα)',
                },
                {
                    code: '',
                    title: 'Español',
                },
                {
                    code: '',
                    title: 'Suomi (Suomi)',
                },
                {
                    code: '',
                    title: 'Filipino (Pilipinas)',
                },
                {
                    code: '',
                    title: 'Français',
                },
                {
                    code: '',
                    title: 'עברית (ישראל)',
                },
                {
                    code: '',
                    title: 'Magyar (Magyarország)',
                },
                {
                    code: '',
                    title: 'Bahasa Indonesia (Indonesia)',
                },
                {
                    code: '',
                    title: 'Italiano (Italia)',
                },
                {
                    code: '',
                    title: '日本語（日本）',
                },
                {
                    code: '',
                    title: 'Basa Jawa (Indonesia)',
                },
                {
                    code: '',
                    title: 'ខ្មែរ (កម្ពុជា)',
                },
                {
                    code: '',
                    title: '한국어 (대한민국)',
                },
                {
                    code: '',
                    title: 'Bahasa Melayu (Malaysia)',
                },
                {
                    code: '',
                    title: 'မြန်မာ (မြန်မာ)',
                },
            ],
        },
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

export const MENU_ITEM_CARD1 = [
    {
        title: 'Bookmark',
        to: '#',
    },
]

export const MENU_ITEM_CARD2 = [
    {
        title: 'Remove Bookmark',
        to: '#',
    },
]
