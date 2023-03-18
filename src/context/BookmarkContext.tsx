import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { createContext, useContext, useRef, useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import ToastMessage from '@/components/ToastMessage'
import { db } from '@/firebase'
import { Movie } from '@/types/movies.type'
import { userAth } from './AuthContext'

interface Props {
    handleBookmark: (movie: Movie) => Promise<void>
    handleRemoveBookmark: (movie: Movie) => Promise<void>
    result: Movie[]
}

const BookmarkContext = createContext<Props>({
    handleBookmark: async () => {},
    handleRemoveBookmark: async () => {},
    result: [],
})

function BookmarkProvider({ children }: { children: React.ReactNode }) {
    const { user } = userAth()
    const [result, setResult] = useState<Movie[]>([])

    const savedMovies = useRef<Movie[]>([])

    // handle show toast and bookmark
    const handleBookmark = async (movie: Movie) => {
        const obj = {
            id: movie.id,
            poster_path: movie.poster_path || movie.backdrop_path,
            original_title: movie.original_title || movie.name,
            vote_average: movie.vote_average,
            release_date: movie.release_date || movie.first_air_date,
            media_type: movie.media_type || 'movie',
        }

        await updateDoc(doc(db, 'users', user?.email as string), {
            savedMovies: arrayUnion(obj),
        })

        // saved movies when user click

        savedMovies.current.push(obj as Movie)

        // handle some id
        const newArr = savedMovies.current.filter(
            (item, i, origin) => i === origin.findIndex((t) => t.id === item.id)
        )

        localStorage.setItem('saveMovies', JSON.stringify(newArr))

        // toast

        toast.success(
            <ToastMessage status='Success' message='You have successfully saved the movie' />,
            {
                icon: (
                    <AiFillCheckCircle className='text-green-500 text-lg md:text-xl text-center' />
                ),
            }
        )
    }

    //  handle remove bookmark
    const handleRemoveBookmark = async (movie: Movie) => {
        const newArr: Movie[] = JSON.parse(localStorage.getItem('saveMovies') as string)
        const result = newArr.filter((item) => item.id !== movie.id)

        if (result) {
            setResult(result)
        }

        localStorage.setItem('saveMovies', JSON.stringify(result))

        await updateDoc(doc(db, 'users', user?.email as string), {
            savedMovies: result,
        })

        // toast

        toast.success(
            <ToastMessage status='Success' message='You have successfully delete the movie' />,
            {
                icon: (
                    <AiFillCheckCircle className='text-green-500 text-lg md:text-xl text-center' />
                ),
            }
        )
    }

    return (
        <BookmarkContext.Provider value={{ handleBookmark, handleRemoveBookmark, result }}>
            {' '}
            {children}
        </BookmarkContext.Provider>
    )
}

export default BookmarkProvider

export const useBookmark = () => useContext(BookmarkContext)
