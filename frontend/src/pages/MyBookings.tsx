import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { data: properties } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!properties || properties.length === 0) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="">
      <span className="flex justify-between py-8 px-8">
        <h1 className="text-xl font-bold">My Bookings</h1>
        <Link
          to="/search"
          className="w-48 inline-block bg-brown hover:text-custom-gray hover:bg-light-brown text-white font-bold py-2 px-2 rounded text-center"
        >
          Search for Properties
        </Link>
      </span>

      <div className="grid grid-cols-1 gap-8">
        {properties.map((property) => (
          <div key={property._id} className="flex h-auto border rounded">
            <div className="w-1/3 border my-4 ml-4">
              <img
                className="object-cover h-full w-full"
                src={property.imageUrls[0]}
                alt={`${property.name}`}
              />
            </div>

            <div className="w-2/3 px-4">
              <h2 className="text-xl font-bold py-2 pb-1">{property.name}</h2>
              <div className="flex items-center indent-1 py-1 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <span>
                  {property.city}, {property.country}
                </span>
              </div>              
              <label className="text-xs font-bold text-custom-gray">Booked dates:</label>
                <div className="h-40 overflow-auto">
                {property.bookings.map((booking) => (
                  <div className="border border-2 rounded m-2 p-1">
                  <div className="flex items-center indent-1 py-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>

                    <span>
                      {new Date(booking.checkIn).toDateString()} -
                      {new Date(booking.checkOut).toDateString()}
                    </span>
                  </div>

                  <div className="flex items-center indent-1 py-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>

                    <span>
                      {booking.adultCount} adults, {booking.childCount} children
                    </span>
                  </div>
                  </div>

                
              ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;