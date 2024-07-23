import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import BookingForm from "../forms/BookingForm/BookingForm";
import BookingDetailsSummary from "../components/BookingDetailsSummary";

const Booking = () => {
	const search = useSearchContext();
  const { propertyId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

 	useEffect(() => {
		if (search.checkIn && search.checkOut) {
      const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
		}
  }, [search.checkIn, search.checkOut]);

  const { data: property } = useQuery(
    "fetchPropertyByID",
    () => apiClient.fetchPropertyById(propertyId as string),
		{
		enabled: !!propertyId,
		}
  );

	const { data: propertyOwner } = useQuery(
		"fetchUserById",
		() => apiClient.fetchUserById(property?.userId as string),
		{
		enabled: !!property?.userId,
		}
	);

	const { data: currentUser } = useQuery(
		"fetchCurrentUser",
    apiClient.fetchCurrentUser
	);

	if (!property || !propertyOwner) {
		return <></>; // Or some loading or error state
	}

  return (
    <div className="grid md:grid-cols-[2fr_1fr]">
      {currentUser && <BookingForm currentUser={currentUser} numberOfNights={numberOfNights} property={property} propertyOwner={propertyOwner}/>}
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        property={property}
      />
    </div>
  );
};

export default Booking;