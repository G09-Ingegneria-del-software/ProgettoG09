
const Loading = () => {
    return (
        <div className="absolute w-full h-full bg-white transition duration-100">
            <div className='flex items-center justify-center min-h-screen'>
                <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-transparent"></div>
                <p className="ml-2">Loading...</p>
            </div>
            <h1>Loading...</h1>
        </div>
    );
}

export default Loading;