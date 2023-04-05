function CircleShadow() {
    return (
        <>
            <div className='absolute top-0 -left-8  h-[180px] w-[180px] sm:h-[300px]  sm:w-[300px] rounded-full bg-blue-500 blur-2xl sm:blur-3xl -z-20'></div>
            <div className='absolute top-0 left-1/2 h-[180px] w-[180px] sm:h-[300px] sm:w-[300px] rounded-full bg-blue-500 blur-2xl sm:blur-3xl -z-20'></div>
        </>
    )
}

export default CircleShadow
