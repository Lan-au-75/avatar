import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import { addMovie, getMovie, updateMovie } from '@/apis/listMovie.api'
import { FormState, ListMovie } from '@/types/mockapi.type'
import { toast } from 'react-toastify'
import ToastMessage from './ToastMessage'
import { AiFillCheckCircle } from 'react-icons/ai'

function AddMovie() {
    const location = useLocation()
    const { id } = useParams<{ id: string }>()
    const isAdd = location.pathname.includes('add')
    const queryClient = useQueryClient()
    const [formState, setFormState] = useState<FormState>(() => ({
        title: '',
        post_path: '',
    }))

    useQuery(['movies', id], () => getMovie(id as string), {
        enabled: id !== undefined,
        onSuccess: (data) => setFormState(data),
    })

    const add = useMutation(addMovie)
    const update = useMutation(() => updateMovie(id as string, formState as ListMovie))

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isAdd) {
            // add
            add.mutate(formState, {
                onSuccess: (data) => {
                    setFormState({ title: '', post_path: '' })

                    toast.success(
                        <ToastMessage
                            status='Success'
                            message='You have successfully add the movie'
                        />,
                        {
                            icon: (
                                <AiFillCheckCircle className='text-green-500 text-lg md:text-xl text-center' />
                            ),
                        }
                    )
                },
            })
        } else {
            //update
            update.mutate(undefined, {
                onSuccess: (data) => {
                    queryClient.setQueryData(['movies', id], data.data)

                    toast.success(
                        <ToastMessage
                            status='Success'
                            message='You have successfully update the movie'
                        />,
                        {
                            icon: (
                                <AiFillCheckCircle className='text-green-500 text-lg md:text-xl text-center' />
                            ),
                        }
                    )
                },
            })
        }
    }

    // curring
    const handleChange = (name: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: e.target.value }))

    // clear function
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(formState.post_path)
        }
    }, [formState.post_path])

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return
        }
        const file = e.target.files[0]

        setFormState((prev) => ({ ...prev, post_path: URL.createObjectURL(file) }))

        e.target.value = ''
    }

    return (
        <main className='container-zero'>
            <h2 className='text-white text-xl md:text-2xl'>{isAdd ? 'Add' : 'Edit'} Movie</h2>

            <form
                action=''
                className='flex flex-col gap-y-3 md:gap-y-4 bg-gray-700 text-gray-400 rounded-md max-w-[500px] px-6 py-4'
                onSubmit={handleSubmit}
            >
                <div className='flex flex-col gap-y-2 text-white md:text-lg'>
                    <label htmlFor=''>Name</label>
                    <input
                        value={formState.title}
                        type='text'
                        name=''
                        className='p-3 outline-none border-b-2 border-solid border-blue-500 bg-base200  flex-1 text-base'
                        onChange={handleChange('title')}
                    />
                </div>
                <div className='flex flex-col gap-y-2 text-white md:text-lg'>
                    <label htmlFor=''>Avatar</label>
                    <input type='file' name='' onChange={(e) => handleFile(e)} />
                </div>

                {isAdd ? (
                    <button
                        type='submit'
                        className='btnCustom capitalize max-w-[120px] max-h-[60px] text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
                    >
                        submit
                    </button>
                ) : (
                    <div className='flex items-center gap-3 md:gap-4'>
                        <button
                            type='submit'
                            className='btnCustom capitalize max-w-[120px] max-h-[60px] text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
                        >
                            save
                        </button>
                    </div>
                )}
            </form>

            {formState.post_path && <img src={formState.post_path} alt='' />}
        </main>
    )
}

export default AddMovie
