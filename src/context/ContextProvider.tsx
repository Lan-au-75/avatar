import { ReactNode } from 'react'
import AuthProvider from './AuthContext'
import BookmarkProvider from './BookmarkContext'
import NavbarProvider from './NavbarMobile'
import PaginationProvider from './PaginationContext'
import SidebarCollapseProvider from './SidebarCollapseContext'
import ThemeProvider from './ThemeContext'

function ContextProvider({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <SidebarCollapseProvider>
                <BookmarkProvider>
                    <NavbarProvider>
                        <ThemeProvider>
                            {' '}
                            <PaginationProvider>{children}</PaginationProvider>
                        </ThemeProvider>
                    </NavbarProvider>
                </BookmarkProvider>
            </SidebarCollapseProvider>
        </AuthProvider>
    )
}

export default ContextProvider
