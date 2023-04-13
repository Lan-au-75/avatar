import EmojiPicker, { Theme, EmojiClickData } from 'emoji-picker-react'
import { userAth } from '@/context/AuthContext'
import { handleImgError } from '@/hooks/handleImgError'
import { CreateCommentData } from '@/types/message.type'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineCamera, AiOutlineGift } from 'react-icons/ai'
import { BsStickies } from 'react-icons/bs'
import { MdInsertEmoticon } from 'react-icons/md'
import { Socket } from 'socket.io-client'
import { useTheme } from '@/context/ThemeContext'

interface Props {
    socket: Socket
    id?: string
    room?: string | undefined
    edit?: boolean
    reply?: boolean
    updateComment?: string
    onCancel?: () => void
    setUpdateComment?: React.Dispatch<React.SetStateAction<string>>
}

function CommentsForm({ socket, id, room, reply, edit, updateComment, onCancel, setUpdateComment }: Props) {
    const { user, fullName } = userAth()
    const { theme } = useTheme()
    const [comment, setComment] = useState<string>('')
    const [showPicker, setShowPicker] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const commentData: CreateCommentData = {
            parentId: null,
            userId: user?.uid,
            name: user?.displayName || fullName,
            avatar: user?.photoURL || '/user-account.jpg',
            message: comment.trim(),
            like: 0,
            room,
        }

        if (!edit && !reply) {
            // create comment
            setComment('')

            const createData = { ...commentData }

            if (!comment.trim()) return

            if (socket.connected) {
                await socket.emit('send-comment', createData)
            } else {
                console.log('server disconnect')
            }
        }
        // update comment
        else if (updateComment) {
            const updateData = { ...commentData, _id: id, message: updateComment.trim() }

            if (!updateComment.trim()) return

            if (socket.connected) {
                await socket.emit('update-comment', updateData)
            } else {
                console.log('server disconnect')
            }
        }

        if (reply) {
            const reply = { ...commentData, parentId: id }

            if (!comment.trim()) return

            if (socket.connected) {
                await socket.emit('createReply', reply)
            } else {
                console.log('server disconnect')
            }
        }
    }

    const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
        setComment((prevInput) => prevInput + emojiData.emoji)
        inputRef.current?.focus()
    }

    useEffect(() => {
        const timerId = setTimeout(() => {
            inputRef && inputRef.current?.focus()
        }, 100)

        return () => clearTimeout(timerId)
    }, [updateComment])

    return (
        <div className='relative'>
            <form className={clsx('flex items-start gap-3', reply && 'pl-10')} onSubmit={handleSubmit}>
                <img
                    src={(user?.photoURL as string) || '/user-account.jpg'}
                    alt={user?.displayName as string}
                    className='h-10 w-10 rounded-full flex-shrink-0'
                    onError={(e) => handleImgError(e, '/no-img-avatar.png')}
                />

                <ul className='flex flex-col gap-2 flex-1'>
                    <li className='w-[288px] mini:w-full flex flex-col gap-y-6 flex-1 rounded-lg p-4 md:p-3 bg-slate-400 dark:bg-base200'>
                        <input
                            ref={inputRef}
                            value={updateComment ? updateComment : comment}
                            type='text'
                            placeholder='write a comment'
                            spellCheck='false'
                            className='flex-1 dark:text-white  placeholder:text-gray-500 dark:placeholder:text-gray-400  bg-slate-400 dark:bg-base200 outline-none mr-3 md:mr-6'
                            onChange={(e) => {
                                if (!edit) {
                                    setComment(e.target.value)
                                } else {
                                    setUpdateComment && setUpdateComment(e.target.value)
                                }
                            }}
                        />

                        <div className='text-lg text-black dark:text-gray-400 md:text-lg flex gap-3 cursor-pointer'>
                            <MdInsertEmoticon onClick={() => setShowPicker(!showPicker)} />
                            <AiOutlineCamera />
                            <AiOutlineGift />
                            <BsStickies />
                        </div>
                    </li>

                    <li className='flex items-center justify-between'>
                        {/* left */}

                        {(edit || reply) && (
                            <div className='flex px-3 gap-3 capitalize' onClick={onCancel}>
                                <p className={clsx('text-sm hover:underline cursor-pointer')}>cancel</p>
                            </div>
                        )}
                    </li>
                </ul>
            </form>
            {showPicker && (
                <div className='absolute top-20 right-0 md:w-[400px] transition-all duration-200 ease-linear origin-top-right z-50'>
                    <EmojiPicker onEmojiClick={onEmojiClick} width='100%' theme={theme as Theme} />
                </div>
            )}
        </div>
    )
}

export default CommentsForm
