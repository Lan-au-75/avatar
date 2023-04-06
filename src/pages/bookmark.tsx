import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { DocumentData, doc, getDoc } from 'firebase/firestore'
import Card from '@/components/Card'
import SEO from '@/components/SEO'
import { useBookmark } from '@/context/BookmarkContext'
import { Movie } from '@/types/movies.type'
import { db } from '@/firebase'
import { userAth } from '@/context/AuthContext'

function Bookmark() {
    const { user } = userAth()

    const [data, setData] = useState<Movie[]>()

    useEffect(() => {
        ;(async () => {
            const docRef = doc(db, 'users', user?.email as string)
            const docSnap = await getDoc(docRef)
            const result = docSnap.data()
            result && setData(result.savedMovies)
        })()
    }, [user])

    //  const totalPages = data.data?.totalPages

    return (
        <>
            <SEO title='Bookmark' description='Bookmark Page' />

            <main className='container-movie '>
                <div className='absolute top-0 -left-8 h-[300px] w-[300px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
                <div className='absolute top-0 left-1/2 h-[300px] w-[300px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
                <div className='flex flex-col gap-y-20 w-full'>
                    <ul
                        className={clsx(
                            'grid gap-x-1 mobile:gap-x-3 md:gap-x-4 justify-center pc:justify-start gap-y-20 grid-cols-autoMini sm:grid-cols-autoMobile md:grid-cols-autoTablet lg:grid-cols-autoPC'
                        )}
                    >
                        {data?.map((savedMovie: Movie) => (
                            <li key={savedMovie.id}>
                                <Card movie={savedMovie} />
                            </li>
                        ))}
                    </ul>
                    {/* <div className='flex justify-center'>
                        <Pagination totalPages={totalPages} />
                    </div> */}
                </div>
            </main>
        </>
    )
}

export default Bookmark
