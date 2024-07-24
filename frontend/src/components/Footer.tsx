import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import logo from "../assets/images/ayunie-logo-1.png"

const Footer = () => {
  const {isLoggedIn} = useAppContext();

  return (
    <div className="bg-custom-gray">
      <div className="grid grid-cols-2 py-10">
        <div className=" pl-20 py-10">
            <h1 className="text-white text-2xl py-6">Share your best places to the world.</h1>
            {isLoggedIn ?
              (<Link to="/add-property"
                className="inline-block bg-brown hover:bg-light-brown hover:text-custom-gray text-white font-bold py-3 px-4 rounded">
                List your Property
              </Link>) : 
              (<Link to="/sign-in"
                className="inline-block bg-brown hover:bg-light-brown hover:text-custom-gray text-white font-bold py-3 px-4 rounded">
                List your Properties
              </Link>)
            }
        </div>
        <div>
          <div className="flex py-4 justify-center">
            <a href="/">
              <img src={logo} alt="ayunie-logo.png" className="h-20 pr-10" />
            </a>
          </div> 
          <div className="grid grid-cols-3 text-white text-sm py-1">
            <div className="grid auto-rows-max gap-3">
              <Link to="/">About Us</Link>
              <Link to="/">Contact</Link>
              <Link to="/">Location</Link>
            </div>
            <div className="grid auto-rows-max gap-3">
              <Link to="/">FAQ</Link>
              <Link to="/">Term of Uses</Link>
              <Link to="/">Privacy Policy</Link>
            </div>
            <div className="grid auto-rows-max gap-3">
              <Link to="/">Services & Facilities</Link>
              <Link to="/">How to book</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-20">
        <hr className="w-80 h-px mx-auto border-0 rounded bg-gray-700" />
        <span className="block text-sm text-white sm:text-center py-5">© Copyright Ayunie Vacation Home Rental LLC. All right reserved.</span>
      </div>
    </div>
  )
}

export default Footer