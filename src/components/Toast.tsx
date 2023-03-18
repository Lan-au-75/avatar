import { AiOutlineClose } from 'react-icons/ai'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Toast() {
    const contextClass: any = {
        success: 'bg-base200',
        // error: 'bg-red-600',
        // info: 'bg-gray-600',
        // warning: 'bg-orange-400',
        // default: 'bg-indigo-600',
        // dark: 'bg-white-600 font-gray-300',
    }

    return (
        <>
            <ToastContainer
                className='flex flex-col gap-3 !top-14'
                toastClassName={({ type }: any) =>
                    contextClass[type || 'default'] +
                    ' relative flex p-1 min-h-10 border-l-4 border-solid border-green-500 rounded-sm items-center justify-between overflow-hidden cursor-pointer'
                }
                bodyClassName={() =>
                    'flex items-center  justify-center  gap-2 md:gap-3 text-sm font-white font-med block p-1'
                }
                hideProgressBar
                position='top-right'
                autoClose={3000}
                transition={Slide}
                closeButton={({ closeToast }: any) => (
                    <AiOutlineClose
                        onClick={closeToast}
                        className='text-gray-300 text-lg md:text-xl ml-1 mr-3 hover:opacity-80'
                    />
                )}
            />
        </>
    )
}

export default Toast
