import { ReactNode } from 'react'
import AuthProvider from './AuthContext'
import BookmarkProvider from './BookmarkContext'
import NavbarProvider from './NavbarMobile'
import PaginationProvider from './PaginationContext'
import SidebarCollapseProvider from './SidebarCollapseContext'

function ContextProvider({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <SidebarCollapseProvider>
                <BookmarkProvider>
                    <NavbarProvider>
                        <PaginationProvider>{children}</PaginationProvider>
                    </NavbarProvider>
                </BookmarkProvider>
            </SidebarCollapseProvider>
        </AuthProvider>
    )
}

export default ContextProvider
