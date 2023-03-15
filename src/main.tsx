import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.scss'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </QueryClientProvider>
    // </React.StrictMode>
)
