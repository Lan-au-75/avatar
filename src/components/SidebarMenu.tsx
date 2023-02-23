import SidebarRow from './SidebarRow'

interface Props {
    title?: string
    data?: any
}

function SidebarMenu({ title, data }: Props) {
    return (
        <ul className='flex flex-col gap-y-4 pb-6 pt-3'>
            {title && (
                <label htmlFor='' className='px-3 uppercase'>
                    {title}
                </label>
            )}
            {data.map((item: any) => (
                <SidebarRow
                    key={item.title}
                    href={item.href}
                    title={item.title}
                    Icon={item.Icon}
                    ActiveIcon={item.ActiveIcon}
                    active={item.active}
                />
            ))}
        </ul>
    )
}

export default SidebarMenu
