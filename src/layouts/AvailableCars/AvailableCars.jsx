import { Link, useLoaderData } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";

const AvailableCars = () => {

    const [loading, setLoading] = useState(true);
    const [layout, setLayout] = useState("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("");
    const availableCars = useLoaderData();

    useEffect(() => {
        if (availableCars) {
            setLoading(false);
        }
    }, [availableCars]);

    if (loading) {
        return <Loading></Loading>;
    }

    // layout toggle
    const toggleLayout = () => {
        setLayout((prevLayout) => (prevLayout === "grid" ? "list" : "grid"));
    };

    // searching
    const filteredCars = availableCars.filter((car) =>
        [car.car_model, car.car_brand, car.location]
            .some((field) => field?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // sorting
    const sortedCars = [...filteredCars].sort((a, b) => {
        if (sortOption === "price") {
            return a.daily_rental_price - b.daily_rental_price;
        }
        if (sortOption === "date") {
            return new Date(a.current_date) - new Date(b.current_date);
        }
        return 0;
    });

    return (
        <div className="w-11/12 mx-auto mt-5">
            <div className="flex justify-between gap-2">
                <div className="flex gap-2 min-w-max">
                    <button onClick={toggleLayout} className="btn">{layout === "grid" ? "List View" : "Grid View"}</button>
                    <details className="dropdown">
                        <summary className="btn">Sort</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li>
                                <button onClick={() => setSortOption("price")}>Sort by Price</button>
                            </li>
                            <li>
                                <button onClick={() => setSortOption("date")}>Sort by Added Date</button>
                            </li>
                        </ul>
                    </details>
                </div>

                <label className="input input-bordered flex items-center min-w-0 overflow-hidden">
                    <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </label>
            </div>

            <div className={`mt-5 gap-4 ${layout === "grid" ? "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1" : "flex flex-col"}`}>

                {
                    sortedCars.map(car => (
                        <div key={car._id} className="rounded-3xl w-full shadow-md bg-[url('/assets/bg.jpg')] bg-cover bg-center shadow-red-400 text-white p-6 flex flex-col">
                            <h2 className="text-xl"><span className="font-bold">Car Model:</span> {car.car_model}</h2>
                            <p className="mt-1"><span className="text-lg font-semibold">Car Brand:</span> {car.car_brand}</p>
                            <p className="mt-1"><span className="text-lg font-semibold">Daily Rental Price:</span> ${car.daily_rental_price}</p>
                            <p className="mt-1"><span className="text-lg font-semibold">Location:</span> {car.location}</p>
                            <p className="mt-1"><span className="text-lg font-semibold">Added Date:</span> {car.current_date}</p>
                            <p className="mt-1 text-lg font-semibold">Images:</p>
                            <div className="mt-2 flex-grow">
                                {car.image_files.length > 0 ? (
                                    <div className="gap-2 flex flex-wrap">
                                        {car.image_files.map((image, index) => (
                                            <img key={index} src={image} alt="car_img" className="rounded-lg border object-cover aspect-[1/1] w-[60px]" />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-red-500">No images available</p>
                                )}
                            </div>
                            <Link to={`/car/${car._id}`} className="btn mt-3 btn-sm">Car Details</Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AvailableCars;