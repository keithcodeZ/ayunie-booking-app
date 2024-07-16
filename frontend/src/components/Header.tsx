import {Link} from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {

    const {isLoggedIn} = useAppContext();

    return (
        <div className="bg-white py-3">
            <div className=" flex justify-between px-20">
                <img src="../src/assets/ayunie-logo.png" alt="ayunie-logo.png" className="h-10 pr-10" />
                <span className="flex space-x-2">
                    {isLoggedIn ? 
                        (<>
                            <Link to="/my-properties"
                                className="w-48 inline-block bg-white-500 hover:bg-light-brown text-custom-gray font-bold py-2 px-2 rounded text-center">
                                List your Properties
                            </Link>
                            <Link to="/my-properties"
                                className="w-48 inline-block bg-white-500 hover:bg-light-brown text-custom-gray font-bold py-2 px-2 rounded text-center">
                                My Trips
                            </Link>
                        
                        <SignOutButton/ >
                        </>) : (
                            <Link to="/sign-in" className="w-48 text-center inline-block bg-brown hover:bg-light-brown hover:text-custom-gray text-white font-bold py-2 px-10 rounded">Sign In</Link>
                        )
                    }
                    
                </span>
            </div>
            

            

        </div>
    );
};

export default Header;