import Card from '@/components/Card'
import { userAth } from '@/context/AuthContext'
import { useSidebarCollapse } from '@/context/SidebarCollapseContext'
import { db } from '@/firebase'
import { Movie } from '@/types/movies.type'
import clsx from 'clsx'
import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

function Bookmark() {
    const { user } = userAth()
    const [data, setData] = useState<Movie[]>([])

    useEffect(() => {
        onSnapshot(doc(db, 'users', user?.email as string), (doc) => {
            setData(doc.data()?.savedMovies)
        })
    }, [user?.email])

    //  const totalPages = data.data?.totalPages
    const { isCollapsed } = useSidebarCollapse()

    return (
        <div className='flex flex-col gap-y-20'>
            <ul
                className={clsx(
                    'grid gap-x-3 md:gap-x-4 justify-start gap-y-20 grid-cols-2 mobile:grid-cols-3 md:grid-cols-3 xl:grid-cols-4',
                    isCollapsed && 'md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5'
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
    )
}

export default Bookmark
