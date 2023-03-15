import clsx from 'clsx'
import { Link } from 'react-router-dom'

interface Props {
    className?: string
}

function Skeleton({ className }: Props) {
    return <div className={clsx('skeleton w-full h-full', className)}></div>
}

const SkeletonHeader = () => (
    <header className='header'>
        {/* left */}
        <div className='flex items-center gap-4 sm:gap-5'>
            <Link to='/' className='h-8 w-8 select-none outline-none'>
                <img src='/logoAvatar.png' alt='logoAvatar' />
            </Link>
        </div>
    </header>
)

function SkeletonRow() {
    return (
        <div className='flex flex-col gap-y-4'>
            <Skeleton className='max-h-7 max-w-[50%]' />

            <ul className='flex w-screen items-center gap-2 md:gap-3 overflow-x-scroll scrollbar-hide overflow-hidden'>
                {Array(10)
                    .fill(0)
                    .map((__, i) => (
                        <li
                            key={i}
                            className='thumbnail min-w-[calc(400px-160px)] h-[calc(250px-90px)] md:min-w-[400px] md:h-[250px]'
                        >
                            <Skeleton />
                        </li>
                    ))}
            </ul>
        </div>
    )
}

const SkeletonCard = () => (
    <div className='flex flex-col gap-y-20 w-full'>
        <ul className='grid gap-x-1 mobile:gap-x-3 md:gap-x-4 justify-center pc:justify-start gap-y-20 grid-cols-autoMini sm:grid-cols-autoMobile md:grid-cols-autoTablet lg:grid-cols-autoPC'>
            {Array(10)
                .fill(0)
                .map((__, i) => (
                    <li
                        key={i}
                        className='relative min-h-[270px] sm:min-h-[330px] md:min-h-[350px] hover:scale-110 transition-all ease-linear duration-200'
                    >
                        <Skeleton className='rounded-[30px]' />
                    </li>
                ))}
        </ul>
    </div>
)

export { SkeletonRow, SkeletonHeader, SkeletonCard }

export default Skeleton
