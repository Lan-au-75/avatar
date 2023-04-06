import { userAth } from '@/context/AuthContext'
import { useState, useEffect } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'

interface FormState {
    fullName: string
    email: string
    password: string
}

function SignUp() {
    const { signUp, user, errorMessage } = userAth()
    const [formState, setFormState] = useState({
        fullName: '',
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const navigate = useNavigate()

    // curring
    const handleChange = (name: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({ ...prev, [name]: e.target.value }))
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSignUp = async () => {
        await signUp(formState.email, formState.email, formState.fullName)
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
                        Get started
                    </span>
                    <span className='text-md text-gray-500 text-center capitalize'>
                        Create your account now
                    </span>
                </div>
                <div className='flex flex-col gap-2 md:gap-y-3 text-gray-400 mt-4'>
                    <input
                        value={formState.fullName}
                        type='text'
                        placeholder='Full name'
                        required
                        autoComplete='on'
                        className='p-3 outline-none border-b-2 border-solid border-blue-500 bg-base200  flex-1 text-base'
                        onChange={handleChange('fullName')}
                    />

                    <input
                        value={formState.email}
                        type='email'
                        placeholder='Email'
                        required
                        autoComplete='on'
                        className='p-3 outline-none border-b-2 border-solid border-blue-500 bg-base200  flex-1 text-base'
                        onChange={handleChange('email')}
                    />

                    <div className='flex items-center justify-between border-b-2 border-solid border-blue-500'>
                        <input
                            value={formState.password}
                            type={showPassword ? 'text' : 'password'}
                            required
                            autoComplete='on'
                            placeholder='Password'
                            className='p-3 outline-none bg-base200  flex-1 text-base'
                            onChange={handleChange('password')}
                        />
                        <span
                            className='text-xl md:text-2xl text-base100 mr-6 cursor-pointer'
                            onClick={handleShowPassword}
                        >
                            {!showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </span>
                    </div>
                </div>

                <button
                    className='btnCustom text-lg md:text-xl text-white bg-blue-500 p-3 rounded-2xl
                font-semibold capitalize min-w-[80px] min-h-[50px] hover:scale-105 hover:opacity-90 transition-all duration-300 ease-in'
                    onClick={handleSignUp}
                >
                    Sign up
                </button>

                <p className='text-gray-500 flex items-center justify-center gap-2'>
                    Have an account?
                    <Link to='/login' className='text-blue-500 font-semibold hover:underline'>
                        Login
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

export default SignUp
