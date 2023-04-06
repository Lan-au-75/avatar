import moment from 'moment'
import { AiOutlineCamera, AiOutlineGift } from 'react-icons/ai'
import { MdInsertEmoticon } from 'react-icons/md'
import { BsStickies } from 'react-icons/bs'
import { io } from 'socket.io-client'
import { baseUrl } from '@/requests'
import { Review } from '@/types/movies.type'
import { handleImgError } from '@/hooks/handleImgError'
import { userAth } from '@/context/AuthContext'

interface Props {
    reviews: Review[] | undefined
}

function Comments({ reviews }: Props) {
    const { user, fullName } = userAth()
    const review = reviews?.find((review) => review)
    const socket = io('http://localhost:8080')

    socket.on('connect', () => {
        console.log(socket.id) // x8WIv7-mJelg7on_ALbx
    })

    const date = new Date()

    const time = date.getDate()

    return (
        <div className='flex flex-col gap-4 md:gap-y-5 w-full sm:w-[80%] lg:w-[50%] mt-10'>
            <div className='text-xl md:text-2xl text-white'>Comments</div>
            <hr className='border-gray-500' />
            <div className='flex flex-col gap-4 h-[300px] overflow-y-auto scrollbar-hide'>
                {/* box 1 */}
                <div className='flex items-start gap-3'>
                    <img
                        src={(user?.photoURL as string) || '/user-account.jpg'}
                        alt={user?.displayName as string}
                        className='h-10 w-10 rounded-full flex-shrink-0'
                        onError={(e) => handleImgError(e, '/no-img-avatar.png')}
                    />

                    <div className='w-[288px] mini:w-full flex flex-1 items-center justify-between rounded-lg p-3 bg-slate-400 dark:bg-base200'>
                        <input
                            type='text'
                            placeholder='write a comment'
                            className='flex-1  placeholder:text-gray-500 dark:placeholder:text-gray-400  bg-slate-400 dark:bg-base200 outline-none mr-6 md:mr-10'
                        />
                        <div className='text-base text-black dark:text-gray-400 md:text-lg flex  gap-1 md:gap-3 cursor-pointer'>
                            <MdInsertEmoticon />
                            <AiOutlineCamera />
                            <AiOutlineGift />
                            <BsStickies />
                        </div>
                    </div>
                </div>

                {/* handle chat */}

                <div className='flex items-start gap-3'>
                    <img
                        src={(user?.photoURL as string) || '/user-account.jpg'}
                        alt={user?.displayName as string}
                        className='h-10 w-10 rounded-full flex-shrink-0'
                        onError={(e) => handleImgError(e, '/no-img-avatar.png')}
                    />
                    <div className='flex flex-col gap-1 flex-1'>
                        <div className='w-[288px] mini:w-full flex flex-col gap-y-1 md:gap-y-2 bg-gray-400 dark:bg-base200 rounded-lg  text-black dark:text-white p-2 md:p-3'>
                            <span className='text-base font-semibold'>{user?.displayName || fullName}</span>
                            <span className='text-sm line-clamp-2'>chat ne</span>
                        </div>

                        <div className='flex px-3 gap-3 capitalize'>
                            <p className='text-sm hover:underline cursor-pointer'>like</p>
                            <p className='text-sm hover:underline cursor-pointer'>reply</p>
                            <p className='text-sm hover:underline cursor-pointer lowercase'>
                                {time} days ago
                            </p>
                        </div>
                    </div>
                </div>

                {/* box 2 */}
                {/* {reviews?.map((review) => (
                    <div key={review.id} className='flex items-start gap-3'>
                        <img
                            src={`${baseUrl + review.author_details.avatar_path}`}
                            alt=''
                            className='h-10 w-10 rounded-full flex-shrink-0'
                            onError={(e) => handleImgError(e, '/no-img-avatar.png')}
                        />
                        <div className='flex flex-col gap-1 flex-1'>
                            <div className='w-[288px] mini:w-full flex flex-col gap-y-1 md:gap-y-2 bg-gray-400 dark:bg-base200 rounded-lg  text-black dark:text-white p-2 md:p-3'>
                                <span className='text-base font-semibold'>
                                    {review.author_details.name || review.author}
                                </span>
                                <span className='text-sm line-clamp-2'>{review.content}</span>
                            </div>

                            <div className='flex px-3 gap-3 capitalize'>
                                <p className='text-sm hover:underline cursor-pointer'>like</p>
                                <p className='text-sm hover:underline cursor-pointer'>reply</p>
                                <p className='text-sm hover:underline cursor-pointer lowercase'>
                                    {day} days ago
                                </p>
                            </div>
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    )
}

export default Comments
