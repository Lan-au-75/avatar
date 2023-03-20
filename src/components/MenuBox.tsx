import { userAth } from '@/context/AuthContext'
import { useBookmark } from '@/context/BookmarkContext'
import { handleImgError } from '@/hooks/handleImgError'
import { Movie, TV } from '@/types/movies.type'
import clsx from 'clsx'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

import { v4 as uuidv4 } from 'uuid'

interface Props {
    movie?: Movie | TV
    menuItem: {
        leftIcon?: JSX.Element
        title: string
        to: string
        rightIcon?: JSX.Element
        children?: {
            title: string
            data: {
                code?: string
                title?: string
            }[]
        }
    }[]

    className?: string
}

function MenuBox({ menuItem, className, movie }: Props, ref: any) {
    const { logOut, user } = userAth()
    const { handleBookmark, handleRemoveBookmark } = useBookmark()
    const menuRef = useRef<HTMLInputElement>(null)
    const [history, setHistory] = useState([{ data: menuItem, title: '' }])

    const navigate = useNavigate()

    // render last element
    const currentMenu = history[history.length - 1]

    useImperativeHandle(ref, () => menuRef.current, [])

    const currentTitle = menuItem.find(
        (item) =>
            item.title === 'Trending Movies' ||
            item.title === 'Bookmark' ||
            item.title === 'Remove Bookmark'
    )

    const isTitle = menuItem.find((item) => item.title.includes('Trending Movies'))

    // handle back menu
    const handleBackMenu = () => {
        setHistory((prev) => [...prev.slice(0, prev.length - 1)])
    }

    //  handle title and children
    const handleTitle = async (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        title: string,
        children: any
    ) => {
        // check remove anchor in menu
        if (!isTitle) {
            e.preventDefault()
        }

        // sub menu
        if (children) {
            setHistory((prev: any) => [...prev, children])
        }

        switch (title) {
            case 'Bookmark':
                handleBookmark(movie as Movie)
                break
            case 'Remove Bookmark':
                handleRemoveBookmark(movie as Movie)
                break
            case 'Dashboard':
                navigate('/dashboard')
                break
            case 'logout':
                await logOut()
                window.location.reload()
                break

            default:
                break
        }
    }

    return (
        <div
            ref={menuRef}
            className={clsx('py-3 md:py-4 animate-menuBox', className)}
            onClick={(e) => e.stopPropagation()}
        >
            {/* menu header */}
            {user && !currentTitle && history.length <= 1 ? (
                <>
                    <header className='flex items-center gap-4 md:gap-3  px-5 py-4 md:px-3 md:py-2'>
                        <img
                            src={(user?.photoURL as string) || '/user-account.jpg'}
                            alt='avatar user'
                            className='h-11 w-11 object-cover object-center rounded-full cursor-pointer'
                            onError={(e) => handleImgError(e, '/no-img-avatar.png')}
                        />
                        <div className='flex flex-col gap-y-1'>
                            <p>{user?.displayName}</p>
                            <p>{user?.email}</p>
                        </div>
                    </header>
                    <hr className='border-gray-500 my-2 md:my-3' />
                </>
            ) : (
                // sub header
                !currentTitle && (
                    <>
                        <header className='flex items-center gap-2 md:gap-3 px-3'>
                            <span
                                className='p-3 rounded-full hover:bg-base100 cursor-pointer'
                                onClick={handleBackMenu}
                            >
                                <AiOutlineArrowLeft className='text-xl md:text:2xl' />
                            </span>
                            <p className='text-lg'>{currentMenu.title}</p>
                        </header>
                        <hr className='border-gray-500 my-2 md:my-3' />
                    </>
                )
            )}

            {/* menu item */}
            <ul className='flex flex-col gap-y-2 md:gap-y-3 max-h-[500px] overflow-y-hidden scrollBarCustom hover:overflow-y-auto'>
                {currentMenu.data.map((item) => (
                    <HashLink
                        to={item.to}
                        key={uuidv4()}
                        className='menu-box__link'
                        scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                        onClick={(e) => handleTitle(e, item.title, item.children)}
                    >
                        <div className='flex items-center gap-2 md:gap-3'>
                            {item.leftIcon && (
                                <span className='text-xl md:text-lg'>{item.leftIcon}</span>
                            )}
                            <span className='capitalize text-lg lg:text-base'>{item.title}</span>
                        </div>
                        {item.rightIcon && (
                            <span className='text-xl md:text-lg'>{item.rightIcon}</span>
                        )}
                    </HashLink>
                ))}
            </ul>
        </div>
    )
}

export default forwardRef(MenuBox)
