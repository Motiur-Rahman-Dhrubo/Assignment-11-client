import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";

const AddCar = () => {

    const { user } = useContext(AuthContext);
    const [images, setImages] = useState([]);

    const onDrop = (acceptedFiles) => {
        setImages(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": []
        },
        multiple: true
    });

    const handleAddReview = (e) => {
        e.preventDefault();
        const form = e.target;
        const car_model = form.model.value;
        const car_brand = form.brand.value;
        const daily_rental_price = form.price.value;
        const availability = form.availability.value;
        const vehicle_registration_number = form.reg_number.value;
        const features = Array.from(form.features)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        const description = form.description.value;
        const booking_count = form.booking_count.value;
        const location = form.location.value;
        const user_name = user.displayName;
        const user_email = user.email;
        const now = new Date();
        const current_date = `${String(now.getDate()).padStart(2, '0')} ${now.toLocaleString('en-US', { month: 'short' })} ${now.getFullYear()}`;
        const booking_status = "Available";
        const image_files = images.map(file => file.preview);

        const newCar = { car_model, car_brand, daily_rental_price, availability, vehicle_registration_number, features, description, booking_count, location, user_name, user_email, current_date, booking_status, image_files }

        //send data to server
        fetch('http://localhost:5000/car', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCar)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    toast.success("Your Car Added Successfully", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    form.reset();
                    setImages([]);
                }
            })
    }

    return (
        <div className="min-h-screen flex justify-center items-center mt-5 w-11/12 mx-auto">
            <ToastContainer />
            <div className="card rounded-tr-none rounded-bl-none rounded-tl-3xl rounded-br-3xl w-full max-w-xl shrink-0 shadow-lg bg-[url('/assets/bg.jpg')] bg-cover bg-center shadow-red-400">
                <form onSubmit={handleAddReview} className="card-body">

                    {/* Car Model */}
                    <div className="form-control" >
                        <label className="label">
                            <span className="label-text text-white">Car Model</span>
                        </label>
                        <input name="model" type="text" placeholder="Car Model" className="input input-bordered" required />
                    </div>

                    {/* Car Brand */}
                    <div className="form-control" >
                        <label className="label">
                            <span className="label-text text-white">Car Brand</span>
                        </label>
                        <input name="brand" type="text" placeholder="Car Brand" className="input input-bordered" required />
                    </div>

                    {/* Daily Rental Price */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Daily Rental Price ($)</span>
                        </label>
                        <input name="price" type="number" placeholder="Daily Rental Price" className="input input-bordered" required />
                    </div>

                    {/* Availability */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Availability</span>
                        </label>
                        <select className="select select-bordered w-full" name="availability" defaultValue={"Available"} required>
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
                                <input type="checkbox" name="features" value="GPS" className="checkbox checkbox-secondary" />
                                <span>GPS</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="features" value="AC" className="checkbox checkbox-accent" />
                                <span>AC</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="features" value="Music Box" className="checkbox checkbox-success" />
                                <span>Music Box</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="features" value="Back Camera" className="checkbox checkbox-info" />
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

                    {/* Images */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Upload Images</span>
                        </label>
                        <div {...getRootProps()}
                            className={"border-2 border-dashed p-4 rounded-lg bg-blue-50 border-gray-500 cursor-pointer"} >
                            <input {...getInputProps()} />
                            <p className="text-center text-gray-500">Drag 'n' drop images here, or click to select files</p>
                        </div>
                        <div className="mt-4 flex gap-2 flex-wrap">
                            {images.map((file, index) => (
                                <img key={index} src={file.preview} alt="Preview" className="w-16 md:w-20 aspect-[1/1] object-cover rounded-md" />
                            ))}
                        </div>
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