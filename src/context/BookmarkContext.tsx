import { createContext, useState, useContext, useEffect, useRef } from 'react'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { Movie } from '@/types/movies.type'
import { userAth } from './AuthContext'

interface Props {
    showToast: boolean
    handleBookmark: (movie: Movie) => Promise<void>
    handleRemoveBookmark: (movie: Movie) => Promise<void>
    result: Movie[]
}

const BookmarkContext = createContext<Props>({
    showToast: false,
    handleBookmark: async () => {},
    handleRemoveBookmark: async () => {},
    result: [],
})

function BookmarkProvider({ children }: { children: React.ReactNode }) {
    const { user } = userAth()
    const [showToast, setShowToast] = useState<boolean>(false)
    const [result, setResult] = useState<Movie[]>([])

    const savedMovies = useRef<Movie[]>(
        JSON.parse(localStorage.getItem('saveMovies') as string) ?? []
    )

    // handle show toast and bookmark
    const handleBookmark = async (movie: Movie) => {
        setShowToast(!showToast)

        const obj = {
            id: movie.id,
            poster_path: movie.poster_path || movie.backdrop_path,
            original_title: movie.original_title || movie.name,
            vote_average: movie.vote_average,
            release_date: movie.release_date,
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
    }

    return (
        <BookmarkContext.Provider
            value={{ showToast, handleBookmark, handleRemoveBookmark, result }}
        >
            {' '}
            {children}
        </BookmarkContext.Provider>
    )
}

export default BookmarkProvider

export const useBookmark = () => useContext(BookmarkContext)
