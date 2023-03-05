import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DetailMovie from './components/DetailMovie'
import DetailTV from './components/DetailTV'
import PaginationProvider from './context/PaginationContext'
import Layout1 from './layouts/Layout1'
import AiringToDay from './pages/airingToDay'
import ErrorPage from './pages/error-page'
import Movies from './pages/movies'
import NowPlaying from './pages/nowPlaying'
import Popular from './pages/popular'
import TopRated from './pages/topRated'
import Trending from './pages/trending'
import TVShow from './pages/tvShows'
import Upcoming from './pages/upcoming'
import Watching from './pages/watching'
import WatchingTV from './pages/watchingTv'

interface IProps {
    children: React.ReactNode
}

export default function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout1 />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/movies',
                    element: <Movies />,
                    children: [
                        {
                            path: 'trending',
                            element: (
                                <PaginationProvider>
                                    <Trending />
                                </PaginationProvider>
                            ),
                        },

                        {
                            path: 'now-playing',
                            element: (
                                <PaginationProvider>
                                    <NowPlaying />
                                </PaginationProvider>
                            ),
                        },
                        {
                            path: 'top-rated',
                            element: (
                                <PaginationProvider>
                                    <TopRated />
                                </PaginationProvider>
                            ),
                        },
                        {
                            path: 'upcoming',
                            element: (
                                <PaginationProvider>
                                    <Upcoming />
                                </PaginationProvider>
                            ),
                        },
                        {
                            path: 'popular',
                            element: (
                                <PaginationProvider>
                                    <Popular />
                                </PaginationProvider>
                            ),
                        },
                    ],
                },
                {
                    path: '/tv shows',
                    element: <TVShow />,
                    children: [
                        {
                            path: 'airingToDay',
                            element: (
                                <PaginationProvider>
                                    <AiringToDay />
                                </PaginationProvider>
                            ),
                        },
                    ],
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
    ])
    return <RouterProvider router={router}></RouterProvider>
}
