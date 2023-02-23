import { BsSearch } from 'react-icons/bs'

function Search() {
    return (
        <div className='hidden min-w-[340px] md:min-w-[200px] sm:flex items-center text-gray-400 bg-base200 px-3 py-2 lg:py-1  rounded-2xl gap-4 focus-within:border focus-within:border-solid focus-within:border-blue-500'>
            <BsSearch className='cursor-pointer' />
            <input
                type='text'
                placeholder='Search'
                className='outline-none bg-base200 mr-3 flex-1'
            />
        </div>
    )
}

export default Search
