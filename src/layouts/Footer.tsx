import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className='p-5 md:p-10 bg-slate-400 dark:bg-base200 mt-20'>
            <div className='flex flex-col gap-y-1 md:gap-y-2'>
                <Link to='/' className='flex items-center gap-3 md:gap-4'>
                    <img src='/logoAvatar.png' alt='' className='w-10 h-10 rounded-xl' />
                </Link>
                <span className='text-secondary dark:text-gray-400'>
                    Contact:{' '}
                    <a
                        href='tel:036423590'
                        className='text-base100 dark:text-white hover:underline'
                    >
                        036423590
                    </a>
                </span>
                <span className='text-secondary dark:text-gray-400'>
                    Email:{' '}
                    <a
                        href='mailto:riotgamelolgare@gmail.com'
                        className='text-base100 dark:text-white hover:underline'
                    >
                        riotgamelolgare@gmail.com
                    </a>
                </span>
            </div>

            <hr className='border-gray-500 my-4 md:my-5' />

            <div className='flex items-center justify-center gap-3 md:gap-4 text-2xl md:text-3xl'>
                <Link to='#'>
                    <AiFillFacebook className='text-blue-500' />
                </Link>
                <Link to='#'>
                    <AiOutlineTwitter className='text-blue-500' />
                </Link>
                <Link to='#'>
                    <AiFillInstagram className='text-red-500' />
                </Link>
            </div>
        </footer>
    )
}

export default Footer
