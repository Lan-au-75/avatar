import SEO from '@/components/SEO'
import { SkeletonHeader } from '@/components/Skeleton'
import React, { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'

const Header = React.lazy(() => import('./Header'))
const Dashboard = React.lazy(() => import('@/components/Dashboard'))

function Layout1() {
    return (
        <>
            <SEO title='Home' description='Home Page' />
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
