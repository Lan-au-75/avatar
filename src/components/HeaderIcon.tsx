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

    const iconRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(
        ref,
        () => {
            return {
                current: iconRef.current,
                setToggleIcon,
            }
        },
        []
    )

    return (
        <>
            {toggleIcon ? (
                <div
                    ref={iconRef}
                    className={classActiveIcon}
                    onClick={() => setToggleIcon(!toggleIcon)}
                    onMouseUp={onMouseUp as any}
                >
                    <ActiveIcon />
                </div>
            ) : (
                <div
                    ref={iconRef}
                    className={clsx(classIcon, 'relative group')}
                    onClick={() => setToggleIcon(!toggleIcon)}
                    onMouseUp={onMouseUp as any}
                >
                    <Icon />

                    {tooltip && <Tooltip offset={offset as string} tooltip={tooltip} />}

                    {quantity !== 0 && (
                        <span className='absolute -top-1 -right-1 text-white  flex items-center justify-center h-5 w-5 bg-red-500 rounded-full text-xs'>
                            {quantity}
                        </span>
                    )}
                </div>
            )}
        </>
    )
}

export default forwardRef(HeaderIcon)
