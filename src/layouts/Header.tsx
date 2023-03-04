import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { AiOutlineMenu } from 'react-icons/ai'
import { MdFilterListAlt } from 'react-icons/md'
import { IoIosNotifications, IoIosNotificationsOutline } from 'react-icons/io'
import HeaderIcon from '@/components/HeaderIcon'
import Search from '@/components/Search'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import MenuBox from '@/components/MenuBox'
import { MENU_ITEM } from '@/mockapi/menu-item'
import { USER } from '@/mockapi/user'

function Header() {
    const [showNavbar, setShowNavbar] = useState<boolean>(false)
    const [showMenu, setShowMenu] = useState<boolean>(false)

    const menuRef = useRef<HTMLInputElement>(null)
    const imgRef = useRef<HTMLInputElement>(null)

    const user = true

    // handle menu when outside
    const handleOutsideClick = (e: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(e.target as Node) &&
            !imgRef.current?.contains(e.target as Node)
        ) {
            setShowMenu(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', (e) => handleOutsideClick(e))
        return () => {
            document.removeEventListener('mousedown', (e) => handleOutsideClick(e))
        }
    }, [])

    // handle open navbar
    const handleOpenNavbar = () => {
        setShowNavbar(!showNavbar)
    }

    /* 
       1.handle show menu
       2.handle scale avatar when mouse up
    */

    const handleShowMenu = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        // 1
        setShowMenu(!showMenu)

        // 2
        const target = e.target as HTMLTextAreaElement

        Object.assign(target.style, {
            transform: 'scale(1)',
            opacity: '1',
        })
    }

    // handle scale avatar when mouse down
    const handleAvatarImg = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const target = e.target as HTMLTextAreaElement

        Object.assign(target.style, {
            transform: 'scale(0.9)',
            opacity: '0.9',
        })
    }

    return (
        <header className='header'>
            {/* left */}
            <div className='flex items-center gap-4 sm:gap-5'>
                <Link to='/' className='h-8 w-8 select-none outline-none'>
                    <img src='/logoAvatar.png' alt='logoAvatar' />
                </Link>

                <Search />
            </div>
            {/* mid */}
            <Navbar />
            {/* right */}
            <div className='flex items-center gap-2 sm:gap-3 text-white'>
                <div
                    className='pc:hidden hover:text-white transition-all p-3 cursor-pointer'
                    onClick={handleOpenNavbar}
                >
                    <AiOutlineMenu size={24} />
                </div>

                <HeaderIcon
                    Icon={IoIosNotificationsOutline}
                    ActiveIcon={IoIosNotifications}
                    classIcon='iconDefault'
                    classActiveIcon='iconActiveDefault'
                />

                {user ? (
                    <div>
                        <figure
                            ref={imgRef}
                            className='relative  w-11 h-11 rounded-full overflow-hidden cursor-pointer'
                        >
                            <img
                                src='/avatar-user.jpg'
                                alt=''
                                className='h-full w-full object-cover object-center transition-all ease-linear duration-200'
                                onMouseUp={(e) => handleShowMenu(e)}
                                onMouseDown={(e) => handleAvatarImg(e)}
                            />
                        </figure>
                        <div className=''>
                            {showMenu && (
                                <MenuBox
                                    ref={menuRef}
                                    menuItem={MENU_ITEM}
                                    user={USER}
                                    className='menu-box  min-w-[80%] mobile:min-w-[50%] md:min-w-[40%] ld:min-w-[30%] xl:min-w-[20%] min-h-[300px] bg-base200 rounded-lg origin-top-right shadow-lg'
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center gap-2 px-3 py-2 hover:bg-base200 rounded-lg select-none transition-all duration-300 ease-in-out'>
                        <FaUser size={18} />

                        <Link to='login'> Login</Link>
                    </div>
                )}
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
