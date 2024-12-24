import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../layouts/Home/Home';
import AvailableCars from '../layouts/AvailableCars/AvailableCars';
import AddCar from '../layouts/AddCar/AddCar';
import MyCars from '../layouts/MyCars/MyCars';
import MyBookings from '../layouts/MyBookings/MyBookings';
import ErrorPage from '../layouts/ErrorPage/ErrorPage';
import Login from '../layouts/Login/Login';
import Register from '../layouts/Register/Register';
import PrivateRoute from './PrivateRoute';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/available-cars",
                element: <AvailableCars></AvailableCars>,
                loader: () => fetch('http://localhost:5000/car'),
            },
            {
                path: "/add-car",
                element: <PrivateRoute>
                    <AddCar></AddCar>
                </PrivateRoute>,
            },
            {
                path: "/my-cars",
                element: <PrivateRoute>
                    <MyCars></MyCars>
                </PrivateRoute>,
            },
            {
                path: "/my-bookings",
                element: <PrivateRoute>
                    <MyBookings></MyBookings>
                </PrivateRoute>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
        ],
    },
]);

export default Router;