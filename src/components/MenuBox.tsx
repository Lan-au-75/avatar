import clsx from 'clsx'
import { forwardRef, useRef, useImperativeHandle } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

interface Props {
    menuItem: {
        leftIcon?: JSX.Element
        title: string
        to: string
        rightIcon?: JSX.Element
    }[]
    user: {
        name: string
        email: string
        img: string
    }

    className: string
}

function MenuBox({ menuItem, user, className }: Props, ref: any) {
    const menuRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => menuRef.current, [])

    return (
        <div ref={menuRef} className={clsx('py-3 md:py-4 animate-menuBox', className)}>
            {/* menu header */}
            <header className='flex items-center gap-2 md:gap-3  px-5 py-4 md:px-3 md:py-2'>
                <img
                    src={user.img}
                    alt='avatar user'
                    className='h-11 w-11 object-cover object-center rounded-full'
                />
                <div className='flex flex-col gap-y-1'>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </div>
            </header>

            <hr className='border-gray-500 my-2 md:my-3' />

            {/* menu item */}
            <ul className='flex flex-col gap-y-2 md:gap-y-3'>
                {menuItem.map((item) => (
                    <Link to='#' key={uuidv4()} className='menu-box__link'>
                        <div className='flex items-center gap-1 md:gap-2'>
                            {item.leftIcon && (
                                <span className='text-xl md:text-lg'>{item.leftIcon}</span>
                            )}
                            <span className='capitalize text-lg md:text-base'>{item.title}</span>
                        </div>
                        {item.rightIcon && (
                            <span className='text-xl md:text-lg'>{item.rightIcon}</span>
                        )}
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default forwardRef(MenuBox)
