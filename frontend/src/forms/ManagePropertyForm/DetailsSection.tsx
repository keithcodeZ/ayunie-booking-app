import { useFormContext } from "react-hook-form"
import { PropertyFormData } from "./ManagePropertyForm"

const DetailsSection = () => {
    const {register,
        formState: {errors}
    } = useFormContext<PropertyFormData>()
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Your Property</h1>

            {/* Name of the Property */}
            <label className="text-gray-700 text-sm font-bold flex-1">
                Name
                <input className="border rounded w-full py-1 px-2 font-normal" type="text" placeholder="Enter the name of the property" {...register('name', {required: "This field is required"})} />
                {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                    )
                }
            </label>

            <div className="flex gap-4">

                {/* City */}
                <label className="text-gray-700 text-sm font-bold flex-1">
                    City
                    <input className="border rounded w-full py-1 px-2 font-normal" type="text" placeholder="Enter the city of the property" {...register('city', {required: "This field is required"})} />
                    {errors.city && (
                        <span className="text-red-500">{errors.city.message}</span>
                        )
                    }
                </label>

                {/* Country */}
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input className="border rounded w-full py-1 px-2 font-normal" type="text" placeholder="Enter the country of the property" {...register('country', {required: "This field is required"})} />
                    {errors.country && (
                        <span className="text-red-500">{errors.country.message}</span>
                        )
                    }
                </label>
            </div>

            {/* Description */}
            <label className="text-gray-700 text-sm font-bold flex-1">
                Description
                <textarea className="border rounded w-full py-1 px-2 font-normal" rows={10} placeholder="Enter the details and description of the property" {...register('description', {required: "This field is required"})}>
                </textarea>
                {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                    )
                }
            </label>
            
            {/* Price per night */}
            <label className="text-gray-700 text-sm font-bold w-[50%]">
                Price per night
                <input className="border rounded w-full py-1 px-2 font-normal" type="number" min={1} placeholder="Enter the price per night of the property" {...register('pricePerNight', {required: "This field is required"})} />
                {errors.pricePerNight && (
                    <span className="text-red-500">{errors.pricePerNight.message}</span>
                    )
                }
            </label>
            
            {/* Star Rating */}
            <label className="text-gray-700 text-sm font-bold w-[50%]">
                Star Rating
                <select {...register('starRating', {required: "This field is required"})} className="border rounded w-full py-1 px-2 font-normal text-gray-700">
                    <option value="" className="text-sm font-bold">
                        Select a rating
                    </option>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <option key={star} value={star}>
                            {star}
                        </option>
                    ))}
                </select>
                {errors.starRating && (
                    <span className="text-red-500">{errors.starRating.message}</span>
                    )
                }
            </label>




        </div>
    )
}

export default DetailsSection