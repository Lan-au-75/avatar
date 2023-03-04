import { AiOutlineCamera, AiOutlineGift } from 'react-icons/ai'
import { MdInsertEmoticon } from 'react-icons/md'
import { BsStickies } from 'react-icons/bs'
import { Review } from '@/types/movies.type'
import { baseUrl } from '@/requests'
import moment from 'moment'

interface Props {
    reviews: Review[] | undefined
}

function Comments({ reviews }: Props) {
    const review = reviews?.find((review) => review)

    const date = moment(review?.created_at)
    const day = moment().diff(date, 'day')

    return (
        <div className='flex flex-col gap-4 md:gap-y-5 w-full sm:w-[80%] lg:w-[50%] mt-10'>
            <div className='text-xl md:text-2xl text-white'>Comments</div>
            <hr className='border-gray-500' />
            <div className='flex flex-col gap-4 h-[300px] overflow-y-auto scrollbar-hide'>
                {/* box 1 */}
                <div className='flex items-start gap-3'>
                    <img
                        src='/avatar-user.jpg'
                        alt=''
                        className='h-10 w-10 rounded-full flex-shrink-0'
                    />

                    <div className='flex flex-1 items-center justify-between rounded-lg p-3 bg-base200'>
                        <input
                            type='text'
                            placeholder='write a comment'
                            className='flex-1 text-gray-400 bg-base200 outline-none mr-6 md:mr-10'
                        />
                        <div className='text-base text-gray-400 md:text-lg flex  gap-1 md:gap-3 cursor-pointer'>
                            <MdInsertEmoticon />
                            <AiOutlineCamera />
                            <AiOutlineGift />
                            <BsStickies />
                        </div>
                    </div>
                </div>

                {/* box 2 */}
                {reviews?.map((review) => (
                    <div className='flex items-start gap-3'>
                        <img
                            src={`${baseUrl + review.author_details.avatar_path}`}
                            alt=''
                            className='h-10 w-10 rounded-full flex-shrink-0'
                        />
                        <div className='flex flex-col gap-1 flex-1'>
                            <div className='flex flex-col gap-y-1 md:gap-y-2 bg-base200 rounded-lg [-2] text-white p-2 md:p-3'>
                                <p className='text-base font-semibold'>
                                    {review.author_details.name}
                                </p>
                                <p className='text-sm line-clamp-2'>{review.content}</p>
                            </div>

                            <div className='flex px-3 gap-3 capitalize'>
                                <p className='text-sm hover:underline cursor-pointer'>like</p>
                                <p className='text-sm hover:underline cursor-pointer'>reply</p>
                                <p className='text-sm hover:underline cursor-pointer lowercase'>
                                    {day} ago
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Comments
