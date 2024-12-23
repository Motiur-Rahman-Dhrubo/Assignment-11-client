import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer footer-center bg-neutral text-neutral-content p-10 gap-5">
            <aside>
                <Link to='/'>
                    <img src="/assets/logo.png" alt="logo" className='w-[150px] h-[60px]' />
                </Link>
                <p className="font-bold tracking-widest">
                    JO.Car Pvt Ltd.
                </p>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by JO.Car Pvt Ltd.</p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-5 text-3xl">
                    <a href="https://www.facebook.com/md.motiur.rahman.383" target="_blank"><FaFacebook /></a>
                    <a href="https://www.linkedin.com/in/md-motiur-rahman-105598318/" target="_blank"><FaLinkedin /></a>
                    <a href="https://www.youtube.com/@ruitom.coder383" target="_blank"><FaYoutube /></a>
                    <a href="https://github.com/Motiur-Rahman-Dhrubo" target="_blank"><FaGithub /></a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;