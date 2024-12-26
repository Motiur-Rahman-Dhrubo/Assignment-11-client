import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    userName: "John Doe",
        profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdSGVuStFxj_Dnv9V9qlzkor22IRPIglGkVA&s",
    rating: 5,
    reviewText: "Amazing service and great cars. Highly recommend!",
  },
  {
    userName: "Jane Smith",
      profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHC29IZMQODAp5vfURr0cpm2fXU-ZUIXsN7A&s",
    rating: 4,
    reviewText: "The booking process was smooth, and the car was in excellent condition.",
  },
  {
    userName: "Alice Johnson",
      profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQywNxfCrzzYTRxVIH0QmHtmfCRFw3FGH60_g&s",
    rating: 5,
    reviewText: "The team was super helpful, and the prices were unbeatable. Will use again!",
  },
  {
    userName: "Michael Brown",
      profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRazqB-2W1BOYi9eQv9kuJQJZDLko4JFg3LBA&s",
    rating: 4,
    reviewText: "Great experience overall, but the pick-up location was a bit far.",
  },
];

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const animationVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="w-11/12 mx-auto mt-8">
      <div className="relative w-full mx-auto p-5 bg-gray-100 rounded-lg shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animationVariants}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <img
              src={testimonials[currentIndex].profileImage}
              alt="user_photo"
              className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
            />
            <h3 className="text-lg font-bold mt-3">{testimonials[currentIndex].userName}</h3>
            <p className="text-yellow-500 text-sm mt-1">
              {"★".repeat(testimonials[currentIndex].rating) +
                "☆".repeat(5 - testimonials[currentIndex].rating)}
            </p>
            <p className="mt-3 text-gray-700">{testimonials[currentIndex].reviewText}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-5">
          <button onClick={handlePrev} className="btn btn-primary btn-sm">
            Previous
          </button>
          <button onClick={handleNext} className="btn btn-primary btn-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
