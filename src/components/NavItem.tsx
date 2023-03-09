import clsx from 'clsx'
import { BsChevronDown } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import MenuBox from './MenuBox'
import { MENU_ITEM_MOVIES } from '@/mockapi/menu-item'

interface Props {
    title?: string
    href: string
}

function NavItem({ title, href }: Props) {
    return (
        <li className='group relative nav-link '>
            <NavLink
                to={href}
                className={({ isActive }) =>
                    clsx(
                        'px-3 py-2 flex items-center gap-2 before:absolute before:top-10 before:right-0 before:bg-transparent before:h-3 before:w-full ',
                        isActive ? 'active border-b border-solid border-blue-500' : ''
                    )
                }
            >
                {title}
                {title === 'Movies' && <BsChevronDown className='text-sm text-gray-500' />}
            </NavLink>
            {title === 'Movies' && (
                <MenuBox
                    menuItem={MENU_ITEM_MOVIES}
                    className='hidden group-hover:block absolute top-12 left-0 bg-base200 w-[200px] min-h-[100px] 
                    rounded-lg transition-all duration-500 ease-out origin-top-left shadow-lg'
                ></MenuBox>
            )}
        </li>
    )
}

export default NavItem
