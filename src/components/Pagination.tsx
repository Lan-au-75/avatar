import clsx from 'clsx'
import { useState } from 'react'
import { FiChevronLeft, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { NavLink, useNavigate } from 'react-router-dom'
import { usePagination } from '@/context/PaginationContext'
import { isActive } from '@/hooks/isActive'
import { Direction } from '@/types/utils.type'

interface Props {
    totalPages: number | string | undefined
}

function Pagination({ totalPages }: Props) {
    const { page, setPage } = usePagination()
    const [isMoved, setIsMoved] = useState<boolean>(true)
    const navigate = useNavigate()

    const pageNumberIncrease = [page, page + 1, '...', page + 9]
    const pageNumberReduce = [page - 9, '...', page - 1, page]

    // handle Click prev or next
    const handleClick = (direction: string) => {
        setIsMoved(true)
        if (direction === Direction.Prev) {
            setPage(page - 1)
            navigate(`?page=${page - 1}`)
        } else {
            setPage(page + 1)
            navigate(`?page=${page + 1}`)
        }
    }

    // handle Click page
    const handleClickPage = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        currentPage: number | string
    ) => {
        setIsMoved(true)
        if (currentPage !== '...') {
            setPage(Number(currentPage))
        } else {
            e.preventDefault()
        }
    }

    // handle Click come start or end
    const handleClickStartAndEnd = (direction: string) => {
        if (direction === Direction.Start) {
            setPage(1)
            navigate(`?page=${1}`)
        } else {
            setPage(Number(totalPages))
            navigate(`?page=${totalPages}`)
            setIsMoved(true)
        }
    }

    return (
        <ul className='flex items-center gap-3 '>
            <button
                className={clsx('pagination rounded-full disabled:hidden', !isMoved && 'hidden')}
                onClick={() => handleClickStartAndEnd(Direction.Start)}
                disabled={page === 1}
            >
                <FiChevronsLeft className='text-xl md:text-2xl' />
            </button>

            <button
                className={clsx('pagination rounded-full disabled:hidden', !isMoved && 'hidden')}
                onClick={() => handleClick(Direction.Prev)}
                disabled={page === 1}
            >
                <FiChevronLeft className='text-xl md:text-2xl' />
            </button>

            {page >= 1 && page < Number(totalPages) - 8
                ? pageNumberIncrease.map((page) => (
                      <button
                          key={page}
                          className='flex items-center justify-center bg-base200 rounded-full overflow-hidden'
                      >
                          <NavLink
                              to={clsx('?page=' + page)}
                              className={() =>
                                  clsx(
                                      'pagination',
                                      isActive(page, 'page') ? 'bg-green-500 dark:bg-green-500' : ''
                                  )
                              }
                              onClick={(e) => handleClickPage(e, page)}
                          >
                              {page}
                          </NavLink>
                      </button>
                  ))
                : pageNumberReduce.map((page) => (
                      <button
                          key={page}
                          className='flex items-center justify-center bg-base200 rounded-full overflow-hidden'
                      >
                          <NavLink
                              to={clsx('?page=' + page)}
                              className={() =>
                                  clsx(
                                      'pagination',
                                      isActive(page, 'page') ? 'bg-green-500 dark:bg-green-500' : ''
                                  )
                              }
                              onClick={(e) => handleClickPage(e, page)}
                          >
                              {page}
                          </NavLink>
                      </button>
                  ))}

            {/* <button
                className='pagination disabled:hidden'
                onClick={() => handleClick('next')}
                disabled={page === totalPages}
            >
                <FiChevronRight className='text-xl md:text-2xl' />
            </button> */}

            <button
                className={clsx('pagination rounded-full  disabled:hidden')}
                onClick={() => handleClickStartAndEnd(Direction.End)}
                disabled={page === totalPages}
            >
                <FiChevronsRight className='text-xl md:text-2xl' />
            </button>
        </ul>
    )
}

export default Pagination
