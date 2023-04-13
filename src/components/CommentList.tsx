import { CommentData } from '@/types/message.type'
import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import Comment from './Comment'
import CommentsForm from './CommentsForm'
import clsx from 'clsx'

interface Props {
    data: CommentData[]
    socket: Socket
    room: string | undefined
    commentList: CommentData[]
    setCommentList: React.Dispatch<React.SetStateAction<CommentData[]>>
}

function CommentList({ data, socket, room, commentList, setCommentList }: Props) {
    const [id, setId] = useState<string>('')
    const [edit, setEdit] = useState(false)
    const [updateComment, setUpdateComment] = useState<string>('')

    // get rely
    const getRelies = (commentId: string) => {
        return commentList.filter((comment) => comment.parentId === commentId)
    }

    const handleCancel = () => {
        setEdit(false)
    }

    useEffect(() => {
        // edit
        socket.on('replace-comment', (data) => {
            setCommentList((prev) => {
                const index = prev.findIndex((item) => item._id === data._id)

                prev[index] = data

                return [...prev] //update state component
            })
            setEdit(false)
        })

        // delete

        socket.on('response-comment', (data) => {
            setCommentList((prev) => prev.filter((item) => item._id !== data._id))
            setEdit(false)
        })

        return () => {
            socket.off('replace-comment')
            socket.off('response-comment')
        }
    }, [socket])

    return (
        <>
            {edit && (
                <CommentsForm
                    socket={socket}
                    room={room}
                    id={id}
                    edit={edit}
                    updateComment={updateComment}
                    onCancel={handleCancel}
                    setUpdateComment={setUpdateComment}
                />
            )}
            <ul className='flex flex-col gap-y-3'>
                {data.map((item) => (
                    <div key={uuidv4()} className={clsx('relative', 'tree-line')}>
                        <Comment
                            item={item}
                            socket={socket}
                            room={room}
                            relies={getRelies(item._id)}
                            depth={0}
                            getRelies={getRelies}
                            setId={setId}
                            setEdit={setEdit}
                            setUpdateComment={setUpdateComment}
                        />
                    </div>
                ))}
            </ul>
        </>
    )
}

export default CommentList
