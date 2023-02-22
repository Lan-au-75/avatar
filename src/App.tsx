import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout1 from './layouts/Layout1'
import ErrorPage from './pages/error-page'

export default function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout1 />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/movie',
                    element: <Layout1 />,
                },
                {
                    path: '/series',
                    element: <Layout1 />,
                },
                {
                    path: '/tv shows',
                    element: <Layout1 />,
                },
                {
                    path: '/home',
                    element: <Layout1 />,
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
