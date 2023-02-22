import { IoIosNotifications, IoIosNotificationsOutline } from 'react-icons/io'
import { AiOutlineMenu } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import HeaderIcon from '@/components/HeaderIcon'
import Search from '@/components/Search'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

function Header() {
    const [showNavbar, setShowNavbar] = useState<boolean>(false)

    const handleOpenNavbar = () => {
        setShowNavbar(!showNavbar)
    }

    return (
        <header className='header'>
            {/* left */}
            <div className='flex items-center gap-4 sm:gap-5'>
                <Link to='/' className='h-8 w-8 select-none'>
                    <img src='/logoAvatar.png' alt='logoAvatar' />
                </Link>

                <Search />
                <AiOutlineMenu
                    className='md:hidden hover:text-white cursor-pointer transition-all'
                    size={24}
                    onClick={handleOpenNavbar}
                />
            </div>
            {/* mid */}
            <Navbar />
            {/* right */}
            <div className='flex items-center gap-2 sm:gap-3 text-white'>
                <HeaderIcon Icon={IoIosNotificationsOutline} ActiveIcon={IoIosNotifications} />

                {/* <figure className='w-[38px] h-[38px] rounded-full overflow-hidden cursor-pointer'>
                    <img
                        src='/public/avatar-user.jpg'
                        alt=''
                        className='h-full w-full object-cover object-center'
                    />
                </figure> */}

                <div className='flex items-center gap-2 px-3 py-2 hover:bg-base200 rounded-lg select-none transition-all duration-300 ease-in-out'>
                    <FaUser size={18} />

                    <Link to='login'> Login</Link>
                </div>
            </div>

            {/* navbar mobile */}

            {showNavbar && (
                <div className='fixed top-14 bottom-0 left-0 w-screen bg-secondary'>
                    <Sidebar className='block max-w-none w-full' />
                </div>
            )}
        </header>
    )
}

export default Header
