import Lottie from "lottie-react";
import lottieCar from "../../assets/lottie/car.json";

const animation = () => {
    return (
        <div className="mt-8 w-11/12 mx-auto border border-red-500 p-4 rounded-lg">
            <h2 className="md:text-5xl text-4xl text-black italic text-center font-medium" style={{ textShadow: "2px 2px 4px rgba(255, 185, 22, 0.8)" }}>Alert!!</h2>
            <div className="mt-5 flex md:flex-row flex-col items-center gap-5">
                <Lottie animationData={lottieCar} className="w-1/2"></Lottie>
                <div className="w-1/2">
                    <h2 className="text-3xl font-semibold text-red-500">Be careful!</h2>
                    <p className="mt-2 text-xl">Always use registered car to avoid legal issues!</p>
                </div>
            </div>
        </div>
    );
};

export default animation;