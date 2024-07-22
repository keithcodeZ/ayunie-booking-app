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

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>

                                    {property.city}, {property.country}
                                </div>

                                <div className="px-4 text-xs text-pretty h-24 m-2 line-clamp-5">{property.description}</div>

                                <div className=" rounded-sm flex items-center indent-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
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