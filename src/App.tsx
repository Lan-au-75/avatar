import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout1 from './layouts/Layout1'
import ErrorPage from './pages/error-page'
import Movies from './pages/movies'
import NowPlaying from './pages/nowPlaying'
import Popular from './pages/popular'
import Series from './pages/series'
import TopRated from './pages/topRated'
import Trending from './pages/trending'
import TVShow from './pages/tvShows'
import Upcoming from './pages/upcoming'

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
                            path: '/movies/trending',
                            element: <Trending />,

                            children: [
                                {
                                    path: '/movies/trending/:pageID',
                                    element: <Trending />,
                                },
                            ],
                        },
                        {
                            path: '/movies/now-playing',
                            element: <NowPlaying />,
                        },
                        {
                            path: '/movies/top-rated',
                            element: <TopRated />,
                        },
                        {
                            path: '/movies/upcoming',
                            element: <Upcoming />,
                        },
                        {
                            path: '/movies/popular',
                            element: <Popular />,
                        },
                    ],
                },

                {
                    path: '/series',
                    element: <Series />,
                },
                {
                    path: '/tv shows',
                    element: <TVShow />,
                },
                {
                    path: '/discovery',
                    element: <Layout1 />,
                },
                {
                    path: '/community',
                    element: <Layout1 />,
                },
                {
                    path: '/coming soon',
                    element: <Layout1 />,
                },

                {
                    path: '/recent',
                    element: <Layout1 />,
                },
                {
                    path: '/bookmarked',
                    element: <Layout1 />,
                },
                {
                    path: '/top rated',
                    element: <Layout1 />,
                },
                {
                    path: '/downloaded',
                    element: <Layout1 />,
                },
                {
                    path: '/settings',
                    element: <Layout1 />,
                },
                {
                    path: '/help',
                    element: <Layout1 />,
                },
            ],
        },
    ])

    return <RouterProvider router={router} />
}
