import { AiOutlineHome, AiFillHome, AiOutlineCompass, AiFillCompass } from 'react-icons/ai'
import { HiOutlineUserGroup, HiUserGroup } from 'react-icons/hi'
import { TfiAlarmClock } from 'react-icons/tfi'
import { FcAlarmClock } from 'react-icons/fc'

import SidebarRow from './SidebarRow'

interface Props {
    title?: string
}

function Menu({ title }: Props) {
    return (
        <ul className='flex flex-col gap-y-4 py-6'>
            <label htmlFor='' className='px-3 uppercase'>
                {title}
            </label>
            <SidebarRow href='home' Icon={AiOutlineHome} ActiveIcon={AiFillHome} title='Home' />
            <SidebarRow
                href='discovery'
                Icon={AiOutlineCompass}
                ActiveIcon={AiFillCompass}
                title='Discovery'
            />
            <SidebarRow
                href='community'
                Icon={HiOutlineUserGroup}
                ActiveIcon={HiUserGroup}
                title='Community'
            />
            <SidebarRow
                href='coming soon'
                Icon={TfiAlarmClock}
                ActiveIcon={FcAlarmClock}
                title='Coming soon'
            />
        </ul>
    )
}

export default Menu
