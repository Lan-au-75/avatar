import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { AiFillCheckCircle, AiOutlineClose } from 'react-icons/ai'
import { useQuery } from 'react-query'
import { Slide, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
    fetchNowPlaying,
    fetchPopularity,
    fetchTopRated,
    fetchTrendingMovie,
    fetchUpcoming,
} from '@/hooks/fetchApi'
import { Category, Movie } from '@/types/movies.type'

import { userAth } from '@/context/AuthContext'
import { db } from '@/firebase'
import Row from './Row'
import Thumbnail1 from './Thumbnail1'
import Thumbnail2 from './Thumbnail2'
import Thumbnail3 from './Thumbnail3'
import ToastMessage from './ToastMessage'
import { useBookmark } from '@/context/BookmarkContext'

function Container() {
    const { showToast } = useBookmark()

    const trendingMovie = useQuery(['trendingData'], () => fetchTrendingMovie(Category.Movie))
    const nowPlaying = useQuery(['nowPlayingData'], async () => fetchNowPlaying())
    const topRated = useQuery(['topRatedData'], async () => fetchTopRated(Category.Movie))
    const upcoming = useQuery(['upcomingData'], async () => fetchUpcoming())
    const popularity = useQuery(['popularityData'], async () => fetchPopularity(Category.Movie))

    const contextClass: any = {
        success: 'bg-base200',
        // error: 'bg-red-600',
        // info: 'bg-gray-600',
        // warning: 'bg-orange-400',
        // default: 'bg-indigo-600',
        // dark: 'bg-white-600 font-gray-300',
    }

    return (
        <div className='container-zero'>
            <Row
                title='Trending Movies'
                movies={trendingMovie.data?.movies}
                Thumbnail={Thumbnail2}
                isLoading={trendingMovie.isLoading}
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
                transition={Slide}
                closeButton={({ closeToast }: any) => (
                    <AiOutlineClose
                        onClick={closeToast}
                        className='text-gray-300 text-lg md:text-xl ml-1 mr-3 hover:opacity-80'
                    />
                )}
            />
            {showToast &&
                toast.success(
                    <ToastMessage
                        status='Success'
                        message='You have successfully saved the movie'
                    />,
                    {
                        icon: (
                            <AiFillCheckCircle className='text-green-500 text-lg md:text-xl text-center' />
                        ),
                    }
                )}
        </div>
    )
}

export default Container
