import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../layouts/Home/Home';
import AvailableCars from '../layouts/AvailableCars/AvailableCars';
import AddCar from '../layouts/AddCar/AddCar';
import MyCars from '../layouts/MyCars/MyCars';
import MyBookings from '../layouts/MyBookings/MyBookings';
import ErrorPage from '../layouts/ErrorPage/ErrorPage';

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
            },
            {
                path: "/add-car",
                element: <AddCar></AddCar>,
            },
            {
                path: "/my-cars",
                element: <MyCars></MyCars>,
            },
            {
                path: "/my-bookings",
                element: <MyBookings></MyBookings>,
            },
        ],
    },
]);

export default Router;