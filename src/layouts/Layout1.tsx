import Footer from './Footer'
import React, { Suspense } from 'react'
import { SkeletonHeader } from '@/components/Skeleton'

const Header = React.lazy(() => import('./Header'))
const Dashboard = React.lazy(() => import('@/components/Dashboard'))

function Layout1() {
    return (
        <>
            <Suspense fallback={<SkeletonHeader />}>
                <Header />
            </Suspense>

            <section className='main'>
                <Suspense>
                    <Dashboard />
                </Suspense>
            </section>
        </>
    )
}

export default Layout1
