import { useLoaderData } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";

const AvailableCars = () => {

    const [loading, setLoading] = useState(true);
    const [layout, setLayout] = useState("grid");
    const availableCars = useLoaderData();

    useEffect(() => {
        if (availableCars) {
            setLoading(false);
        }
    }, [availableCars]);

    if (loading) {
        return <Loading></Loading>;
    }

    const toggleLayout = () => {
        setLayout((prevLayout) => (prevLayout === "grid" ? "list" : "grid"));
    };

    return (
        <div className="w-11/12 mx-auto mt-5">
            <div className="flex justify-between gap-2">
                <div className="flex gap-2 min-w-max">
                    <button onClick={toggleLayout} className="btn">{layout === "grid" ? "List View" : "Grid View"}</button>
                    <details className="dropdown">
                        <summary className="btn">Sort</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><button>Sort by Price</button></li>
                            <li><button>Sort by Added Date</button></li>
                        </ul>
                    </details>
                </div>

                <label className="input input-bordered flex items-center min-w-0 overflow-hidden">
                    <input type="text" placeholder="Search" />
                </label>
            </div>

            <div className={`mt-5 gap-4 ${layout === "grid" ? "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1" : "flex flex-col"}`}>

                {
                    availableCars.map(car => (
                        <div key={car._id} className="rounded-3xl w-full shadow-lg bg-[url('/assets/bg.jpg')] bg-cover bg-center shadow-red-400 text-white p-6">
                            <h2 className="text-xl"><span className="font-bold">Car Model:</span> {car.car_model}</h2>
                            <p className="mt-2"><span className="text-lg font-semibold">Daily Rental Price:</span> ${car.daily_rental_price}</p>
                            <p className="mt-2"><span className="text-lg font-semibold">Location:</span> {car.location}</p>
                            <p className="mt-2 text-lg font-semibold">Description: <span className="font-thin text-[14px] leading-3">{car.description}</span></p>
                            <div className="mt-2">
                                <p className="text-lg font-semibold">Features:</p>
                                <ul className="grow list-disc pl-10">
                                    {car.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                            <p className="mt-2 text-lg font-semibold">Images:</p>
                            {car.image_files.length > 0 ? (
                                <div className={`gap-2 mt-2 ${layout === "grid" ? "grid grid-cols-4" : "flex flex-wrap"}`}>
                                    {car.image_files.map((image, index) => (
                                        <img key={index} src={image} alt="car_img" className={`rounded-lg border object-cover aspect-[1/1] ${layout === "grid" ? "w-full" : "w-[60px]"}`} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-red-500">No images available</p>
                            )}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AvailableCars;