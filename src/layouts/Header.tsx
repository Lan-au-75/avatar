import { useEffect, useRef, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { BiFilterAlt } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { IoIosNotifications, IoIosNotificationsOutline } from 'react-icons/io'
import { FcFilledFilter } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import HeaderIcon from '@/components/HeaderIcon'
import MenuBox from '@/components/MenuBox'
import Navbar from '@/components/Navbar'
import Notification from '@/components/Notification'
import Search from '@/components/Search'
import Sidebar from '@/components/Sidebar'
import Tooltip from '@/components/Tooltip'
import { userAth } from '@/context/AuthContext'
import { useNavbarMobile } from '@/context/NavbarMobile'
import { handleImgError } from '@/hooks/handleImgError'
import { MENU_ITEM } from '@/mockapi/menu-item'
import { notifications } from '@/mockapi/notification'

function Header() {
    const { user } = userAth()
    const { showNavbar, setShowNavbar } = useNavbarMobile()
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [quantity, setQuantity] = useState(notifications.length)

    const menuRef = useRef<HTMLInputElement>(null)
    const notificationRef = useRef<HTMLInputElement>(null)
    const imgRef = useRef<HTMLInputElement>(null)
    const iconNotificationRef: any = useRef(null)
    const iconFilter: any = useRef(null)

    // handle show notification

    const handleShowNotification = () => {
        setShowNotification(!showNotification)
    }

    // handle menu when outside
    const handleOutsideClick = (e: MouseEvent) => {
        if (
            (menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                !imgRef.current?.contains(e.target as Node)) ||
            (notificationRef.current &&
                !notificationRef.current?.contains(e.target as Node) &&
                !iconNotificationRef.current?.current.contains(e.target as Node))
        ) {
            setShowMenu(false)
            setQuantity(0)
            setShowNotification(false)
            iconNotificationRef.current?.setToggleIcon(false)
        }

        if (!iconFilter.current?.current.contains(e.target as Node)) {
            iconFilter.current?.setToggleIcon(false)
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
            <div className='flex items-center gap-2 sm:gap-3 text-black dark:text-white'>
                <div
                    className='pc:hidden hover:text-black/90 dark:hover:text-white transition-all p-3 cursor-pointer'
                    onClick={handleOpenNavbar}
                >
                    <AiOutlineMenu size={24} />
                </div>

                <Link to='filter'>
                    <HeaderIcon
                        ref={iconFilter}
                        Icon={FcFilledFilter}
                        ActiveIcon={BiFilterAlt}
                        classIcon='iconDefault text-white'
                        classActiveIcon='iconActiveDefault'
                        offset='top-12 -right-3'
                        tooltip='filter'
                    />
                </Link>

                <HeaderIcon
                    ref={iconNotificationRef}
                    Icon={IoIosNotificationsOutline}
                    ActiveIcon={IoIosNotifications}
                    classIcon='iconDefault'
                    classActiveIcon='iconActiveDefault'
                    onMouseUp={handleShowNotification}
                    quantity={quantity}
                    offset='top-12 -right-8'
                    tooltip='notification'
                />

                {showNotification && <Notification ref={notificationRef} />}

                {user ? (
                    <div>
                        <div className='group'>
                            <figure
                                ref={imgRef}
                                className='relative w-11 h-11 rounded-full overflow-hidden cursor-pointer'
                            >
                                <img
                                    src={(user?.photoURL as string) || '/user-account.jpg'}
                                    alt=''
                                    className='h-full w-full object-cover object-center transition-all ease-linear duration-200'
                                    onMouseUp={(e) => handleShowMenu(e)}
                                    onMouseDown={(e) => handleAvatarImg(e)}
                                    onError={(e) => handleImgError(e, '/no-img-avatar.png')}
                                />
                            </figure>
                            <Tooltip offset='top-14 right-0' tooltip='account' />
                        </div>
                        <div className=''>
                            {showMenu && (
                                <MenuBox
                                    ref={menuRef}
                                    menuItem={MENU_ITEM}
                                    className='sm:menu-box fixed top-14 bottom-0 left-0 w-screen sm:w-auto sm:bottom-auto sm:left-auto mobile:min-w-[50%] md:min-w-[40%] ld:min-w-[30%] xl:min-w-[20%] 
                                    min-h-[300px] text-black dark:text-white bg-white dark:bg-base200 rounded-lg origin-top-right shadow-lg'
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
