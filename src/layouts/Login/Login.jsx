import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

    const { userLogin, setUser, handleGoogleSignUp, setLoading } = useContext(AuthContext);

    const [error, setError] = useState({});

    const navigate = useNavigate();

    const handleGoogleSignOnClick = (e) => {
        e.preventDefault();
        handleGoogleSignUp()
            .then((result) => {
                const user = result.user;
                setUser(user);
                toast.success("Successfully Sign in With Your Google", {
                    position: "top-center",
                    autoClose: 2000,
                });
                setTimeout(() => navigate("/"), 2000);
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 2000,
                });
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        userLogin(email, password).then((result) => {
            const user = result.user;
            setUser(user);
            toast.success("Successfully Login", {
                position: "top-center",
                autoClose: 2000,
            });
            setTimeout(() => navigate("/"), 2000);
        }).catch((err) => {
            setError({ ...error, login: err.code });
            setLoading(false);
        });
    }

    return (
        <div className="min-h-screen flex justify-center items-center mt-5 w-11/12 mx-auto">
            <ToastContainer />
            <div className="card rounded-tr-none rounded-bl-none rounded-tl-lg rounded-br-lg w-full max-w-sm shrink-0 shadow-md bg-[url('/assets/bg.jpg')] bg-cover bg-center shadow-blue-500">
                <form onSubmit={handleSubmit} className="card-body">

                    {/* email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                    </div>

                    {/* password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Password</span>
                        </label>
                        <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                    </div>

                    {
                        error.login && (
                            <label className="label">
                                <p className="text-red-600">{error.login}</p>
                            </label>
                        )
                    }

                    <div className="form-control mt-6 gap-4">
                        <input className="btn btn-primary" type="submit" value="Login" />
                        <button onClick={handleGoogleSignOnClick} className="btn btn-neutral">Sign in with Google</button>
                    </div>
                    <p className="mt-2 text-white">Don't have an account? <Link to="/register" className="link-hover font-bold text-blue-600 bg-white px-1 rounded-lg">Register</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;