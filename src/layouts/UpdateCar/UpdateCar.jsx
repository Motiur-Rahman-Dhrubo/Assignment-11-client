import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateCar = () => {

    const carData = useLoaderData();
    const navigate = useNavigate();
    const { _id, car_model, car_brand, daily_rental_price, availability, vehicle_registration_number, description, location, image_files } = carData;
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

    const handelUpdateCar = (e) => {
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
        const location = form.location.value;
        const image_files = images.length > 0 ? images.map(file => file.preview) : carData.image_files;

        const updateCar = { car_model, car_brand, daily_rental_price, availability, vehicle_registration_number, features, description, location, image_files }

        fetch(`https://jo-car-server.vercel.app/car/${_id}`, {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateCar)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Car data Successfully Updated", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    setTimeout(() => navigate("/my-cars"), 2000);
                };
            })
            .catch((err) => console.error(err));
    };


    return (
        <div className="min-h-screen flex justify-center items-center mt-5 w-11/12 mx-auto">
            <ToastContainer />
            <div className="card rounded-tr-none rounded-bl-none rounded-tl-3xl rounded-br-3xl w-full max-w-xl shrink-0 shadow-md bg-[url('/assets/bg.jpg')] bg-cover bg-center shadow-red-400">
                <form onSubmit={handelUpdateCar} className="card-body">

                    {/* Car Model */}
                    <div className="form-control" >
                        <label className="label">
                            <span className="label-text text-white">Car Model</span>
                        </label>
                        <input name="model" type="text" placeholder="Car Model" defaultValue={car_model} className="input input-bordered" required />
                    </div>

                    {/* Car Brand */}
                    <div className="form-control" >
                        <label className="label">
                            <span className="label-text text-white">Car Brand</span>
                        </label>
                        <input name="brand" type="text" placeholder="Car Brand" defaultValue={car_brand} className="input input-bordered" required />
                    </div>

                    {/* Daily Rental Price */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Daily Rental Price ($)</span>
                        </label>
                        <input name="price" type="number" placeholder="Daily Rental Price" defaultValue={daily_rental_price} className="input input-bordered" required />
                    </div>

                    {/* Availability */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Availability</span>
                        </label>
                        <select className="select select-bordered w-full" name="availability" defaultValue={availability} required>
                            <option value="Available">Available</option>
                            <option value="Not Available">Not Available</option>
                        </select>
                    </div>

                    {/* Vehicle Registration Number */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Vehicle Registration Number</span>
                        </label>
                        <input name="reg_number" type="text" placeholder="Vehicle Registration Number" defaultValue={vehicle_registration_number} className="input input-bordered" required />
                    </div>

                    {/* Features */}
                    <div className="form-control text-white">
                        <label className="label">
                            <p className="label-text text-white">Features <span className='text-red-500'>(please fill it again)</span></p>
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
                        <textarea name="description" className="textarea textarea-bordered" placeholder="Description" defaultValue={description} required></textarea>
                    </div>

                    {/* Images */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Upload Images</span>
                        </label>
                        <div {...getRootProps()}
                            className={"border-2 border-dashed p-4 rounded-lg bg-blue-50 border-gray-500 cursor-pointer"} >
                            <input {...getInputProps()} />
                            <p className="text-center text-gray-500">Drag and drop or click to select images to replace the existing images.</p>
                        </div>
                        <div className="mt-4 flex gap-2 flex-wrap">
                            {images.length === 0
                                ? image_files.map((file, index) => (
                                    <img key={index} src={file.preview || file} alt="Preview" className="w-16 md:w-20 aspect-[1/1] object-cover rounded-md" />
                                ))
                                : images.map((file, index) => (
                                    <img key={index} src={file.preview} alt="Preview" className="w-16 md:w-20 aspect-[1/1] object-cover rounded-md" />
                                ))}
                        </div>

                    </div>

                    {/* Location */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Location</span>
                        </label>
                        <input name="location" type="text" placeholder="Location" className="input input-bordered" defaultValue={location} required />
                    </div>

                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Update Car" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCar;