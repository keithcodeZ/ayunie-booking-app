import { useForm } from "react-hook-form";
import { PropertyType, UserType } from "../../../../backend/src/shared/types";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
import { paymentOptions } from "../../config/payment-options-config";

type Props = {
  currentUser: UserType;
  numberOfNights: number;
  property: PropertyType;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  propertyId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, numberOfNights, property }: Props) => {
  const search = useSearchContext();
  const { propertyId } = useParams();

  const { showToast } = useAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ message: "Booking Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error saving booking", type: "ERROR" });
      },
    }
  );

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      propertyId: propertyId,
      totalCost: property.pricePerNight * numberOfNights,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    try {
        bookRoom(formData);
    } catch (error){
      console.error("Error booking room:", error);
      showToast({ message: "Error saving booking", type: "ERROR" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
        <span className="text-3xl font-bold">Confirm Your Details</span>
        <div className="grid grid-cols-2 gap-6">
            <label className="text-gray-700 text-sm font-bold flex-1">
                First Name
                <input
                    className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                    type="text"
                    readOnly
                    disabled
                    {...register("firstName")}
                />
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Last Name
                <input
                    className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                    type="text"
                    readOnly
                    disabled
                    {...register("lastName")}
                />
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                    type="text"
                    readOnly
                    disabled
                    {...register("email")}
                />
            </label>
        </div>

       <div className="space-y-2">
         <h2 className="text-xl font-semibold">Your Price Summary</h2>
         <div className="bg-blue-200 p-4 rounded-md">
           <div className="font-semibold text-lg">
             Total Cost: ${(property.pricePerNight * numberOfNights).toFixed(2)}
           </div>
           <div className="text-xs">Includes taxes and charges</div>
         </div>
       </div>

       <div className="space-y-6">
         <h3 className="text-xl font-semibold"> Payment Options:</h3>
            <div className="grid grid-cols-2 gap-6">
                {paymentOptions.map((option, index) => (
                    <label key={index} className="flex items-center space-x-2">
                        <img src={option.image} alt={option.name} className="w-8 h-8" /> {/* Adjust width and height as needed */}
                        <span>{option.name}</span>
                        <span className="text-gray-500 ml-2">{option.accountNumber}</span>
                    </label>
                ))}
            </div>
       </div>

       <div className="flex justify-end">
         <button
           disabled={isLoading}
           type="submit"
           className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
         >
           {isLoading ? "Saving..." : "Confirm Booking"}
         </button>
       </div>
    </form>
  );
};

export default BookingForm;