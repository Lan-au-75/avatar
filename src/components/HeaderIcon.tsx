import { useState } from 'react'

interface Props {
    Icon?: any
    ActiveIcon?: any
}

function HeaderIcon({ Icon, ActiveIcon }: Props) {
    const [toggleIcon, setToggleIcon] = useState(false)

    return (
        <>
            {toggleIcon ? (
                <span className='p-2 bg-blue-500/60 rounded-full'>
                    <ActiveIcon
                        className='cursor-pointer text-blue-300'
                        size={22}
                        onClick={() => setToggleIcon(!toggleIcon)}
                    />
                </span>
            ) : (
                <span className='p-2 bg-base200 rounded-full'>
                    <Icon
                        className='cursor-pointer'
                        size={22}
                        onClick={() => setToggleIcon(!toggleIcon)}
                    />
                </span>
            )}
        </>
    )
}

export default HeaderIcon
