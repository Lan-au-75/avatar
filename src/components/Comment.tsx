import { userAth } from '@/context/AuthContext'
import { handleImgError } from '@/hooks/handleImgError'
import { CommentData } from '@/types/message.type'
import clsx from 'clsx'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiOutlineLike } from 'react-icons/ai'
import { MdReport } from 'react-icons/md'
import { Socket } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'timeago.js'
import { TDate } from 'timeago.js/lib/interface'
import CommentsForm from './CommentsForm'

interface Props {
    className?: string
    item: CommentData
    socket: Socket
    room: string | undefined
    relies: CommentData[]
    depth: number
    getRelies: (commentId: string) => CommentData[]
    setId: React.Dispatch<React.SetStateAction<string>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    setUpdateComment: React.Dispatch<React.SetStateAction<string>>
}

function Comment({
    className,
    item,
    socket,
    room,
    relies,
    depth,
    getRelies,
    setEdit,
    setUpdateComment,
    setId,
}: Props) {
    const [show, setShow] = useState<boolean>(false)
    const [like, setLike] = useState<boolean>(false)
    const [count, setCount] = useState<number>(0)
    const [reply, setReply] = useState<boolean>(false)

    const { user } = userAth()
    const menuRef = useRef<HTMLDivElement>(null)
    const iconRef = useRef<HTMLInputElement>(null)

    // check depth
    const getPaddingLeft = (depth: number) => {
        switch (depth) {
            case 0:
                return 'pl-10'
            case 1:
                return 'pl-20'
            case 2:
                return 'pl-32'

            default:
                return ''
        }
    }

    const paddingLeft = getPaddingLeft(depth)

    const handleReply = () => {
        setReply(!reply)
    }

    const handleLike = () => {
        setLike(!like)

        socket.emit('like-comment', { comment: item, like: !like })
    }

    const handleShow = () => {
        setShow(!show)
    }

    const handleDelete = (item: CommentData) => {
        socket.emit('delete-comment', item)
    }

    const handleEdit = (item: CommentData) => {
        setEdit(true)
        setUpdateComment(item.message)
        setId(item._id)
    }

    const handleCancel = () => {
        setReply(false)
    }

    // handle menu when outside
    const handleOutsideClick = (e: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(e.target as Node) &&
            !iconRef.current?.contains(e.target as Node)
        ) {
            setShow(false)
        }
    }

    useEffect(() => {
        socket.on('update-like-comment', async ({ comment }) => {
            // check comment current
            if (item._id === comment._id) {
                await setCount(comment.like)
            }
        })

        return () => {
            socket.off('update-like-comment')
        }
    }, [socket, like, user, count, like])

    useEffect(() => {
        document.addEventListener('mousedown', (e) => handleOutsideClick(e))
        return () => {
            document.removeEventListener('mousedown', (e) => handleOutsideClick(e))
        }
    }, [])

    return (
        <>
            <li className={clsx('flex items-start gap-3 pb-3', className)}>
                <img
                    src={item.avatar}
                    alt={item.name}
                    className='h-10 w-10 rounded-full flex-shrink-0'
                    onError={(e) => handleImgError(e, '/no-img-avatar.png')}
                />

                <div className='flex flex-col gap-2 flex-1'>
                    <div className='w-full flex flex-col gap-y-1 md:gap-y-2 bg-gray-400 dark:bg-base200 rounded-lg  text-black dark:text-white p-2 md:p-3'>
                        <span className='text-lg lg:text-base font-semibold'>{item.name}</span>
                        <span className='text-base lg:text-sm line-clamp-2'>{item.message}</span>
                    </div>

                    <div className='flex items-center justify-between'>
                        {/* left */}

                        <div className='flex px-3 gap-3 capitalize'>
                            <p className='text-sm hover:underline cursor-pointer lowercase'>
                                {format(item.createdAt as TDate)}
                            </p>
                            <p
                                className={clsx(
                                    'text-sm hover:underline cursor-pointer',
                                    like && 'text-blue-500'
                                )}
                                onClick={handleLike}
                            >
                                like
                            </p>
                            <p className='text-sm hover:underline cursor-pointer' onClick={handleReply}>
                                reply
                            </p>

                            <div className='relative'>
                                <span
                                    ref={iconRef}
                                    className='text-2xl leading-5 hover:text-gray-700  cursor-pointer'
                                    onClick={handleShow}
                                >
                                    ...
                                </span>

                                {show && (
                                    // menu
                                    <div
                                        ref={menuRef}
                                        className='py-3 md:py-4 animate-menuBox absolute top-10 -left-20 md:left-0 min-h-[50px] min-w-[200px] bg-gray-500 dark:bg-gray-700
                                                       origin-center md:origin-top-left rounded-lg text-black dark:text-white transition-all duration-200 ease-in-out shadow-lg z-10'
                                    >
                                        <ul className='flex flex-col gap-y-2 md:gap-y-3 max-h-[500px] overflow-y-auto  lg:overflow-y-hidden scrollBarCustom hover:overflow-y-auto'>
                                            {item.userId === user?.uid ? (
                                                <>
                                                    <button
                                                        className='menu-box__link'
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        <div className='flex items-center gap-2 md:gap-3'>
                                                            <span className='text-xl md:text-lg'>
                                                                <AiFillEdit />
                                                            </span>

                                                            <span className='capitalize text-lg lg:text-base'>
                                                                Edit Comment
                                                            </span>
                                                        </div>
                                                    </button>
                                                    <button
                                                        className='menu-box__link'
                                                        onClick={() => handleDelete(item)}
                                                    >
                                                        <div className='flex items-center gap-2 md:gap-3'>
                                                            <span className='text-xl md:text-lg'>
                                                                <AiFillDelete />
                                                            </span>

                                                            <span className='capitalize text-lg lg:text-base'>
                                                                Delete Comment
                                                            </span>
                                                        </div>
                                                    </button>
                                                </>
                                            ) : (
                                                <button className='menu-box__link'>
                                                    <div className='flex items-center gap-2 md:gap-3'>
                                                        <span className='text-xl md:text-lg'>
                                                            <MdReport />
                                                        </span>

                                                        <span className='capitalize text-lg lg:text-base'>
                                                            Report
                                                        </span>
                                                    </div>
                                                </button>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* right */}

                        <div className='flex items-center gap-2'>
                            {
                                <>
                                    <span>{count > 0 && count}</span>
                                    <div className='p-1 bg-blue-700 rounded-full text-white cursor-pointer'>
                                        <AiOutlineLike className='text-base md:text-lg' />
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </li>

            {/* render reply */}

            {relies.length > 0 && (
                <ul className='flex flex-col gap-y-3'>
                    <>
                        {relies.map((reply) => (
                            <Comment
                                className={paddingLeft}
                                key={uuidv4()}
                                item={reply}
                                socket={socket}
                                room={room}
                                relies={getRelies(reply._id)}
                                getRelies={getRelies}
                                setId={setId}
                                setEdit={setEdit}
                                setUpdateComment={setUpdateComment}
                                depth={depth + 1}
                            />
                        ))}
                    </>
                </ul>
            )}

            {reply && (
                <CommentsForm
                    socket={socket}
                    reply={reply}
                    room={room}
                    id={item._id}
                    onCancel={handleCancel}
                />
            )}
        </>
    )
}

export default Comment
