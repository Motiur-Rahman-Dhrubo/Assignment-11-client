import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import { MdDeleteForever } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

const MyBookings = () => {

    const [myBookingCar, setMyBookingCar] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/my_booking?email=${user.email}`)
            .then(res => {
                setMyBookingCar(res.data);
                setLoading(false);
            })
    }, [user.email]);

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <div className="w-11/12 mx-auto mt-5">
            {myBookingCar.length === 0 ? (
                <div className="text-center py-[100px]">
                    <p className="text-lg font-medium text-gray-700">You haven't added any booking yet.</p>
                    <Link to="/available-cars" className="btn btn-primary mt-4">
                        Available Cars
                    </Link>
                </div>
            ) : (
                <div className="min-h-[300px]">
                    <div className="overflow-x-auto mt-5 shadow-lg bg-[url('/assets/bg.jpg')] bg-cover bg-center shadow-red-400 text-white p-6 rounded-3xl">
                        <table className="table">
                            {/* head */}
                            <thead className="text-white">
                                <tr>
                                    <th>Car Image</th>
                                    <th>Car Model</th>
                                    <th>Booking Date</th>
                                    <th>Total Price (10% vat added) </th>
                                    <th>Booking Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {/* body */}
                            <tbody>
                                    {myBookingCar.map((car) => (
                                    <tr className="hover hover:text-black" key={car._id}>
                                        <td>
                                            {car.bookedCarImg.length > 0 ? (
                                                <img src={car.bookedCarImg[0]} alt="car_img" className="rounded-lg border object-cover aspect-[1/1] w-[60px]" />
                                            ) : (
                                                <p className="text-red-500">No images</p>
                                            )}
                                        </td>
                                        <td>{car.bookedCarModel}</td>
                                        <td>{car.bookingDate}</td>
                                        <td>
                                            ${(parseFloat(car.bookingDailyPrice) + parseFloat(car.bookingDailyPrice) * 0.10).toFixed(2)}
                                        </td>
                                        <td>{car.newBookingStatus}</td>
                                        <td>
                                            <div className="flex gap-1 md:flex-row flex-col min-w-max">
                                                    <button onClick={() => handleCancel(car._id)} className="btn btn-error btn-xs"><MdDeleteForever />Cancel</button>
                                                    <button onClick={() => handleCancel(car._id)} className="btn btn-info btn-xs"><FaCalendarAlt />Modify Date</button>
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

export default MyBookings;