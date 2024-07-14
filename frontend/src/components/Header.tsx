import {Link} from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {

    const {isLoggedIn} = useAppContext();

    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">MernHolidays.com</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? 
                        (<>
                            <Link to="/my-bookings"
                                className="flex items-center px-3 font-bold text-white hover:bg-blue-600"
                            >
                                My Bookings
                            </Link>
                            <Link to="/my-properties"
                                className="flex items-center px-3 font-bold text-white hover:bg-blue-600"
                            >
                                My Properties
                            </Link>
                            <SignOutButton />
                            {/* <button>Sign Out</button> */}
                        </>) : (
                            <Link to="/sign-in" className="flex items-center px-3 font-bold text-blue-700 bg-white hover:text-white hover:bg-blue-700">Sign In</Link>
                        )
                    }
                    
                </span>
            </div>
        </div>
    );
};

export default Header;