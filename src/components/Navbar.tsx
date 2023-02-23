import clsx from 'clsx'

import NavItem from './NavItem'

interface Props {
    className?: string
}

function Navbar({ className }: Props) {
    return (
        <nav className={clsx('hidden md:flex items-center', className)}>
            <ul className='flex items-center gap-4 lg:gap-6 select-none'>
                <NavItem title='Movies' href='/movies' />
                <NavItem title='Series' href='series' />
                <NavItem title='TV Shows' href='tv shows' />
            </ul>
        </nav>
    )
}

export default Navbar
