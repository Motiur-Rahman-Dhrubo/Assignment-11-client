import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError()
    return (
        <div>
            <div className="flex flex-col justify-center items-center min-h-screen py-5 md:gap-6 gap-3 bg-[url('/assets/error_bg.jpg')]">
                <h3 className="md:text-5xl text-3xl text-center text-white">Page not found!</h3>
                <img className="md:w-[300px] md:h-[300px] w-[200px] h-[200px]" src="/assets/error.png" alt="error img" />
                <p className='text-center text-xl text-red-500'>{error.statusText || error.message}</p>
                <Link to="/"><button className='bg-[#3E4746] text-white rounded-xl p-[10px_20px]'>Go back to Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;