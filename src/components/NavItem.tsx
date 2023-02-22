import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

interface Props {
    title?: string
    href: string
}

function NavItem({ title, href }: Props) {
    return (
        <li className='nav-link'>
            <NavLink
                to={href}
                className={({ isActive }) => clsx('px-3 py-2', { active: isActive })}
            >
                {title}
            </NavLink>
        </li>
    )
}

export default NavItem
