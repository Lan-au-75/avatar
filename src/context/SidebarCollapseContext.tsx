import { useContext, useState, createContext } from 'react'

interface Props {
    isCollapsed: boolean
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarCollapseContext = createContext<Props>({
    isCollapsed: false,
    setIsCollapsed: () => {},
})

function SidebarCollapseProvider({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <SidebarCollapseContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            {children}
        </SidebarCollapseContext.Provider>
    )
}

export default SidebarCollapseProvider

export const useSidebarCollapse = () => {
    const context = useContext(SidebarCollapseContext)

    return context
}
