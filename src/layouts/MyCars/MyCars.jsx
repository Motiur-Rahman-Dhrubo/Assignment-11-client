import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";

const MyCars = () => {

    const [myCar, setMyCar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState("");
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {

        axiosSecure.get(`/my_car?email=${user.email}`)
            .then(res => {
                setMyCar(res.data);
                setLoading(false);
            })
    }, [user.email]);

    if (loading) {
        return <Loading></Loading>;
    }

    const sortedCars = [...myCar].sort((a, b) => {
        if (sortOption === "price") {
            return a.daily_rental_price - b.daily_rental_price;
        }
        if (sortOption === "date") {
            return new Date(a.current_date) - new Date(b.current_date);
        }
        return 0;
    });

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure you want to delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://jo-car-server.vercel.app/car/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            setMyCar(prevCars => prevCars.filter(review => review._id !== _id));
                            Swal.fire({
                                title: "Successfully Deleted!",
                                text: "Your car has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

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
                            <summary className="btn btn-primary font-semibold text-white">Sort</summary>
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
                    <div className="overflow-x-auto mt-5 shadow-md bg-[url('/assets/bg.jpg')] bg-cover bg-center shadow-green-500 text-white p-6 rounded-lg">
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
                                                <Link to={`/update_car/${car._id}`} className="btn btn-primary btn-xs">Update</Link>
                                                <button onClick={() => handleDelete(car._id)} className="btn btn-error btn-xs">Delete</button>
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