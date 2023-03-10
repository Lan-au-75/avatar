import { ReactNode } from 'react'
import AuthProvider from './AuthContext'
import NavbarProvider from './NavbarMobile'
import PaginationProvider from './PaginationContext'
import SidebarCollapseProvider from './SidebarCollapseContext'

function ContextProvider({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <SidebarCollapseProvider>
                <NavbarProvider>
                    <PaginationProvider>{children}</PaginationProvider>
                </NavbarProvider>
            </SidebarCollapseProvider>
        </AuthProvider>
    )
}

export default ContextProvider
