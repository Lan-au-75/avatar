import clsx from 'clsx'
import { useState } from 'react'

interface Props {
    Icon?: any
    classIcon?: string
    ActiveIcon?: any
    classActiveIcon?: string
    classActiveBg?: string
    classIconBG?: string
}

function HeaderIcon({
    Icon,
    ActiveIcon,
    classIcon,
    classActiveIcon,
    classActiveBg,
    classIconBG,
}: Props) {
    const [toggleIcon, setToggleIcon] = useState(false)

    return (
        <>
            {toggleIcon ? (
                <div className={clsx('p-[0.7rem] bg-blue-500/60 rounded-full', classActiveBg)}>
                    <ActiveIcon
                        className={clsx(
                            'cursor-pointer text-blue-300 text-xl md:text-[22px]',
                            classActiveIcon
                        )}
                        onClick={() => setToggleIcon(!toggleIcon)}
                    />
                </div>
            ) : (
                <div className={clsx('p-[0.7rem] bg-base200 rounded-full', classIconBG)}>
                    <Icon
                        className={clsx('cursor-pointer text-xl md:text-[22px]', classIcon)}
                        onClick={() => setToggleIcon(!toggleIcon)}
                    />
                </div>
            )}
        </>
    )
}

export default HeaderIcon
