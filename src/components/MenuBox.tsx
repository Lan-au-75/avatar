import { userAth } from '@/context/AuthContext'
import clsx from 'clsx'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { HashLink } from 'react-router-hash-link'

import { v4 as uuidv4 } from 'uuid'

interface Props {
    menuItem: {
        leftIcon?: JSX.Element
        title: string
        to: string
        rightIcon?: JSX.Element
        children?: {
            title: string
            data: {
                code: string
                title: string
            }[]
        }
    }[]

    className?: string
}

function MenuBox({ menuItem, className }: Props, ref: any) {
    const { logOut, user } = userAth()
    const menuRef = useRef<HTMLInputElement>(null)
    const [history, setHistory] = useState([{ data: menuItem, title: '' }])

    // render last element
    const currentMenu = history[history.length - 1]

    useImperativeHandle(ref, () => menuRef.current, [])

    const currentTitle = menuItem.find((item) => item.title === 'Trending Movies')

    // handle back menu
    const handleBackMenu = () => {
        setHistory((prev) => [...prev.slice(0, prev.length - 1)])
    }

    //  handle title and children
    const handleTitle = async (title: string, children: any) => {
        if (children) {
            setHistory((prev: any) => [...prev, children])
        }

        switch (title) {
            case 'logout':
                await logOut()
                window.location.reload()
                break

            default:
                break
        }
    }

    return (
        <div ref={menuRef} className={clsx('py-3 md:py-4 animate-menuBox', className)}>
            {/* menu header */}
            {user && !currentTitle && history.length <= 1 ? (
                <>
                    <header className='flex items-center gap-2 md:gap-3  px-5 py-4 md:px-3 md:py-2'>
                        <img
                            src={(user?.photoURL as string) || '/user-account.jpg'}
                            alt='avatar user'
                            className='h-11 w-11 object-cover object-center rounded-full cursor-pointer'
                        />
                        <div className='flex flex-col gap-y-1'>
                            <p>{user?.displayName}</p>
                            <p>{user?.email}</p>
                        </div>
                    </header>
                    <hr className='border-gray-500 my-2 md:my-3' />
                </>
            ) : (
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
            <ul className='flex flex-col gap-y-2 md:gap-y-3'>
                {currentMenu.data.map((item) => (
                    <HashLink
                        to={item.to}
                        key={uuidv4()}
                        className='menu-box__link'
                        scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                        onClick={() => handleTitle(item.title, item.children)}
                    >
                        <div className='flex items-center gap-1 md:gap-2'>
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
