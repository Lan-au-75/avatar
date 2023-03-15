import clsx from 'clsx'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
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
                <div
                    ref={iconNotificationRef}
                    className={classActiveIcon}
                    onClick={() => setToggleIcon(!toggleIcon)}
                    onMouseUp={onMouseUp as any}
                >
                    <ActiveIcon className={'cursor-pointer'} />
                </div>
            ) : (
                <div
                    ref={iconNotificationRef}
                    className={clsx(classIcon, 'relative group')}
                    onClick={() => setToggleIcon(!toggleIcon)}
                    onMouseUp={onMouseUp as any}
                >
                    <Icon className={'cursor-pointer'} />

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
