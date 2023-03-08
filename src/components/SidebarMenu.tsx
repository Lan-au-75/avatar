import SidebarRow from './SidebarRow'

interface Props {
    title?: string
    data: any
    isCollapsed?: boolean
}

function SidebarMenu({ title, data, isCollapsed }: Props) {
    return (
        <ul className='flex flex-col gap-y-4 pb-6 pt-3'>
            {title && (
                <label htmlFor='' className='px-3 uppercase'>
                    {!isCollapsed && title}
                </label>
            )}
            {data.map((item: any) => (
                <SidebarRow
                    key={item.title}
                    href={item.href}
                    title={item.title}
                    Icon={item.Icon}
                    ActiveIcon={item.ActiveIcon}
                    isCollapsed={isCollapsed}
                />
            ))}
        </ul>
    )
}

export default SidebarMenu
