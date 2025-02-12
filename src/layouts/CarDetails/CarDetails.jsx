import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";


const CarDetails = () => {

    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const carDetails = useLoaderData();
    const { car_model, daily_rental_price, availability, features, description, booking_count, location, booking_status, image_files } = carDetails;

    useEffect(() => {
        if (carDetails) {
            setLoading(false);
        }
    }, [carDetails]);

    if (loading) {
        return <Loading></Loading>;
    }

    const bookNow = () => {
        const bookedCarImg = image_files;
        const bookedCarModel = car_model;
        const now = new Date();
        const bookingDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const totalDay = 1;
        const bookingDailyPrice = daily_rental_price;
        const newBookingStatus = "Pending";
        const bookingEmail = user.email;
        const newBookingCar = { bookedCarImg, bookedCarModel, bookingDate, bookingDailyPrice, newBookingStatus, bookingEmail, totalDay };

        if (!user) {
            toast.warning("Please log in to proceed with booking.", {
                position: "top-center",
                autoClose: 2000,
            });
            return;
        }

        Swal.fire({
            title: `Confirm Booking for ${car_model}?`,
            text: `The daily rental price is $${daily_rental_price}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Book Now",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('https://jo-car-server.vercel.app/booking_car', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newBookingCar),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.insertedId) {
                            Swal.fire({
                                title: "Booking Confirmed!",
                                text: `You have successfully booked the ${car_model}.`,
                                icon: "success",
                            });
                        }
                    })
            }
        });
    };

    return (
        <div className="w-11/12 max-w-[700px] mx-auto shadow-md bg-[url('/assets/bg.jpg')] bg-cover bg-center shadow-green-500 text-white p-6 rounded-lg mt-5">
            <ToastContainer />
            <p className="md:text-2xl text-xl"><span className="font-bold">Car Model:</span> {car_model}</p>
            <div className="flex gap-1 md:gap-5 flex-col md:flex-row mt-1">
                <p className="md:w-1/2 w-full"><span className="font-bold">Price Per Day:</span> ${daily_rental_price}</p>
                <p className="md:w-1/2 w-full"><span className="font-bold">Availability:</span> {availability}</p>
            </div>
            <p className="mt-1 font-bold">Features: </p>
            <ul className="grow list-disc pl-10">
                {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <p className="font-bold mt-1">Images: </p>
            {image_files.length > 0 ? (
                <div className="gap-2 flex flex-wrap mt-2">
                    {image_files.map((image, index) => (
                        <img key={index} src={image} alt="car_img" className="rounded-lg border object-cover aspect-[1/1] w-[60px]" />
                    ))}
                </div>
            ) : (
                <p className="text-red-500 mt-1">No images available</p>
            )}
            <p className="mt-1 font-bold">Description: </p>
            <p>{description}</p>
            <p className="font-bold mt-1">Reviews: <span className="text-red-500 font-normal">No reviews have been added by customers yet.</span></p>
            <button onClick={bookNow} className="btn w-full mt-3">Book Now</button>
        </div>
    );
};

export default CarDetails;