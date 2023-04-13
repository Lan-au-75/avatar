import { CommentData } from '@/types/message.type'
import { memo, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import CommentList from './CommentList'
import CommentsForm from './CommentsForm'

function Comments() {
    const { detailID }: { detailID?: string } = useParams()
    const [commentList, setCommentList] = useState<CommentData[]>([])
    const [room, __] = useState<string | undefined>(detailID)

    const rootComments = commentList.filter((comment) => comment.parentId === null)

    const socket = useMemo(() => {
        return io(import.meta.env.VITE_SERVER_URL)
    }, [])

    useEffect(() => {
        if (room) {
            socket.emit('join-room-comment', room)
        }

        socket.on('receive-comment', (data) => {
            setCommentList((prev) => [data, ...prev])
        })

        socket.on('newReply', (reply) => {
            setCommentList((prev) => {
                const newComment = [...prev, reply]

                return newComment
            })
        })

        return () => {
            socket.emit('leave-room-comment', room)
            socket.off('receive-comment')
        }
    }, [socket])

    return (
        <div className='flex flex-col gap-4 md:gap-y-5 w-full sm:w-[80%] lg:w-[50%] mt-10'>
            <div className='text-xl md:text-2xl text-white'>Comments</div>
            <hr className='border-gray-500' />
            <div className='flex flex-col gap-4 h-[600px] overflow-y-auto scrollBarCustom'>
                <CommentsForm socket={socket} room={room} />
                <CommentList
                    data={rootComments}
                    socket={socket}
                    room={room}
                    commentList={commentList}
                    setCommentList={setCommentList}
                />
            </div>
        </div>
    )
}

export default memo(Comments)
