import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },

    // define: {
    //     'process.env.REACT_APP_BASE_URL': `"${process.env.REACT_APP_BASE_URL}"`,
    //     'process.env.REACT_APP_IMDB_API_kEYL': `"${process.env.REACT_APP_IMDB_API_kEYL}"`,
    // },
})
