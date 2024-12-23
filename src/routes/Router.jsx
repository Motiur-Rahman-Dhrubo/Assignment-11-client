import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        // errorElement: <ErrorPage></ErrorPage>,
        // children: [
        //     {
        //         path: "/",
        //         element: <Home></Home>,
        //     },
        // ],
    },
]);

export default Router;