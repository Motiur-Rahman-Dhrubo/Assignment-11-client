import { Link, useLoaderData } from "react-router-dom";
import Header from "../../Components/Header/Header";
import WhyChooseUs from "../../Components/WhyChooseUs/WhyChooseUs";
import Animation from "../../Components/Animation/animation";
import Review from "../../Components/Review/Review";
import Offer from "../../Components/Offer/Offer";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";

const Home = () => {

    const [loading, setLoading] = useState(true);
    const topSix = useLoaderData();

    useEffect(() => {
        if (topSix) {
            setLoading(false);
        }
    }, [topSix]);

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <>
            <Header></Header>
            <WhyChooseUs></WhyChooseUs>

            <div className="mt-5 w-11/12 mx-auto">
                <h2 className="md:text-5xl text-4xl text-black italic text-center font-medium" style={{ textShadow: "2px 2px 4px blue" }}>Best Collection:</h2>
                <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                    {topSix.map((car) => (
                        <div className="border rounded-lg p-4 flex flex-col bg-[#D7DDE4] hover:shadow-lg hover:shadow-blue-500" key={car._id}>
                            
                                {car.image_files.length > 0 ? (
                                    <img src={car.image_files[0]} alt="car_img" className="rounded-lg border object-cover aspect-[2/1] w-full" />
                                ) : (
                                    <p className="text-red-500 rounded-lg border  aspect-[2/1] w-full">No images</p>
                                )}
                            
                            <p className="mt-2 font-bold">Model: {car.car_model}</p>
                            <p className="flex-1"><strong>Description:</strong> {car.description.split(" ").slice(0, 7).join(" ")}...</p>
                            <p><strong>Daily Price:</strong> ${car.daily_rental_price}</p>
                            <p><strong>Availability:</strong> {car.availability}</p>
                            <Link to={`/car/${car._id}`} className="btn mt-3 btn-sm w-full btn-primary">Car Details</Link>
                        </div>
                    ))}
                </div>

            </div>

            <Animation></Animation>
            <Review></Review>
            <Offer></Offer>
            
        </>
    );
};

export default Home;