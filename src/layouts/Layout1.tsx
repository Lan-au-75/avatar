import Header from './Header'
import Footer from './Footer'
import React, { Suspense } from 'react'

const Dashboard = React.lazy(() => import('@/components/Dashboard'))

function Layout1() {
    return (
        <>
            <Header />

            <section className='main'>
                <Suspense fallback={<div>Loading...</div>}>
                    <Dashboard />
                </Suspense>
            </section>

            <Footer />
        </>
    )
}

export default Layout1
