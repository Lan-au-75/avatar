import { userAth } from '@/context/AuthContext'
import clsx from 'clsx'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

import { v4 as uuidv4 } from 'uuid'

interface Props {
    menuItem: {
        leftIcon?: JSX.Element
        title: string
        to: string
        rightIcon?: JSX.Element
    }[]

    className?: string
}

function MenuBox({ menuItem, className }: Props, ref: any) {
    const { logOut, user } = userAth()
    const menuRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => menuRef.current, [])

    //  handle title
    const handleTitle = async (title: string) => {
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
            {user && (
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
            )}

            {/* menu item */}
            <ul className='flex flex-col gap-y-2 md:gap-y-3'>
                {menuItem.map((item) => (
                    <HashLink
                        to={item.to}
                        key={uuidv4()}
                        className='menu-box__link'
                        scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                        onClick={() => handleTitle(item.title)}
                    >
                        <div className='flex items-center gap-1 md:gap-2'>
                            {item.leftIcon && (
                                <span className='text-xl md:text-lg'>{item.leftIcon}</span>
                            )}
                            <span className='capitalize text-lg md:text-base'>{item.title}</span>
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
