import { MdLocalMovies, MdMovie } from 'react-icons/md'
import { RiMovie2Fill, RiMovie2Line } from 'react-icons/ri'

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

export { navbarData }
