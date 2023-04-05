import { deleteUser, getAllUser, getQuery, updateUser } from '@/apis/listUser.api'
import { usePagination } from '@/context/PaginationContext'
import { isActive } from '@/hooks/isActive'
import { DetailUser } from '@/types/users.type'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { AiFillCheckCircle, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { SkeletonTodo } from './Skeleton'
import ToastMessage from './ToastMessage'
import { Direction } from '@/types/utils.type'
import { useDebounce } from 'use-debounce'

function TodoListUser() {
    const { page, setPage } = usePagination()
    const [query, setQuery] = useState<string>('')
    const [debounce] = useDebounce(query, 1000)
    const { data, isLoading } = useQuery(['List User', page], () => getAllUser(page))
    const searchUser = useQuery(['List User', debounce, page], () => getQuery(debounce, page))
    const queryClient = useQueryClient()
    const [selectAll, setSelectAll] = useState<number[]>([])

    const navigate = useNavigate()

    const deleteOneMovie = useMutation((id: number) => deleteUser(id))

    const update = useMutation((item: DetailUser) =>
        updateUser(item._id, { name: item.name, email: item.email, phone: item.phone })
    )

    // const handleSortAtoZ = async () => {
    //     const result = data?.sort((a: ListUser, b: ListUser) => {
    //         const nameA = a.name.toUpperCase()
    //         const nameB = b.name.toUpperCase()

    //         if (nameA < nameB) {
    //             return -1
    //         }

    //         return 0
    //     })

    //     await Promise.all([
    //         result?.map((item) => {
    //             update.mutateAsync(item, {
    //                 onSuccess: () => {
    //                     queryClient.setQueryData(['List User'], result)
    //                 },
    //             })
    //         }),
    //     ])
    // }

    // const handleSortZtoA = async () => {
    //     const result = data?.sort((a: ListUser, b: ListUser) => {
    //         const nameA = a.name.toUpperCase()
    //         const nameB = b.name.toUpperCase()

    //         if (nameA > nameB) {
    //             return -1
    //         }

    //         return 0
    //     })

    //     await Promise.all([
    //         result?.map((item) => {
    //             update.mutateAsync(item, {
    //                 onSuccess: () => {
    //                     queryClient.setQueryData(['List User'], result)
    //                 },
    //             })
    //         }),
    //     ])
    // }

    const handleDelete = (id: number) => {
        deleteOneMovie.mutate(id, {
            onSuccess: (data) => {
                queryClient.invalidateQueries('List User')
                toast.success(
                    <ToastMessage status='Success' message='You have successfully delete the movie' />,
                    {
                        icon: <AiFillCheckCircle className='text-green-500 text-lg md:text-xl text-center' />,
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
                        queryClient.invalidateQueries('List User')
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
        data?.result?.map((item) =>
            setSelectAll((prev) => {
                const isChecked = selectAll.includes(item._id)

                if (isChecked) {
                    return (prev = [])
                } else {
                    return [...prev, item._id]
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

    // handle Click prev or next
    const handleNextAndPrev = (direction: string) => {
        if (direction === Direction.Prev) {
            setPage(page - 1)
            navigate(`?page=${page - 1}`)
        } else {
            setPage(page + 1)
            navigate(`?page=${page + 1}`)
        }
    }

    return (
        <main className='container-zero relative pr-5'>
            <div className='absolute top-0 -left-8 h-[200px] w-[200px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
            <div className='absolute top-0 -left-8 h-[200px] w-[200px] rounded-full bg-blue-500 blur-3xl -z-10'></div>
            <h2 className='text-white text-xl md:text-2xl'>List User</h2>

            <Link
                to='add'
                className='btnCustom max-w-[120px] max-h-[60px] text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
            >
                Add User
            </Link>

            <ul className='flex items-center justify-between'>
                <button
                    className='btnCustom flex-1 max-w-[120px] max-h-[60px] text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-red-800'
                    onClick={handleDeleteAll}
                >
                    Delete All
                </button>

                {/* Search */}

                <form className='w-[400px]'>
                    <label
                        htmlFor='default-search'
                        className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                    >
                        Search
                    </label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <svg
                                aria-hidden='true'
                                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                ></path>
                            </svg>
                        </div>
                        <input
                            value={query}
                            type='search'
                            id='default-search'
                            className='outline-none block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder='Search...'
                            required
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </form>

                {/* sort  */}

                <div className='flex items-center min-w-[120px] gap-3 md:gap-4'>
                    <button
                        className='btnCustom  flex-1 max-w-[60px] rounded-lg min-h-[40px] bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-700 focus:outline-none'
                        // onClick={handleSortAtoZ}
                    >
                        <AiOutlineSortAscending className='text-xl md:text-2xl text-white ' />
                    </button>
                    <button
                        className='btnCustom flex-1 max-w-[60px] rounded-lg min-h-[40px] bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-700 focus:outline-none'
                        // onClick={handleSortZtoA}
                    >
                        <AiOutlineSortDescending className='text-xl md:text-2xl text-white' />
                    </button>
                </div>
            </ul>

            {isLoading && <SkeletonTodo />}

            {/* table  */}
            {!isLoading && (
                <div className='relative shadow-md sm:rounded-lg'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
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
                                    Name
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Email
                                </th>

                                <th scope='col' className='px-6 py-3'>
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {debounce
                                ? searchUser.data?.map((item) => (
                                      <tr
                                          key={uuidv4()}
                                          className='border-b bg-white dark:bg-gray-800 border-gray-700 hover:bg-gray-600 transition-all duration-200 ease-in-out'
                                      >
                                          <td className='w-4 p-4 '>
                                              <input
                                                  type='checkbox'
                                                  className='w-4 h-4 text-blue-600  rounded focus:rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600'
                                                  onChange={() => handleCheck(item._id)}
                                                  checked={selectAll.includes(item._id)}
                                              />
                                          </td>
                                          <td className='px-6 py-4 font-medium whitespace-nowrap'>
                                              {item._id}
                                          </td>

                                          <td className='px-6 py-4'>{item.name}</td>
                                          <td className='px-6 py-4'>{item.email}</td>

                                          <td className='px-6 py-4'>
                                              <div className='flex items-center gap-3'>
                                                  <Link
                                                      to={`${item._id}`}
                                                      className='font-medium  text-blue-500 hover:underline'
                                                  >
                                                      Edit
                                                  </Link>

                                                  <a
                                                      href='#'
                                                      className='font-medium text-red-500 hover:underline'
                                                      onClick={() => handleDelete(item._id)}
                                                  >
                                                      Delete
                                                  </a>
                                              </div>
                                          </td>
                                      </tr>
                                  ))
                                : data?.result.map((item) => (
                                      <tr
                                          key={uuidv4()}
                                          className='border-b bg-white hover:bg-gray-50 dark:bg-gray-800 border-gray-700 dark:hover:bg-gray-600 transition-all duration-200 ease-in-out'
                                      >
                                          <td className='w-4 p-4 '>
                                              <input
                                                  type='checkbox'
                                                  className='w-4 h-4 text-blue-600  rounded focus:rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600'
                                                  onChange={() => handleCheck(item._id)}
                                                  checked={selectAll.includes(item._id)}
                                              />
                                          </td>
                                          <td className='px-6 py-4 font-medium whitespace-nowrap'>
                                              {item._id}
                                          </td>

                                          <td className='px-6 py-4'>{item.name}</td>
                                          <td className='px-6 py-4'>{item.email}</td>

                                          <td className='px-6 py-4'>
                                              <div className='flex items-center gap-3'>
                                                  <Link
                                                      to={`${item._id}`}
                                                      className='font-medium  text-blue-500 hover:underline'
                                                  >
                                                      Edit
                                                  </Link>

                                                  <a
                                                      href='#'
                                                      className='font-medium text-red-500 hover:underline'
                                                      onClick={() => handleDelete(item._id)}
                                                  >
                                                      Delete
                                                  </a>
                                              </div>
                                          </td>
                                      </tr>
                                  ))}
                        </tbody>
                    </table>

                    {/* pagination */}
                    <nav className='flex items-center justify-between pt-4' aria-label='Table navigation'>
                        <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                            Showing <span className='font-semibold text-gray-900 dark:text-white'>1-10</span>{' '}
                            of <span className='font-semibold text-gray-900 dark:text-white'>1000</span>
                        </span>
                        <ul className='inline-flex items-center -space-x-px'>
                            <li>
                                <button
                                    className='disabled:opacity-30 block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                    onClick={() => handleNextAndPrev(Direction.Prev)}
                                    disabled={page === 1}
                                >
                                    <span className='sr-only'>Previous</span>
                                    <svg
                                        className='w-5 h-5'
                                        aria-hidden='true'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                                            clipRule='evenodd'
                                        ></path>
                                    </svg>
                                </button>
                            </li>

                            {Array(data?.total_pages)
                                .fill('')
                                .map((__, index) => {
                                    const pageNumber = index + 1

                                    return (
                                        <li key={uuidv4()}>
                                            <NavLink
                                                to={`?page=${pageNumber}`}
                                                className={clsx(
                                                    'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                                                    isActive(pageNumber, 'page') &&
                                                        'bg-gray-500 dark:bg-gray-900 text-gray-400'
                                                )}
                                            >
                                                {pageNumber}
                                            </NavLink>
                                        </li>
                                    )
                                })}

                            <li>
                                <button
                                    className='disabled:opacity-30 block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                    onClick={() => handleNextAndPrev(Direction.Next)}
                                    disabled={page === data?.total_pages}
                                >
                                    <span className='sr-only'>Next</span>
                                    <svg
                                        className='w-5 h-5'
                                        aria-hidden='true'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                                            clipRule='evenodd'
                                        ></path>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </main>
    )
}

export default TodoListUser
