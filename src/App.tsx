import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddMovie from './components/AddMovie'
import Dashboard from './components/Dashboard'
import Protected from './components/Protected'
import Toast from './components/Toast'
import ContextProvider from './context/ContextProvider'
import Layout1 from './layouts/Layout1'
import AiringToDay from './pages/airingToDay'
import Bookmark from './pages/bookmark'
import DetailMovie from './pages/detailMovie'
import DetailTV from './pages/detailTV'
import ErrorPage from './pages/error-page'
import Filter from './pages/filter'
import Login from './pages/login'
import Movies from './pages/movies'
import NowPlaying from './pages/nowPlaying'
import Popular from './pages/popular'
import SignUp from './pages/sign-up'
import TopRated from './pages/topRated'
import Trending from './pages/trending'
import TVShow from './pages/tvShows'
import Upcoming from './pages/upcoming'
import Watching from './pages/watching'
import WatchingTV from './pages/watchingTv'

export default function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <ContextProvider>
                    <Protected>
                        <Layout1 />
                    </Protected>
                </ContextProvider>
            ),
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/movies',
                    element: <Movies />,
                    children: [
                        {
                            path: 'trending',
                            element: <Trending />,
                        },

                        {
                            path: 'now-playing',
                            element: <NowPlaying />,
                        },
                        {
                            path: 'top-rated',
                            element: <TopRated />,
                        },
                        {
                            path: 'upcoming',
                            element: <Upcoming />,
                        },
                        {
                            path: 'popular',
                            element: <Popular />,
                        },
                    ],
                },
                {
                    path: '/tv shows',
                    element: <TVShow />,
                    children: [
                        {
                            path: 'airingToDay',
                            element: <AiringToDay />,
                        },
                    ],
                },

                {
                    path: '/bookmarked',
                    element: <Bookmark />,
                },
                {
                    path: '/filter',
                    element: <Filter />,
                },
            ],
        },
        {
            path: 'detail/:detailID',
            element: <DetailMovie />,
        },

        {
            path: 'detailTV/:detailID',
            element: <DetailTV />,
        },

        {
            path: 'watching/:watchingKey/:detailID',
            element: (
                <ContextProvider>
                    <Watching />
                </ContextProvider>
            ),
        },
        {
            path: 'watchingTV/:watchingKey/:detailID',
            element: (
                <ContextProvider>
                    <WatchingTV />
                </ContextProvider>
            ),
        },
        {
            path: '/login',
            element: (
                <ContextProvider>
                    <Login />
                </ContextProvider>
            ),
        },
        {
            path: '/sign up',
            element: (
                <ContextProvider>
                    <SignUp />
                </ContextProvider>
            ),
        },
        {
            path: '/dashboard',
            element: (
                <ContextProvider>
                    <Dashboard />
                </ContextProvider>
            ),
            children: [
                {
                    path: 'movies/add',
                    element: <AddMovie />,
                },
                {
                    path: 'movies/:id',
                    element: <AddMovie />,
                },
            ],
        },
    ])
    return (
        <>
            <Toast />
            <RouterProvider router={router}></RouterProvider>
        </>
    )
}
