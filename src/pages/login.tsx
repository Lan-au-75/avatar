import { AiFillEye } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <aside
            style={{
                backgroundImage: 'url(/original.webp)',
            }}
            className='h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat -z-10'
        >
            <div className='flex flex-col gap-3 md:gap-y-4 p-5 md:p-8 rounded-lg min-w-full min-h-full  md:min-w-[400px] md:min-h-[100px] bg-base200 shadow-lg'>
                <div className='flex items-center flex-col gap-3'>
                    <img
                        src='/logoAvatar.png'
                        alt='logo avatar'
                        className=' object-contain object-center w-16 h-16 flex-shrink-0'
                    />
                    <span className='text-xl sm:text-xl md:text-2xl text-white font-semibold capitalize'>
                         Welcome to the Avatar movie
                    </span>
                    <span className='text-md text-gray-500 text-center capitalize'>
                         Please sign in to your account!
                    </span>
                </div>
                <div className='flex flex-col gap-2 md:gap-y-3 text-gray-400 mt-4'>
                    <input
                        type='text'
                        placeholder='User name'
                        className='p-3 outline-none border-b-2 border-solid border-blue-500 bg-base200  flex-1 text-base'
                    />

                    <div className='flex items-center justify-between border-b-2 border-solid border-blue-500'>
                        <input
                            type='password'
                            placeholder='At least 8 characters'
                            className='p-3 outline-none bg-base200  flex-1 text-base'
                        />
                        <AiFillEye className='text-xl md:text-2xl text-base100 mr-6 cursor-pointer' />
                    </div>
                </div>

                <Link to='/sign up' className='text-base text-right text-blue-500 hover:opacity-95'>
                    Forgot password?
                </Link>

                <button
                    className='btnCustom text-lg md:text-xl text-white bg-blue-500 p-3 rounded-2xl
                font-semibold capitalize min-w-[80px] min-h-[50px] hover:scale-105 hover:opacity-90 transition-all duration-300 ease-in'
                >
                    Sign in
                </button>

                <div className='flex items-center justify-center my-3'>
                    <hr className='border-t border-gray-400 flex-grow mr-3' />
                    <span className='text-gray-400 font-medium'>or</span>
                    <hr className='border-t border-gray-400 flex-grow ml-3' />
                </div>

                <ul className='flex flex-col gap-5 md:gap-3'>
                    <button
                        className='flex items-center justify-center gap-3 md:gap-4 min-w-[320xp] min-h-[44px]
                    hover:scale-105 hover:opacity-95 transition-all duration-300 ease-linear bg-white rounded-2xl'
                    >
                        <FcGoogle className='text-lg md:text-xl' />
                        <span className='text-base text-gray-700 font-medium md:text-lg'>
                            Sign in with Google
                        </span>
                    </button>

                    <button
                        className='flex items-center justify-center gap-3 md:gap-4 min-w-[320xp] min-h-[44px]
                    hover:scale-105 hover:opacity-95 transition-all duration-300 ease-linear bg-white rounded-2xl'
                    >
                        <BsFacebook className='text-lg md:text-xl text-blue-500' />
                        <span className='text-base text-gray-700 font-medium md:text-lg'>
                            Sign in with Facebook
                        </span>
                    </button>
                </ul>

                <p className='text-gray-500 flex items-center justify-center gap-2'>
                    Don't have on Account?
                    <Link to='/sign up' className=' text-blue-500 font-semibold hover:underline'>
                        Sign Up
                    </Link>{' '}
                </p>
            </div>
        </aside>
    )
}

export default Login
