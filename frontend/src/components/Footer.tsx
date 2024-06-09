import { Link } from "react-router-dom"
import ayunieLogo from '../assets/ayunie-icon.svg';

const Footer = () => {

    return (
        <div className="bg-neutral-800 py-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex flex-col gap-3">
                    <h2 className="text-1xl text-white tracking-tight">
                        Share your best places to the world
                    </h2>
                    <Link to="/sign-in" className="flex items-center justify-center py-3 px-5 font-bold text-white bg-yellow-900  hover:bg-yellow-800 rounded w-[180px]">List your property</Link>
                </div>
                
                <div className="flex flex-col gap-3">
                    <img src={ayunieLogo} alt="" className="self-center"/>
                    <div className="flex gap-6 text-white tracking-tight">
                        <div className="flex flex-col">
                            <a className="cursor-pointer">About us</a>
                            <a className="cursor-pointer">Contact</a>
                            <a className="cursor-pointer">Location</a>
                        </div>
                        <div className="flex flex-col">
                            <a className="cursor-pointer">FAQ</a>
                            <a className="cursor-pointer">Term of Use</a>
                            <a className="cursor-pointer">Privacy Policy</a>
                        </div>
                        <div className="flex flex-col">
                            <a className="cursor-pointer">Services & Facilities</a>
                            <a className="cursor-pointer">How to book</a>
                        </div>
                        
                        {/* <p>Powered by Mern</p>
                        <p>Copyright © 2022. All rights reserved.</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer