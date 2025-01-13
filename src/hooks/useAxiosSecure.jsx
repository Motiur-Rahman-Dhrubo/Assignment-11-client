import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigation } from "react-router-dom";


const axiosInstance = axios.create({
    baseURL: 'https://jo-car-server.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {

    const { logOut } = useContext(AuthContext);
    const navigate = useNavigation;

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('error get by interceptor', error)

            if (error.status === 401 || error.status === 403) {
                logOut()
                    .then(() => {
                        console.log('logged out user');
                        navigate('/login')
                    })
                    .catch(error => console.log(error));
            }

            return Promise.reject(error);
        })
    }, [])
    return axiosInstance;
};

export default useAxiosSecure;