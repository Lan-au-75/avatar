import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Protected from './components/Protected'
import ContextProvider from './context/ContextProvider'
import Layout1 from './layouts/Layout1'
import AiringToDay from './pages/airingToDay'
import Bookmark from './pages/bookmark'
import DetailMovie from './pages/detailMovie'
import DetailTV from './pages/detailTV'
import ErrorPage from './pages/error-page'
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
            element: <Watching />,
        },
        {
            path: 'watchingTV/:watchingKey/:detailID',
            element: <WatchingTV />,
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
    ])
    return <RouterProvider router={router}></RouterProvider>
}
