import { Link, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const error: any = useRouteError()

    return (
        <div
            style={{ backgroundImage: `url('/bg-404.jpg')` }}
            className='h-screen flex items-center justify-center bg-no-repeat bg-center bg-cover'
        >
            <div className='flex flex-col items-center gap-5 max-w-[400px] drop-shadow-2xl'>
                <h1 className='text-3xl text-gray-200'>Oops...</h1>
                <p className='text-[100px] leading-[100px] text-white'>404</p>
                <p className='text-3xl text-center uppercase text-white'>
                    Page {error.statusText || error.message}
                </p>
                <Link
                    to='/'
                    className='min-w-[100px] min-h-[40px] p-3 bg-blue-800 shadow-xl text-white hover:opacity-90 rounded-xl capitalize'
                >
                    Back To Home
                </Link>
            </div>
        </div>
    )
}
