import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import UserMenu from "./UserMenu";

const Header = () => {

    const { isLoggedIn } = useAppContext();

    return (
        <div className="border bg-white py-3">
            <div className=" flex justify-between px-20">
                <a href="/">
                    <img src="../src/assets/images/ayunie-logo.png" alt="ayunie-logo.png" className="h-10" />
                </a>
                <span className="flex space-x-2">
                    {isLoggedIn ?
                        (<>
                            <Link to="/my-properties"
                                className="w-48 inline-block bg-white-500 hover:bg-light-brown text-custom-gray font-bold py-2 px-2 rounded text-center">
                                List your Properties
                            </Link>
                            <Link to="/my-bookings"
                                className="w-48 inline-block bg-white-500 hover:bg-light-brown text-custom-gray font-bold py-2 px-2 rounded text-center">
                                My Trips
                            </Link>
                            <UserMenu/>
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
