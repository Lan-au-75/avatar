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
        <li className='relative menu-item overflow-hidden '>
            <NavLink
                to={href}
                className={({ isActive }) =>
                    clsx(
                        ' flex items-center py-4 px-5 md:px-3 md:py-2 gap-3 md:gap-4 w-full ',
                        isActive ? 'menu-active' : ''
                    )
                }
            >
                <ActiveIcon className='active-icon text-blue-500' size={20} />
                <Icon className='icon' size={20} />
                {title}
                <div className='absolute active-icon h-5 w-5 bg-blue-500 rounded-md -right-4'></div>
            </NavLink>
        </li>
    )
}

export default SidebarRow
