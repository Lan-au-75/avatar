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
    <div className='flex flex-col gap-y-20'>
        <ul
            className='grid gap-x-3 justify-start gap-y-20 mobile:grid-cols-[repeat(3,180px)] md:gap-x-4 md:gap-y-20 grid-cols-[repeat(2,180px)] sm:grid-cols-[repeat(3,180px)]  
              lg:grid-cols-3 xl:grid-cols-4'
        >
            {Array(10)
                .fill(0)
                .map((__, i) => (
                    <li
                        key={i}
                        className='relative hover:scale-110 transition-all ease-linear duration-200 w-[180px] lg:w-[250px] h-[250px] md:h-[350px]'
                    >
                        <Skeleton className='rounded-[30px]' />
                    </li>
                ))}
        </ul>
    </div>
)

export { SkeletonRow, SkeletonHeader, SkeletonCard }

export default Skeleton
