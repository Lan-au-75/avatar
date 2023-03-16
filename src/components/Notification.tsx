import clsx from 'clsx'
import { forwardRef, useRef, useImperativeHandle } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { handleImgError } from '@/hooks/handleImgError'
import { notifications } from '@/mockapi/notification'

function Notification({}, ref: any) {
    const notificationRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => notificationRef.current, [])

    return (
        <div
            ref={notificationRef}
            className={clsx(
                'py-3 md:py-4 animate-menuBox sm:menu-box fixed top-14 bottom-0 left-0 w-screen sm:w-[400px] md:w-[440px] sm:bottom-auto sm:left-auto   min-h-[300px] bg-base200 rounded-lg origin-top-right shadow-lg'
            )}
        >
            {/* menu header */}

            <header className='flex flex-col gap-3 md:gap-y-4 px-5 py-4 md:px-3 md:py-2'>
                <span className='text-xl md:text-2xl '>Notifications</span>
                <ul className='flex items-center gap-3 md:gap-y-4 '>
                    <Link to='#' className='hover:opacity-90'>
                        View all
                    </Link>
                    <Link to='#' className='hover:opacity-90'>
                        Mentions
                    </Link>
                </ul>
            </header>

            {/* menu item */}

            <ul className=' max-h-[500px] overflow-y-hidden hover:overflow-y-auto scrollBarCustom'>
                {notifications.map((notification) => (
                    <Link
                        key={uuidv4()}
                        to='#'
                        className='flex items-start gap-2 md:gap-3  px-5 py-4 md:px-3 md:py-2 hover:bg-base100 rounded-lg  cursor-pointer'
                    >
                        <img
                            src={notification.avatar}
                            alt='avatar user'
                            className='h-16 w-16 flex-shrink-0 object-cover object-center rounded-full cursor-pointer'
                            onError={(e) => handleImgError(e, '/no-img-avatar.png')}
                        />
                        <div className='flex flex-col flex-wrap'>
                            <div className='flex items-center justify-between'>
                                <p className='text-lg capitalize'>{notification.name}</p>
                                <span className='h-3 w-3 rounded-full bg-blue-500'></span>
                            </div>
                            <p className='text-base line-clamp-2'>{notification.desc}</p>
                            <div className='flex items-center justify-between text-sm text-blue-500'>
                                <span className='lowercase'>{notification.create_time}</span>
                                <span>{notification.create_day}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default forwardRef(Notification)
