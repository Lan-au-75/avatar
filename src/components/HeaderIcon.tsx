import clsx from 'clsx'
import { useState } from 'react'

interface Props {
    Icon?: any
    classIcon?: string
    ActiveIcon?: any
    classActiveIcon?: string
}

function HeaderIcon({ Icon, ActiveIcon, classIcon, classActiveIcon }: Props) {
    const [toggleIcon, setToggleIcon] = useState(false)

    return (
        <>
            {toggleIcon ? (
                <span className='p-[0.7rem] bg-blue-500/60 rounded-full'>
                    <ActiveIcon
                        className={clsx(
                            'cursor-pointer text-blue-300 text-xl md:text-[22px]',
                            classActiveIcon
                        )}
                        onClick={() => setToggleIcon(!toggleIcon)}
                    />
                </span>
            ) : (
                <span className='p-[0.7rem] bg-base200 rounded-full'>
                    <Icon
                        className={clsx('cursor-pointer text-xl md:text-[22px]', classIcon)}
                        onClick={() => setToggleIcon(!toggleIcon)}
                    />
                </span>
            )}
        </>
    )
}

export default HeaderIcon
