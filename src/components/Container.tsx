import {
    fetchNowPlaying,
    fetchPopularity,
    fetchTopRated,
    fetchTrendingMovie,
    fetchUpcoming,
} from '@/hooks/fetchApi'
import { Category } from '@/types/movies.type'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { AiFillCheckCircle, AiOutlineClose } from 'react-icons/ai'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ToastMessage from './ToastMessage'

import Row from './Row'
import Thumbnail1 from './Thumbnail1'
import Thumbnail2 from './Thumbnail2'
import Thumbnail3 from './Thumbnail3'

function Container() {
    const trendingMovie = useQuery(['trendingData'], () => fetchTrendingMovie(Category.Movie))
    const nowPlaying = useQuery(['nowPlayingData'], async () => fetchNowPlaying())
    const topRated = useQuery(['topRatedData'], async () => fetchTopRated(Category.Movie))
    const upcoming = useQuery(['upcomingData'], async () => fetchUpcoming())
    const popularity = useQuery(['popularityData'], async () => fetchPopularity(Category.Movie))

    const [showToast, setShowToast] = useState<boolean>(false)

    const contextClass: any = {
        success: 'bg-base200',
        // error: 'bg-red-600',
        // info: 'bg-gray-600',
        // warning: 'bg-orange-400',
        // default: 'bg-indigo-600',
        // dark: 'bg-white-600 font-gray-300',
    }

    const Msg = () => (
        <div className='flex flex-col flex-1 gap-y-1'>
            <h2 className='text-base'>Success</h2>
            <p className='text-sm text-gray-400 normal-case line-clamp-2'>
                You have successfully saved the movie
            </p>
        </div>
    )

    // handle show toast
    const handleShowToast = () => {
        setShowToast(!showToast)
    }

    return (
        <div className='container-zero'>
            <Row
                title='Trending Movies'
                movies={trendingMovie.data?.movies}
                Thumbnail={Thumbnail2}
                isLoading={trendingMovie.isLoading}
                handleShowToast={handleShowToast}
            />
            <Row
                title='Continue watching'
                movies={nowPlaying.data?.movies}
                Thumbnail={Thumbnail3}
                isLoading={nowPlaying.isLoading}
            />
            <Row
                title='Top rated'
                movies={topRated.data?.movies}
                Thumbnail={Thumbnail1}
                isLoading={topRated.isLoading}
            />
            <Row
                title='Upcoming'
                movies={upcoming.data?.movies}
                Thumbnail={Thumbnail1}
                isLoading={upcoming.isLoading}
            />
            <Row
                title='Popular'
                movies={popularity.data?.movies}
                Thumbnail={Thumbnail1}
                isLoading={popularity.isLoading}
            />

            {/* toast message */}
            <ToastContainer
                className='flex flex-col gap-3 !top-14'
                toastClassName={({ type }: any) =>
                    contextClass[type || 'default'] +
                    ' relative flex p-1 min-h-10 border-l-4 border-solid border-green-500 rounded-sm items-center justify-between overflow-hidden cursor-pointer'
                }
                bodyClassName={() =>
                    'flex items-center  justify-center  gap-2 md:gap-3 text-sm font-white font-med block p-1'
                }
                hideProgressBar
                position='top-right'
                autoClose={3000}
                icon={
                    <AiFillCheckCircle className='text-green-500 text-lg md:text-xl text-center' />
                }
                closeButton={
                    <AiOutlineClose className='text-gray-300 text-lg md:text-xl ml-1 mr-3 hover:opacity-80' />
                }
                transition={Slide}
            />
            {showToast && toast.success(<Msg />)}
        </div>
    )
}

export default Container
