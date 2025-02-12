import { motion } from "framer-motion";

const offers = [
    {
        title: "Get 15% off for weekend rentals!",
        description: "Book your car now and enjoy an exclusive 15% discount on all weekend bookings.",
        buttonText: "Learn More",
        bgColor: "bg-blue-500",
    },
    {
        title: "Luxury cars at $99/day this holiday season!",
        description: "Drive luxury cars at a special rate this holiday season. Offer valid until December 31st.",
        buttonText: "Book Now",
        bgColor: "bg-green-500",
    },
    {
        title: "Early Bird Discount!",
        description: "Reserve your car 2 weeks in advance and get an extra 10% discount.",
        buttonText: "Learn More",
        bgColor: "bg-red-500",
    },
];

const Offer = () => {
    return (
        <div className="w-11/12 mx-auto mt-5">
            <h2 className="md:text-5xl text-4xl text-black italic text-center font-medium" style={{ textShadow: "2px 2px 4px rgba(255, 185, 22, 0.8)" }}>Special Offers:</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-10">
                {offers.map((offer, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 120, damping: 10 }}
                        className={`${offer.bgColor} flex flex-col p-6 rounded-lg text-white shadow-lg`}
                    >
                        <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                        <p className="text-sm mb-4 flex-grow">{offer.description}</p>
                        <button className="btn btn-sm">
                            {offer.buttonText}
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Offer;
