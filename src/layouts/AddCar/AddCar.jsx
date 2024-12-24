import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const AddCar = () => {

    const { user } = useContext(AuthContext);

    const handleAddReview = (e) => {
        e.preventDefault();
        const data = e.target;
        const car_model = data.model.value;
        const daily_rental_price = data.price.value;
        const availability = data.availability.value;
        const vehicle_registration_number = data.reg_number.value;
        const features = Array.from(data.features)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        // const features = Array.from(data.features).reduce((feature, checkbox) => {
        //     feature[checkbox.value] = checkbox.checked;
        //     return feature;
        // }, {});
        const description = data.description.value;
        const booking_count = data.booking_count.value;
        const location = data.location.value;
        const user_name = user.displayName;
        const user_email = user.email;
        const newCar = { car_model, daily_rental_price, availability, vehicle_registration_number, features, description, booking_count, location, user_name, user_email }

        console.log(newCar)
    }

    return (
        <div className="min-h-screen flex justify-center items-center mt-5 w-11/12 mx-auto">
            {/* <ToastContainer /> */}
            <div className="card rounded-tr-none rounded-bl-none rounded-tl-3xl rounded-br-3xl w-full max-w-xl shrink-0 shadow-lg bg-[url('/assets/bg.jpg')] bg-cover bg-center shadow-red-400">
                <form onSubmit={handleAddReview} className="card-body">
                    
                    {/* Car Model */}
                    <div className="form-control" >
                        <label className="label">
                            <span className="label-text text-white">Car Model</span>
                        </label>
                        <input name="model" type="text" placeholder="Car Model" className="input input-bordered" required />
                    </div>

                    {/* Daily Rental Price */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Daily Rental Price</span>
                        </label>
                        <input name="price" type="number" placeholder="Daily Rental Price" className="input input-bordered" required />
                    </div>

                    {/* Availability */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Availability</span>
                        </label>
                        <select className="select select-bordered w-full" name="availability" defaultValue={""} required>
                            <option disabled value="">Availability</option>
                            <option value="Available">Available</option>
                            <option value="Not Available">Not Available</option>
                        </select>
                    </div>

                    {/* Vehicle Registration Number */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Vehicle Registration Number</span>
                        </label>
                        <input name="reg_number" type="text" placeholder="Vehicle Registration Number" className="input input-bordered" required />
                    </div>

                    {/* Features */}
                    <div className="form-control text-white">
                        <label className="label">
                            <span className="label-text text-white">Features</span>
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="features" value="GPS" className="checkbox checkbox-primary" />
                                <span>GPS</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="features" value="AC" className="checkbox checkbox-primary" />
                                <span>AC</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="features" value="Music Box" className="checkbox checkbox-primary" />
                                <span>Music Box</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="features" value="Back Camera" className="checkbox checkbox-primary" />
                                <span>Back Camera</span>
                            </label>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Description</span>
                        </label>
                        <textarea name="description" className="textarea textarea-bordered" placeholder="Description" required></textarea>
                    </div>

                    {/* Booking Count */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Booking Count</span>
                        </label>
                        <input name="booking_count" type="number" placeholder="Booking Count" className="input input-bordered" min="0" defaultValue={0} required />
                    </div>

                    {/* Location */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Location</span>
                        </label>
                        <input name="location" type="text" placeholder="Location" className="input input-bordered" required />
                    </div>

                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Add Car" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCar;