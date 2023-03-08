import clsx from 'clsx'
import { useRef } from 'react'
import { NavLink } from 'react-router-dom'

interface Props {
    Icon?: any
    ActiveIcon?: any
    title?: string
    href: string
    isCollapsed?: boolean
}

function SidebarRow({ Icon, ActiveIcon, title, href, isCollapsed }: Props) {
    console.log({ isCollapsed })

    return (
        <li className='relative menu-item overflow-hidden '>
            <NavLink
                to={href}
                className={({ isActive }) =>
                    clsx(
                        ' gap-3 md:gap-4  w-full',
                        isActive ? 'menu-active' : '',
                        isCollapsed
                            ? 'flex items-center justify-center py-4 px-5 '
                            : 'flex items-center py-4 px-5 md:px-3 md:py-2'
                    )
                }
            >
                <ActiveIcon className='active-icon flex-shrink-0 text-blue-500' size={20} />
                <Icon className='icon flex-shrink-0' size={20} />

                {!isCollapsed && (
                    <>
                        <span>{title}</span>
                        <div className='absolute active-icon h-5 w-5 bg-blue-500 rounded-md -right-4'></div>
                    </>
                )}
            </NavLink>
        </li>
    )
}

export default SidebarRow
