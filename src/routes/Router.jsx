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
import CarDetails from '../layouts/CarDetails/CarDetails';
import UpdateCar from '../layouts/UpdateCar/UpdateCar';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: () => fetch('https://jo-car-server.vercel.app/top-prices'),
            },
            {
                path: "/available-cars",
                element: <AvailableCars></AvailableCars>,
                loader: () => fetch('https://jo-car-server.vercel.app/available_car'),
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
            {
                path: "/car/:id",
                element: <CarDetails></CarDetails>,
                loader: ({ params }) => fetch(`https://jo-car-server.vercel.app/car/${params.id}`)
            },
            {
                path: "/update_car/:id",
                element: (
                    <PrivateRoute>
                        <UpdateCar></UpdateCar>
                    </PrivateRoute>
                ),
                loader: ({ params }) => fetch(`https://jo-car-server.vercel.app/car/${params.id}`)
            },
        ],
    },
]);

export default Router;