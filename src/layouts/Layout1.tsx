import Dashboard from '@/components/Dashboard'
import Footer from './Footer'
import Header from './Header'

function Layout1() {
    return (
        <>
            <Header />

            <section className='main'>
                <Dashboard />
            </section>

            <Footer />
        </>
    )
}

export default Layout1
