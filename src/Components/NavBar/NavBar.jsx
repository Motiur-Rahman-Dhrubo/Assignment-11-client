import { Link, NavLink } from "react-router-dom";

const NavBar = () => {

    const links = <>
        <li><NavLink className='py-1 px-3' to="/">Home</NavLink></li>
        <li><NavLink className='py-1 px-3' to="/available-cars">Available Cars</NavLink></li>
        <li><NavLink className='py-1 px-3' to="/add-car">Add Car</NavLink></li>
        <li><NavLink className='py-1 px-3' to="/my-cars">My Cars</NavLink></li>
        <li><NavLink className='py-1 px-3' to="/my-bookings">My Bookings</NavLink></li>
    </>
    const joining = <>
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Register</Link>
    </>

    return (
        <div className="navbar bg-base-100 w-11/12 mx-auto px-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to="/" className="w-[120px]"><img className="w-full h-[50px]" src="/assets/logo.png" alt="logo" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <div className='gap-2 hidden lg:flex'>
                    {joining}
                </div>
                <div className='block lg:hidden'>
                    <details className="dropdown">
                        <summary className="btn m-1">Join</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[10] md:w-52 w-40 p-2 shadow gap-2 right-0">
                            {joining}
                        </ul>
                    </details>
                </div>
            </div>
        </div>
    );
};

export default NavBar;