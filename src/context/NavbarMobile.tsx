import { useState, createContext, useContext, ReactNode } from 'react'

interface Props {
    showNavbar: boolean
    setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>
}

const NavbarContext = createContext<Props>({
    showNavbar: false,
    setShowNavbar: () => {},
})

function NavbarProvider({ children }: { children: ReactNode }) {
    const [showNavbar, setShowNavbar] = useState<boolean>(false)
    return (
        <NavbarContext.Provider value={{ showNavbar, setShowNavbar }}>
            {children}
        </NavbarContext.Provider>
    )
}

export default NavbarProvider

export const useNavbarMobile = () => {
    const context = useContext(NavbarContext)

    return context
}
