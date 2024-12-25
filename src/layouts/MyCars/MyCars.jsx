import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
// import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyCars = () => {

    const [myCar, setMyCar] = useState([]);
    const [sortOption, setSortOption] = useState("");
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // fetch(`http://localhost:5000/my_car?email=${user.email}`)
        //     .then(res => res.json())
        //     .then(data => setMyCar(data))

        // axios.get(`http://localhost:5000/my_car?email=${user.email}`, {
        //     withCredentials: true
        // })
        // .then(res => setMyCar(res.data))

        axiosSecure.get(`/my_car?email=${user.email}`)
        .then(res => setMyCar(res.data));


    }, [user.email])

    const sortedCars = [...myCar].sort((a, b) => {
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
            {myCar.length === 0 ? (
                <div className="text-center py-[100px]">
                    <p className="text-lg font-medium text-gray-700">You haven't added any cars yet.</p>
                    <Link to="/add-car" className="btn btn-primary mt-4">
                        Add Car
                    </Link>
                </div>
            ) : (
                <div className="min-h-[300px]">
                    <div>
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
                        <div className="overflow-x-auto mt-5 shadow-lg bg-[url('/assets/bg.jpg')] bg-cover bg-center shadow-red-400 text-white p-6 rounded-3xl">
                            <table className="table">
                            {/* head */}
                                <thead className="text-white">
                                <tr>
                                    <th>Car Image</th>
                                    <th>Car Model</th>
                                    <th>Daily Rental Price</th>
                                    <th>Availability</th>
                                    <th>Date of Added</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {/* body */}
                            <tbody>
                                {sortedCars.map((car) => (
                                    <tr className="hover hover:text-black" key={car._id}>
                                        <td>
                                            {car.image_files.length > 0 ? (
                                                <img src={car.image_files[0]} alt="car_img" className="rounded-lg border object-cover aspect-[1/1] w-[60px]" />
                                            ) : (
                                                <p className="text-red-500">No images</p>
                                            )}
                                        </td>
                                        <td>{car.car_model}</td>
                                        <td>${car.daily_rental_price}</td>
                                        <td>{car.availability}</td>
                                        <td>{car.current_date}</td>
                                        <td>
                                            <div className="flex gap-1">
                                                <button className="btn btn-primary btn-xs">Update</button>
                                                <button className="btn btn-error btn-xs">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCars;