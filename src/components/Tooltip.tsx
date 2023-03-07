import clsx from 'clsx'

interface Props {
    offset: string
    tooltip: string
}

function Tooltip({ offset, tooltip }: Props) {
    return (
        <div
            className={clsx(
                'hidden group-hover:block absolute capitalize px-3 py-2 text-base rounded-lg bg-base200 animate-menuBox',
                offset
            )}
        >
            {tooltip}
        </div>
    )
}

export default Tooltip
