import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-[url('/assets/cars.jpg')] bg-cover bg-center w-full aspect-[5/1] flex justify-center items-center min-h-64">
            <div className="flex flex-col gap-5 items-center w-11/12 mx-auto">
                <h2 className="md:text-5xl text-4xl text-white italic text-center font-medium" style={{ textShadow: "2px 2px 4px rgba(255, 185, 22, 0.8)" }}>Your Next Car Awaits You.</h2>
                <Link to={'/available-cars'} className="btn btn-circle md:w-56 w-44 shadow-md hover:shadow-blue-500 hover:text-blue-600 shadow-yellow-400">View Available Cars</Link>
            </div>
        </div>
    );
};

export default Header;