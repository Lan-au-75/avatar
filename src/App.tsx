import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout1 from './layouts/Layout1'
import AiringToDay from './pages/airingToDay'
import DetailMovie from './pages/detail-movie'
import ErrorPage from './pages/error-page'
import Movies from './pages/movies'
import NowPlaying from './pages/nowPlaying'
import Popular from './pages/popular'
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
                            path: 'trending',
                            element: <Trending />,
                            children: [
                                {
                                    path: ':pageID',
                                },
                            ],
                        },

                        {
                            path: 'now-playing',
                            element: <NowPlaying />,
                            children: [
                                {
                                    path: ':pageID',
                                },
                            ],
                        },
                        {
                            path: 'top-rated',
                            element: <TopRated />,
                            children: [
                                {
                                    path: ':pageID',
                                },
                            ],
                        },
                        {
                            path: 'upcoming',
                            element: <Upcoming />,
                            children: [
                                {
                                    path: ':pageID',
                                },
                            ],
                        },
                        {
                            path: 'popular',
                            element: <Popular />,
                            children: [
                                {
                                    path: ':pageID',
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
    ])
    return <RouterProvider router={router} />
}
