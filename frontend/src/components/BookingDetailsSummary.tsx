import { PropertyType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  property: PropertyType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  property,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit m-5">
      <h2 className="text-xl font-bold">Your Booking Details</h2>

      <div className="text-sm border-b py-2">
        Location:
        <div className="py-2 font-bold">{`${property.name}, ${property.city}, ${property.country}`}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm">
          Check-in
          <div className="py-2 font-bold"> {checkIn.toDateString()}</div>
        </div>
        <div className="text-sm">
          Check-out
          <div className="py-2 font-bold"> {checkOut.toDateString()}</div>
        </div>
      </div>
      <div className="text-sm border-t border-b py-2">
        Total length of stay:
        <div className="py-2 font-bold">{numberOfNights} nights</div>
      </div>

      <div className="text-sm">
        Guests{" "}
        <div className="py-2 font-bold">
          {adultCount} adults & {childCount} children
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;