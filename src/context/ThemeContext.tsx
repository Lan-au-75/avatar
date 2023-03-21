import { createContext, useState, useEffect, useContext } from 'react'

interface Props {
    theme: string
    setTheme: React.Dispatch<React.SetStateAction<string>>
}

const ThemeContext = createContext<Props>({
    theme: 'dark',
    setTheme: () => {},
})

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<string>(
        () => JSON.parse(localStorage.theme ?? null) ?? 'dark'
    )

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme))
        if (
            theme === 'dark' ||
            (!(theme in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark')
            document.documentElement.style.background = '#0b0809'
        } else {
            document.documentElement.classList.remove('dark')
            document.documentElement.style.background = '#fff'
        }
    }, [theme])

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider

export const useTheme = () => useContext(ThemeContext)
