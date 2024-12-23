import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {

    const { createNewUser, setUser, updateUserProfile, logOut } = useContext(AuthContext);

    const [error, setError] = useState({});

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const nameCriteria = /^[A-Za-z\s]+$/;
        if (!nameCriteria.test(name)) {
            setError((prev) => ({ ...prev, name: "Name must not contain numbers or special characters." }));
            return;
        } else {
            setError((prev) => ({ ...prev, name: null }));
        }
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const password = e.target.password.value;
        const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordCriteria.test(password)) {
            setError((prev) => ({ ...prev, password: "Password must contain at least 6 characters, including uppercase and lowercase letters.", }));
            return;
        } else {
            setError((prev) => ({ ...prev, password: null }));
        }
        createNewUser(email, password).then((result) => {
            const user = result.user;
            setUser(user);
            toast.success("Successfully Registered", {
                position: "top-center",
                autoClose: 2000,
            });
            updateUserProfile({ displayName: name, photoURL: photo })
                .then(() => {
                    logOut();
                    setTimeout(() => navigate("/login"), 2000);
                }).catch((err) => {
                    toast.error(err.message, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                });
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(`${errorCode}: ${errorMessage}`, {
                position: "top-center",
                autoClose: 2000,
            });
        });
    }

    return (
        <div className="min-h-screen flex justify-center items-center mt-5 w-11/12 mx-auto">
            <ToastContainer />
            <div className="card rounded-tr-none rounded-bl-none rounded-tl-3xl rounded-br-3xl w-full max-w-sm shrink-0 shadow-lg bg-[url('/assets/bg.jpg')] bg-cover bg-center shadow-red-400">
                <form onSubmit={handleSubmit} className="card-body">
                    
                    {/* name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Name</span>
                        </label>
                        <input name="name" type="text" placeholder="name" className="input input-bordered" required />
                    </div>

                    {
                        error.name && (
                            <label className="label">
                                <p className="text-red-600">{error.name}</p>
                            </label>
                        )
                    }

                    {/* email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                    </div>

                    {/* photo */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Photo URL</span>
                        </label>
                        <input name="photo" type="text" placeholder="photo URL" className="input input-bordered" />
                    </div>

                    {/* password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Password</span>
                        </label>
                        <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                    </div>

                    {error.password && (
                        <label className="label">
                            <p className="text-red-600">{error.password}</p>
                        </label>
                    )}

                    {/* submit */}
                    <div className="form-control mt-6 gap-4">
                        <input className="btn btn-primary" type="submit" value="Register Now" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;