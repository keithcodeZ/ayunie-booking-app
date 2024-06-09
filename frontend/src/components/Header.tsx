import {Link} from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import ayunieLogo from '../assets/ayunie-icon.svg';

const Header = () => {

    const {isLoggedIn} = useAppContext();

    return (
        <div className="bg-stone-50 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">
                        <img src={ayunieLogo} alt="" />
                    </Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? 
                        (<>
                            <Link to="/my-bookings"
                                className="flex items-center px-3 font-bold text-white hover:bg-blue-600"
                            >
                                My Bookings
                            </Link>
                            <Link to="/my-hotels"
                                className="flex items-center px-3 font-bold text-white hover:bg-blue-600"
                            >
                                My Hotels
                            </Link>
                            <SignOutButton />
                            {/* <button>Sign Out</button> */}
                        </>) : (
                        <>
                            <Link to="/register" className="flex items-center px-3 font-bold  bg-white hover:text-white hover:bg-yellow-900 rounded">Sign up</Link>

                            <Link to="/sign-in" className="flex items-center px-3 font-bold  bg-white hover:text-white hover:bg-yellow-900 rounded">Login</Link>
                            
                            <Link to="/sign-in" className="flex items-center px-3 font-bold text-white bg-yellow-900  hover:bg-yellow-800 rounded">List your property</Link>
                        </>
                        )
                    }
                    
                </span>
            </div>
        </div>
    );
};

export default Header;