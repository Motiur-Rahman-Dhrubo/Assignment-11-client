import { useLoaderData } from "react-router-dom";
import Header from "../../Components/Header/header";
import WhyChooseUs from "../../Components/WhyChooseUs/WhyChooseUs";
import Animation from "../../Components/Animation/animation";
import Review from "../../Components/Review/Review";
import Offer from "../../Components/Offer/Offer";

const Home = () => {

    const topSix = useLoaderData();
    console.log(topSix)
    return (
        <div className="mt-5">
            <Header></Header>
            <WhyChooseUs></WhyChooseUs>

            <div className="mt-5 w-11/12 mx-auto">
                <h2 className="md:text-5xl text-4xl text-black italic text-center font-medium" style={{ textShadow: "2px 2px 4px rgba(255, 185, 22, 0.8)" }}>Recent Listings:</h2>
                <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                    {topSix.map((car) => (
                        <div className="border rounded-lg p-4 flex flex-col bg-[#D7DDE4] hover:shadow-lg hover:shadow-green-500" key={car._id}>
                            
                                {car.image_files.length > 0 ? (
                                    <img src={car.image_files[0]} alt="car_img" className="rounded-lg border object-cover aspect-[2/1] w-full" />
                                ) : (
                                    <p className="text-red-500 flex-grow">No images</p>
                                )}
                            
                            <p className="mt-2 font-bold">Model: {car.car_model}</p>
                            <p>Daily Price: ${car.daily_rental_price}</p>
                            <p>Availability: {car.availability}</p>
                            <p>Date Posted: {car.current_date}</p>
                        </div>
                    ))}
                </div>

            </div>

            <Animation></Animation>
            <Review></Review>
            <Offer></Offer>
            
        </div>
    );
};

export default Home;