import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DetailMovie from './components/DetailMovie'
import DetailTV from './components/DetailTV'
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
import Watching from './pages/watchcing'

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
                            element: <Trending />,
                            children: [
                                {
                                    path: ':pageID',
                                    element: <Trending />,
                                },
                            ],
                        },

                        {
                            path: 'now-playing',
                            element: <NowPlaying />,
                            children: [
                                {
                                    path: ':pageID',
                                    element: <NowPlaying />,
                                },
                            ],
                        },
                        {
                            path: 'top-rated',
                            element: <TopRated />,
                            children: [
                                {
                                    path: ':pageID',
                                    element: <TopRated />,
                                },
                            ],
                        },
                        {
                            path: 'upcoming',
                            element: <Upcoming />,
                            children: [
                                {
                                    path: ':pageID',
                                    element: <Upcoming />,
                                },
                            ],
                        },
                        {
                            path: 'popular',
                            element: <Popular />,
                            children: [
                                {
                                    path: ':pageID',
                                    element: <Popular />,
                                },
                            ],
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
                            children: [
                                {
                                    path: ':pageID',
                                    element: <AiringToDay />,
                                },
                            ],
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
    ])
    return <RouterProvider router={router} />
}
