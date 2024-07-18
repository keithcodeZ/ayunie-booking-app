import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client"
import { BiMoney, BiHotel, BiStar } from "react-icons/bi";
import { BsMap, BsBuilding } from "react-icons/bs";

const MyProperties = () => {
    const { data: propertyData } = useQuery(
        "fetchMyProperties",
        apiClient.fetchMyProperties,
        {
            onError: () => { },
        }
    );

    if (!propertyData) {
        return <span> No Properties Found</span>
    }

    return (
        <div className="border">


            <span className="flex justify-between py-8 px-8">
                <h1 className="text-xl font-bold"> My Properties</h1>
                <Link
                    to="/add-property"
                    className="w-48 inline-block bg-brown hover:text-custom-gray hover:bg-light-brown text-white font-bold py-2 px-2 rounded text-center">
                    Add Property
                </Link>
            </span>

            <div className="grid grid-cols-1 gap-8">

                {propertyData.map((property) => (

                    <div className="">
                        <div className="border">

                        </div>
                        <div className="border">

                            <h2 className="text-l font-bold">{property.name}</h2>

                            <div className="text-sm">

                                <div className="rounded-sm flex items-center">
                                    <BsMap className="mr-1" />
                                    {property.city}, {property.country}
                                </div>

                                <div className="text-sm">{property.description}</div>

                                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                    <BsBuilding className="mr-1" />
                                    {property.type}
                                </div>

                                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                    <BiMoney className="mr-1" />£{property.pricePerNight} per night
                                </div>

                                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                    <BiHotel className="mr-1" />
                                    {property.adultCount} adults, {property.childCount} children
                                </div>

                            </div>

                            <span className="flex justify-end">
                                <Link to={`/edit-property/${property._id}`}
                                    className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"> View Details </Link>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProperties;