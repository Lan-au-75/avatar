import clsx from 'clsx'
import { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { IconType } from 'react-icons/lib'
import Tooltip from '@/components/Tooltip'

interface Props {
    Icon?: any
    classIcon?: string
    ActiveIcon?: any
    classActiveIcon?: string
    onMouseUp?: (e: MouseEvent) => void
    quantity?: number
    offset?: string
    tooltip?: string
}

function HeaderIcon(
    {
        Icon,
        ActiveIcon,
        classIcon,
        classActiveIcon,
        onMouseUp,
        quantity = 0,
        offset,
        tooltip,
    }: Props,
    ref: any
) {
    const [toggleIcon, setToggleIcon] = useState(false)

    const iconNotificationRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(
        ref,
        () => {
            return {
                current: iconNotificationRef.current,
                setToggleIcon,
            }
        },
        []
    )

    return (
        <>
            {toggleIcon ? (
                <div ref={iconNotificationRef} className={classActiveIcon}>
                    <ActiveIcon
                        className={'cursor-pointer'}
                        onClick={() => setToggleIcon(!toggleIcon)}
                        onMouseUp={onMouseUp}
                    />
                </div>
            ) : (
                <div ref={iconNotificationRef} className={clsx(classIcon, 'relative group')}>
                    <Icon
                        className={'cursor-pointer'}
                        onClick={() => setToggleIcon(!toggleIcon)}
                        onMouseUp={onMouseUp}
                    />

                    {tooltip && <Tooltip offset={offset as string} tooltip={tooltip} />}

                    {quantity !== 0 && (
                        <span className='absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 bg-red-500 rounded-full text-xs'>
                            {quantity}
                        </span>
                    )}
                </div>
            )}
        </>
    )
}

export default forwardRef(HeaderIcon)
