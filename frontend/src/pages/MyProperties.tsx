import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client"

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
        <div className="">


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

                    <div className="flex h-64 border rounded">
                        <div className="w-1/3 border my-4 ml-4">
                            <img className="object-cover h-56" src={property.imageUrls[0]} />
                        </div>

                        <div className="w-2/3 px-4">

                            <h2 className="text-xl font-bold py-2">{property.name}</h2>

                            <div className="text-sm">

                                <div className="flex items-center indent-1">

                                    <svg className="h-4 w-4 text-custom-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>

                                    {property.city}, {property.country}
                                </div>

                                <div className="px-4 text-xs text-pretty h-24 m-2 line-clamp-5">{property.description}</div>

                                <div className=" rounded-sm flex items-center indent-1">
                                    <svg className="h-4 w-4 text-custom-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>

                                    {property.adultCount} adults, {property.childCount} children
                                </div>

                                <div className="rounded-sm flex justify-between py-3">
                                    <div className="flex flex-row space-x-4">
                                        <div>
                                            <span className="flex">
                                                <Link to={`/edit-property/${property._id}`}
                                                    className="text-xs inline-block bg-brown hover:bg-light-brown hover:text-custom-gray text-white py-2 px-5 rounded"> Edit Property Details </Link>
                                            </span>
                                        </div>
                                        <div>
                                            <span className="flex">
                                                <Link to={`/my-properties/${property._id}/bookings`}
                                                    className="text-xs inline-block bg-brown hover:bg-light-brown hover:text-custom-gray text-white py-2 px-5 rounded"> View Guest Bookings </Link>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-lg text-center text-custom-gray font-bold leading-tight">£{property.pricePerNight}</p>
                                        <p className="text-right leading-none">includes taxes and fees</p>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProperties;