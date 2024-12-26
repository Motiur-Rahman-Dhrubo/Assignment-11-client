import { IoCarSport } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaBookBookmark } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";

const WhyChooseUs = () => {
    return (
        <div className="mt-5 w-11/12 mx-auto">
            <h2 className="md:text-5xl text-4xl text-black italic text-center font-medium" style={{ textShadow: "2px 2px 4px rgba(255, 185, 22, 0.8)" }}>Why Choose Us?</h2>
            <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                <div className="p-6 rounded-lg border bg-[url('/assets/bg.jpg')] bg-cover bg-center text-white flex flex-col gap-3 items-center">
                    <p><IoCarSport className="text-5xl"/></p>
                    <h2 className="text-xl font-semibold text-center">1. Wide Variety of Cars: </h2>
                    <p className="text-center">From budget-friendly options to luxury vehicles.</p>
                </div>

                <div className="p-6 rounded-lg border bg-[url('/assets/bg.jpg')] bg-cover bg-center text-white flex flex-col gap-3 items-center">
                    <p><RiMoneyDollarCircleFill className="text-5xl" /></p>
                    <h2 className="text-xl font-semibold text-center">2. Affordable Prices:  </h2>
                    <p className="text-center">Competitive daily rates you can count on.</p>
                </div>

                <div className="p-6 rounded-lg border bg-[url('/assets/bg.jpg')] bg-cover bg-center text-white flex flex-col gap-3 items-center">
                    <p><FaBookBookmark className="text-5xl" /></p>
                    <h2 className="text-xl font-semibold text-center">3. Easy Booking Process:  </h2>
                    <p className="text-center">Seamlessly book your ride in just a few clicks.</p>
                </div>

                <div className="p-6 rounded-lg border bg-[url('/assets/bg.jpg')] bg-cover bg-center text-white flex flex-col gap-3 items-center">
                    <p><RiCustomerService2Line className="text-5xl" /></p>
                    <h2 className="text-xl font-semibold text-center">4. Customer Support:  </h2>
                    <p className="text-center">24/7 assistance for all your queries.</p>
                </div>
            </div>
            
        </div>
    );
};

export default WhyChooseUs;