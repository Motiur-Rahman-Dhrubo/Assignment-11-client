import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import { MdDeleteForever } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import MyBookingsChart from "../../Components/MyBookingsChart/MyBookingsChart";

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

    const chartData = myBookingCar.map(car => ({
        name: car.bookedCarModel,
        dailyPrice: parseFloat(car.bookingDailyPrice),
    }));

    const handleDate = (bookingId) => {
        const _id = bookingId;
        Swal.fire({
            title: "Select Start and End Dates",
            html: `
            <label for="start-date" class="block text-left">Start Date:</label>
            <input id="start-date" class="swal2-input" type="date" name="startDate" placeholder="Select start date">
            <label for="end-date" class="block text-left mt-3">End Date:</label>
            <input id="end-date" class="swal2-input" type="date" name="endDate" placeholder="Select end date">`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm",
            preConfirm: () => {
                const startDateInput = document.getElementById("start-date").value;
                const endDateInput = document.getElementById("end-date").value;

                if (!startDateInput || !endDateInput) {
                    Swal.showValidationMessage("Both start and end dates are required");
                    return false;
                }

                const start = new Date(startDateInput);
                const end = new Date(endDateInput);

                if (start > end) {
                    Swal.showValidationMessage("End date must be later than or equal to start date");
                    return false;
                }

                const totalDay = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

                const startDate = start.toLocaleDateString("en-GB");
                const endDate = end.toLocaleDateString("en-GB");

                return { startDate, endDate, totalDay };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { startDate, endDate, totalDay } = result.value;

                const updateDate = {
                    newDates: `${startDate} to ${endDate}`,
                    newTotalDay: totalDay,
                    newBookStatus: "Confirmed"
                };

                fetch(`http://localhost:5000/booking_car/${_id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updateDate)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Success!",
                                html: `
                                <p>Start Date: <strong>${startDate}</strong></p>
                                <p>End Date: <strong>${endDate}</strong></p>
                                <p>Total Days: <strong>${totalDay}</strong></p>`,
                                icon: "success"
                            }).then(() => {
                                axiosSecure.get(`/my_booking?email=${user.email}`)
                                    .then(res => {
                                        setMyBookingCar(res.data);
                                    });
                            });
                        }
                    })
                    .catch((err) => console.error("Error:", err));
            }
        });
    };



    const handleCancel = (bookingId) => {
        const _id = bookingId;
        Swal.fire({
            title: "Are you sure you want to cancel this booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {

                const updateDate = {
                    newBookStatus: "Canceled"
                };

                fetch(`http://localhost:5000/booking_car/${_id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updateDate)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your booking has been canceled.",
                                icon: "success"
                            }).then(() => {
                                axiosSecure.get(`/my_booking?email=${user.email}`)
                                    .then(res => {
                                        setMyBookingCar(res.data);
                                    });
                            });
                        }
                    })
                    .catch((err) => console.error("Error:", err));

            }
        });

    }




    return (
        <div className="w-11/12 mx-auto mt-10">
            {myBookingCar.length === 0 ? (
                <div className="text-center py-[100px]">
                    <p className="text-lg font-medium text-gray-700">You haven't added any booking yet.</p>
                    <Link to="/available-cars" className="btn btn-primary mt-4">
                        Available Cars
                    </Link>
                </div>
            ) : (
                <div className="min-h-[300px]">
                    <div className="overflow-x-auto mt-5 shadow-md shadow-blue-500 text-green-500 p-6 rounded-lg">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead className="text-green-600 text-sm font-bold bg-blue-300">
                                <tr>
                                    <th>Car Image</th>
                                    <th>Car Model</th>
                                    <th>Booking Date</th>
                                    <th>Total Day</th>
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
                                        <td>{car.totalDay}</td>
                                        <td>
                                            ${((parseFloat(car.bookingDailyPrice) + parseFloat(car.bookingDailyPrice) * 0.10) * car.totalDay).toFixed(2)}
                                        </td>
                                        <td>{car.newBookingStatus}</td>
                                        <td>
                                            <div className="flex gap-1 md:flex-row flex-col min-w-max">
                                                <button onClick={() => handleCancel(car._id)} className="btn btn-error btn-xs"><MdDeleteForever />Cancel</button>
                                                <button onClick={() => handleDate(car._id)} className="btn btn-info btn-xs"><FaCalendarAlt />Modify Date</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <div>
                <MyBookingsChart data={chartData}></MyBookingsChart>
            </div>
        </div>
    );
};

export default MyBookings;