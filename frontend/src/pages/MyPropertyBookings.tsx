import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const MyPropertyBookings = () => {
    const { propertyId } = useParams<{ propertyId: string }>();
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    const { data: property, error, isLoading } = useQuery(
        ["fetchPropertyById", propertyId],
        () => apiClient.fetchPropertyById(propertyId!),
        {
        enabled: !!propertyId, // Only run the query if propertyId is defined
        }
    );

    const mutation = useMutation(
        (bookingId: string) => apiClient.deleteBooking(propertyId!, bookingId),
        {
            onSuccess: () => {
                // Invalidate and refetch property data
                queryClient.invalidateQueries(["fetchPropertyById", propertyId]);
                showToast({message: "Booking Deleted", type: "SUCCESS"});
            },
            onError: (error: Error) => {
                //showToast
                showToast({message: error.message, type: "ERROR"});
                console.log(error.message);
            }
        }
    );

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (error) {
        return <span>Error fetching bookings</span>;
    }

    if (!property) {
        return <span>No property found</span>;
    }

    const handleDelete = (bookingId: string) => {
        mutation.mutate(bookingId);
    };

    return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Bookings for {property.name}</h1>
      <div className="lg:w-full lg:h-[250px] mb-5">
        <img
          src={property.imageUrls[0]}
          className="w-full h-full object-cover object-center"
          alt={property.name}
        />
      </div>
      {property.bookings.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No bookings available for this property.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {property.bookings.map((booking) => (
            <div key={booking._id} className="border p-4 rounded-lg shadow-sm relative flex flex-col">
              <div className="font-bold text-lg">
                {booking.firstName} {booking.lastName}
              </div>
              <div className="text-sm text-gray-600 flex-grow">
                <div>Email: {booking.email}</div>
                <div>
                  Dates: {new Date(booking.checkIn).toDateString()} - {new Date(booking.checkOut).toDateString()}
                </div>
                <div>
                  Guests: {booking.adultCount} adults, {booking.childCount} children
                </div>
                <div>Total Cost: ${booking.totalCost.toFixed(2)}</div>
              </div>
              <button
                onClick={() => handleDelete(booking._id)}
                className="absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-md"
              >
                Delete Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPropertyBookings;
