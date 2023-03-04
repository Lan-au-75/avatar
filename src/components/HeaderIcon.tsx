import clsx from 'clsx'
import { useState } from 'react'
import { IconType } from 'react-icons/lib'

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
                <div className={classActiveIcon}>
                    <ActiveIcon
                        className={'cursor-pointer'}
                        onClick={() => setToggleIcon(!toggleIcon)}
                    />
                </div>
            ) : (
                <div className={classIcon}>
                    <Icon className={'cursor-pointer'} onClick={() => setToggleIcon(!toggleIcon)} />
                </div>
            )}
        </>
    )
}

export default HeaderIcon
