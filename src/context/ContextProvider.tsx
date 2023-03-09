import { ReactNode } from 'react'
import NavbarProvider from './NavbarMobile'
import PaginationProvider from './PaginationContext'
import SidebarCollapseProvider from './SidebarCollapseContext'

function ContextProvider({ children }: { children: ReactNode }) {
    return (
        <SidebarCollapseProvider>
            <NavbarProvider>
                <PaginationProvider>{children}</PaginationProvider>
            </NavbarProvider>
        </SidebarCollapseProvider>
    )
}

export default ContextProvider
