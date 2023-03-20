import { deleteMovie, getMovies, updateMovie } from '@/apis/listMovie.api'
import { ListMovie, FormState } from '@/types/mockapi.type'

import { handleImgError } from '@/hooks/handleImgError'
import { useState } from 'react'
import { AiFillCheckCircle, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { SkeletonTodo } from './Skeleton'
import ToastMessage from './ToastMessage'

function TodoList() {
    const { data, isLoading } = useQuery(['List Movie'], () => getMovies())
    const queryClient = useQueryClient()
    const [selectAll, setSelectAll] = useState<number[]>([])

    const deleteOneMovie = useMutation((id: number) => deleteMovie(id))

    const update = useMutation((item: ListMovie) =>
        updateMovie(item.id, { title: item.title, post_path: item.post_path })
    )

    const handleSortAtoZ = async () => {
        const result = data?.sort((a: ListMovie, b: ListMovie) => {
            const nameA = a.title.toUpperCase()
            const nameB = b.title.toUpperCase()

            if (nameA < nameB) {
                return -1
            }

            return 0
        })

        await Promise.all([
            result?.map((item) => {
                update.mutateAsync(item, {
                    onSuccess: () => {
                        queryClient.setQueryData(['List Movie'], result)
                    },
                })
            }),
        ])
    }

    const handleSortZtoA = async () => {
        const result = data?.sort((a: ListMovie, b: ListMovie) => {
            const nameA = a.title.toUpperCase()
            const nameB = b.title.toUpperCase()

            if (nameA > nameB) {
                return -1
            }

            return 0
        })

        await Promise.all([
            result?.map((item) => {
                update.mutateAsync(item, {
                    onSuccess: () => {
                        queryClient.setQueryData(['List Movie'], result)
                    },
                })
            }),
        ])
    }

    const handleDelete = (id: number) => {
        deleteOneMovie.mutate(id, {
            onSuccess: (data) => {
                queryClient.invalidateQueries('List Movie')
                toast.success(
                    <ToastMessage
                        status='Success'
                        message='You have successfully delete the movie'
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

    const handleDeleteAll = async () => {
        await Promise.all(
            selectAll.map((id) =>
                deleteOneMovie.mutateAsync(id, {
                    onSuccess: async () => {
                        queryClient.invalidateQueries('List Movie')
                        toast.success(
                            <ToastMessage
                                status='Success'
                                message='You have successfully delete the movie'
                            />,
                            {
                                icon: (
                                    <AiFillCheckCircle className='text-green-500 text-lg md:text-xl text-center' />
                                ),
                            }
                        )
                    },
                })
            )
        )
    }

    const handleCheckAll = () => {
        data?.map((item) =>
            setSelectAll((prev) => {
                const isChecked = selectAll.includes(item.id)

                if (isChecked) {
                    return (prev = [])
                } else {
                    return [...prev, item.id]
                }
            })
        )
    }

    const handleCheck = (id: number) => {
        setSelectAll((prev) => {
            const isChecked = selectAll.includes(id)
            if (isChecked) {
                return selectAll.filter((selectID) => selectID !== id)
            } else {
                return [...prev, id]
            }
        })
    }

    return (
        <main className='container-zero relative pr-5'>
            <div className='absolute top-0 -left-8 h-[200px] w-[200px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
            <div className='absolute top-0 -left-8 h-[200px] w-[200px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
            <h2 className='text-white text-xl md:text-2xl'>List Movie</h2>

            <Link
                to='movies/add'
                className='btnCustom max-w-[120px] max-h-[60px] text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
            >
                Add Movie
            </Link>

            <ul className='flex items-center justify-between'>
                <button
                    className='btnCustom flex-1 max-w-[120px] max-h-[60px] text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-red-800'
                    onClick={handleDeleteAll}
                >
                    Delete All
                </button>

                <div className='flex items-center min-w-[120px] gap-3 md:gap-4'>
                    <button
                        className='btnCustom  flex-1 max-w-[60px] rounded-lg min-h-[40px] bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-700 focus:outline-none'
                        onClick={handleSortAtoZ}
                    >
                        <AiOutlineSortAscending className='text-xl md:text-2xl text-white ' />
                    </button>
                    <button
                        className='btnCustom flex-1 max-w-[60px] rounded-lg min-h-[40px] bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-700 focus:outline-none'
                        onClick={handleSortZtoA}
                    >
                        <AiOutlineSortDescending className='text-xl md:text-2xl text-white' />
                    </button>
                </div>
            </ul>

            {isLoading && <SkeletonTodo />}

            {/* table  */}
            {!isLoading && (
                <div className='relative overflow-y-auto scrollBarCustom shadow-md sm:rounded-lg'>
                    <table className='w-full text-sm text-left text-gray-400'>
                        <thead className='text-xs uppercase bg-gray-700 text-gray-400'>
                            <tr>
                                <th scope='col' className='p-4'>
                                    <input
                                        type='checkbox'
                                        className='w-4 h-4 text-blue-600  rounded focus:rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600'
                                        onChange={handleCheckAll}
                                    />
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    ID
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Avatar
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Name
                                </th>

                                <th scope='col' className='px-6 py-3'>
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {data?.map((item) => (
                                <tr
                                    key={uuidv4()}
                                    className='border-b bg-gray-800 border-gray-700 hover:bg-gray-600 transition-all duration-200 ease-in-out'
                                >
                                    <td className='w-4 p-4 '>
                                        <input
                                            type='checkbox'
                                            className='w-4 h-4 text-blue-600  rounded focus:rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600'
                                            onChange={() => handleCheck(item.id)}
                                            checked={selectAll.includes(item.id)}
                                        />
                                    </td>
                                    <td className='px-6 py-4 font-medium whitespace-nowrap text-white'>
                                        {item.id}
                                    </td>
                                    <td className='capitalize px-6 py-1'>
                                        <img
                                            src={item.post_path}
                                            alt=''
                                            className='w-12 h-12 object-cover object-center shrink-0'
                                            onError={(e) => handleImgError(e, '/no-img-avatar.png')}
                                        />
                                    </td>
                                    <td className='px-6 py-4 capitalize'>{item.title}</td>

                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <Link
                                                to={`movies/${item.id}`}
                                                className='font-medium  text-blue-500 hover:underline'
                                            >
                                                Edit
                                            </Link>

                                            <a
                                                href='#'
                                                className='font-medium text-red-500 hover:underline'
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    )
}

export default TodoList
