// import { Link } from "react-router-dom";
// import { useAppContext } from "../contexts/AppContext";
// import UserMenu from "./UserMenu";
// import PropertyMenu from "./PropertyMenu";
// import BookingsMenu from "./BookingsMenu";
// import logo from "../assets/images/ayunie-logo-1.png"

const Header = () => {

    // const { isLoggedIn } = useAppContext();

    return (
        <div className="border bg-white py-3">
            {/* <div className=" flex justify-between px-20">
                <a href="/">
                    <img src={logo} alt="ayunie-logo.png" className="h-10" />
                </a>
                <span className="flex space-x-2">
                    {isLoggedIn ?
                        (<>
                            <PropertyMenu/>
                            <BookingsMenu/>
                            <UserMenu/>
                        </>) : (
                            <Link to="/sign-in" className="w-48 text-center inline-block bg-brown hover:bg-light-brown hover:text-custom-gray text-white font-bold py-2 px-10 rounded">Sign In</Link>
                        )
                    }

                </span>
            </div> */}
        </div>
    );
};

export default Header;
