import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as apiClient from "../../api-client";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  propertyId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const isInvalidDate = (date: Date | undefined): boolean => {
  return !date || (date.getFullYear() === 1899 && date.getMonth() === 11 && date.getDate() === 31);
};

const GuestInfoForm = ({ propertyId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [bookings, setBookings] = useState<GuestInfoFormData[]>([]);
  const [dateError, setDateError] = useState<string | null>(null);
  const [dateConflictError, setDateConflictError] = useState<string | null>(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState<boolean>(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState<boolean>(false);

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: isInvalidDate(search.checkIn) ? undefined : new Date(search.checkIn),
      checkOut: isInvalidDate(search.checkOut) ? undefined : new Date(search.checkOut),
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apiClient.fetchPropertyById(propertyId)
        setBookings(response.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [propertyId]);

  useEffect(() => {
    const checkDateConflict = () => {
      // Ensure check-out date is not earlier than check-in date
      if (checkIn && checkOut) {
        if (checkOut < checkIn) {
          setDateError("Invalid Date");
          setDateConflictError(null);
          return;
        } else {
          setDateError(null);
        }
      }

      // Check for date conflicts with existing bookings
      const conflict = bookings.some(
        (booking) =>
          // Check if Check-in Date is in between existing bookings
          (checkIn > new Date(booking.checkIn) && checkIn < new Date(booking.checkOut)) ||

          // Check if Check-out Date is in between existing bookings
          (checkOut > new Date(booking.checkIn) && checkOut < new Date(booking.checkOut)) ||

          // Check if New Booking entirely overlaps Existing Bookings
          (checkIn <= new Date(booking.checkIn) && checkOut >= new Date(booking.checkOut)) ||

          // Check-in and Check-out dates are not exactly the same as the existing bookings' Check-in and Check-out dates, 
          // but allowing the overlap on one side.
          (checkIn === new Date(booking.checkIn) && checkOut !== new Date(booking.checkOut)) ||
          (checkIn !== new Date(booking.checkIn) && checkOut === new Date(booking.checkOut))
      );
      if (conflict) {
        setDateConflictError("Date Unavailable");
      } else {
        setDateConflictError(null);
      }
    };

    // Only check date conflicts if both dates are provided
    if (checkIn && checkOut) {
      checkDateConflict();
    } else {
      setDateError(null);
      setDateConflictError(null);
    }
  }, [checkIn, checkOut, bookings]);

  // Generate an array of dates to be excluded
  const excludeDates = bookings.flatMap(booking => {
    const start = new Date(booking.checkIn);
    const end = new Date(booking.checkOut);
    const dates = [];
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date));
    }
    return dates;
  });

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn || new Date(),
      data.checkOut || new Date(),
      data.adultCount,
      data.childCount
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn || new Date(),
      data.checkOut || new Date(),
      data.adultCount,
      data.childCount
    );
    navigate(`/property/${propertyId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-light-brown gap-4">
      <div className="flex text-sm">
        Price per night: 
      <h3 className="px-2 font-bold">${pricePerNight}</h3>
      </div>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
          <label className="text-custom-gray text-xs flex-1">
            Check-in date:
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => 
                {
                  setValue("checkIn", date as Date);
                  setIsCheckInOpen(false);
                }}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              excludeDates={excludeDates}
              shouldCloseOnSelect
              onClickOutside={() => setIsCheckInOpen(false)}
              onSelect={() => setIsCheckInOpen(false)}
              open={isCheckInOpen}
              onFocus={() => setIsCheckInOpen(true)}
              placeholderText="Check-in Date"
              className="bg-white rounded w-full py-3 px-2 font-normal"
              wrapperClassName="min-w-full"
            />
            </label>
          </div>
          <div>
          <label className="text-custom-gray text-xs flex-1">
            Check-out date
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => 
                {
                  setValue("checkOut", date as Date);
                  setIsCheckOutOpen(false);
                }}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              excludeDates={excludeDates}
              shouldCloseOnSelect
              onClickOutside={() => setIsCheckOutOpen(false)}
              onSelect={() => setIsCheckOutOpen(false)}
              open={isCheckOutOpen}
              onFocus={() => setIsCheckOutOpen(true)}
              placeholderText="Check-out Date"
              className="bg-white rounded w-full py-3 px-2 font-normal"
              wrapperClassName="min-w-full"
            />
            </label>
          </div>
          <div className="flex py-1 gap-2">
            <label className="text-gray-700 text-xs flex-1">
              Adults:
              <input
                className="bg-white rounded w-full py-3 px-2 font-normal"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="text-gray-700 text-xs flex-1">
              Children:
              <input
                className="bg-white rounded w-full py-3 px-2 font-normal"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {dateError && (
            <span className="text-red-500 font-semibold text-sm">{dateError}</span>
          )}
          {dateConflictError && (
            <span className="text-red-500 font-semibold text-sm">{dateConflictError}</span>
          )}
          <button
            className={`text-sm inline-block bg-brown hover:shadow-lg text-white py-2 rounded ${!checkIn || !checkOut || dateError || dateConflictError ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!checkIn || !checkOut || !!dateError || !!dateConflictError}
          >
            {isLoggedIn ? 'Book Now' : 'Sign in to Book'}
        </button>
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
