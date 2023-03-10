import { userAth } from '@/context/AuthContext'
import { AiFillEye } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Login() {
    const { googleSignIn, user, signIn, facebookSignIn, errorMessage } = userAth()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleFacebookSignIn = async () => {
        await facebookSignIn()
    }

    const handleSignIn = async () => {
        await signIn(email, password)
    }

    const handleGoogleSignIn = async () => {
        await googleSignIn()
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    return (
        <aside
            style={{
                backgroundImage: 'url(/original.webp)',
            }}
            className='h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat -z-10'
        >
            <form
                className='flex flex-col gap-3 md:gap-y-4 p-5 md:p-8 rounded-lg min-w-full min-h-full  md:min-w-[400px] md:min-h-[100px] bg-base200 shadow-lg'
                onSubmit={(e) => e.preventDefault()}
            >
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
                        value={email}
                        type='email'
                        placeholder='Email'
                        required
                        autoComplete='on'
                        className='p-3 outline-none border-b-2 border-solid border-blue-500 bg-base200  flex-1 text-base'
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className='flex items-center justify-between border-b-2 border-solid border-blue-500'>
                        <input
                            value={password}
                            type={showPassword ? 'text' : 'password'}
                            required
                            autoComplete='on'
                            placeholder='At least 8 characters'
                            className='p-3 outline-none bg-base200  flex-1 text-base'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <AiFillEye
                            className='text-xl md:text-2xl text-base100 mr-6 cursor-pointer'
                            onClick={handleShowPassword}
                        />
                    </div>
                </div>

                <Link to='/sign up' className='text-base text-right text-blue-500 hover:opacity-95'>
                    Forgot password?
                </Link>

                <button
                    className='btnCustom text-lg md:text-xl text-white bg-blue-500 p-3 rounded-2xl
                font-semibold capitalize min-w-[80px] min-h-[50px] hover:scale-105 hover:opacity-90 transition-all duration-300 ease-in'
                    onClick={handleSignIn}
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
                        onClick={handleGoogleSignIn}
                    >
                        <FcGoogle className='text-lg md:text-xl' />
                        <span className='text-base text-gray-700 font-medium md:text-lg'>
                            Sign in with Google
                        </span>
                    </button>

                    <button
                        className='flex items-center justify-center gap-3 md:gap-4 min-w-[320xp] min-h-[44px]
                    hover:scale-105 hover:opacity-95 transition-all duration-300 ease-linear bg-white rounded-2xl'
                        onClick={handleFacebookSignIn}
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

                {errorMessage && (
                    <div className='flex items-center justify-center'>
                        <span className='text-red-600'>Wrong email or password</span>
                    </div>
                )}
            </form>
        </aside>
    )
}

export default Login
