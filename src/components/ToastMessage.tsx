interface Props {
    status: string
    message: string
}

function ToastMessage({ message, status }: Props) {
    return (
        <div className='flex flex-col flex-1 gap-y-1'>
            <h2 className='text-base'>{status}</h2>
            <p className='text-sm text-gray-400 normal-case line-clamp-2'>{message}</p>
        </div>
    )
}

export default ToastMessage
