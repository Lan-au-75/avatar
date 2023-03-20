import Container from '@/components/Container'
import SEO from '@/components/SEO'
import Sidebar from '@/components/Sidebar'
import { SkeletonHeader } from '@/components/Skeleton'
import ToastMessage from '@/components/ToastMessage'
import { useBookmark } from '@/context/BookmarkContext'
import React, { Suspense } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Outlet, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const Header = React.lazy(() => import('./Header'))

function Layout1() {
    const location = useLocation()

    return (
        <>
            <SEO title='Home' description='Home Page' />
            <Suspense fallback={<SkeletonHeader />}>
                <Header />
            </Suspense>

            <section className='main'>
                <Suspense>
                    <div className='flex justify-between'>
                        <Sidebar />

                        {location.pathname === '/' ? <Container /> : <Outlet />}
                    </div>
                </Suspense>
            </section>
        </>
    )
}

export default Layout1
