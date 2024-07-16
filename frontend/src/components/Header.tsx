import {Link} from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {

    const {isLoggedIn} = useAppContext();

    return (
        <div className="bg-white py-3">
            <div className="container mx-auto flex justify-between">
                <span className="text-2xl text-custom-gray tracking-tight">
                    <Link to="/">Ayunie Logo</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? 
                        (<>
                            <Link to="/my-properties"
                                className="inline-block bg-brown hover:bg-light-brown hover:text-custom-gray text-white font-bold py-2 px-4 rounded">
                                List your Properties
                            </Link>
                            <Link to="/my-properties"
                                className="inline-block bg-white-500 hover:bg-light-brown text-custom-gray font-bold py-2 px-14 rounded">
                                My Trips
                            </Link>
                            <Link to= "">
                                <svg className="w-[40px] h-[40px] fill-[#1e1e1e]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

                                    <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"></path>

                                </svg>
                            </Link>
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