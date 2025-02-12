import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigation } from "react-router-dom";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const useAxiosSecure = () => {

    const { logOut } = useContext(AuthContext);
    const navigate = useNavigation;

    useEffect(() => {
        const interceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                console.log("Error intercepted:", error);

                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    logOut()
                        .then(() => {
                            console.log("User logged out due to unauthorized request.");
                            navigate("/login");
                        })
                        .catch((error) => console.error("Logout error:", error));
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.response.eject(interceptor);
        };
    }, [logOut, navigate]);

    return axiosInstance;
};

export default useAxiosSecure;






// useEffect(() => {
//     axiosInstance.interceptors.response.use(response => {
//         return response;
//     }, error => {
//         console.log('error get by interceptor', error)

//         if (error.status === 401 || error.status === 403) {
//             logOut()
//                 .then(() => {
//                     console.log('logged out user');
//                     navigate('/login')
//                 })
//                 .catch(error => console.log(error));
//         }

//         return Promise.reject(error);
//     })
// }, [])
