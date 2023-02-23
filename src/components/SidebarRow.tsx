import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

interface Props {
    Icon?: any
    ActiveIcon?: any
    title?: string
    href: string
    active?: boolean
}

function SidebarRow({ Icon, ActiveIcon, title, href, active }: Props) {
    return (
        <li className='menu-item'>
            <NavLink
                to={href}
                className={({ isActive }) =>
                    clsx(
                        'flex items-center px-3 py-2 gap-3 md:gap-4 w-full ',
                        isActive ? 'menu-active' : ''
                    )
                }
            >
                <ActiveIcon className='active-icon text-blue-500' size={20} />
                <Icon className='icon' size={20} />
                {title}
            </NavLink>
        </li>
    )
}

export default SidebarRow
