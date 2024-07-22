import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "./ManagePropertyForm";

const GuestsSection = () => {

    const {
        register,
        formState: { errors },
     } = useFormContext<PropertyFormData>();

    return (
        <div>
            <span className="flex justify-between py-8 px-8">
                <h1 className="text-xl font-bold text-custom-gray"> Number of Guests </h1>
            </span>

            <div className="grid grid-cols-2 gap-4 rounded">

                <label className="text-gray-700 text-xs font-bold flex-1">
                    Adult Count
                    <input
                        className="bg-gray-100 rounded w-full py-3 px-2 font-normal"
                        type="number"
                        min={1}
                        {...register("adultCount", { required: "This field is required" })} />
                    {errors.adultCount?.message && (
                        <span className="text-red-500">
                            {errors.adultCount.message}
                        </span>
                    )}
                </label>
                
                <label className="text-gray-700 text-xs font-bold flex-1">
                    Children Count
                    <input
                        className="bg-gray-100 rounded w-full py-3 px-2 font-normal"
                        type="number"
                        min={0}
                        {...register("childCount", { required: "This field is required" })} />
                    {errors.childCount?.message && (
                        <span className="text-red-500">
                            {errors.childCount.message}
                        </span>
                    )}
                </label>

            </div>
            
        </div>
    )
}

export default GuestsSection