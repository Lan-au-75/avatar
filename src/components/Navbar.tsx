import clsx from 'clsx'

import NavItem from './NavItem'

interface Props {
    className?: string
}

function Navbar({ className }: Props) {
    return (
        <nav className={clsx('hidden pc:flex items-center', className)}>
            <ul className='flex items-center gap-4 lg:gap-6 select-none'>
                <NavItem title='Movies' href='movies/trending?page=1' />
                <NavItem title='Series' href='series' />
                <NavItem title='TV Shows' href='tv shows/airingToDay?page=1' />
            </ul>
        </nav>
    )
}

export default Navbar
