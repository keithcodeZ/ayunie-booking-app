import { useFormContext } from "react-hook-form"
import { PropertyFormData } from "./ManagePropertyForm"

const DetailsSection = () => {
    const { register,
        formState: { errors }
    } = useFormContext<PropertyFormData>()
    return (
        <div className="">
            <span className="flex justify-between py-8 px-8">
                <h1 className="text-xl font-bold text-custom-gray"> Property Details </h1>
            </span>

            {/* Name of the Property */}
            <div className="py-2">
                <label className="text-gray-700 text-xs font-bold flex-1">
                    Name
                    <input className="bg-gray-100 rounded w-full py-3 px-2 font-normal" type="text" placeholder="Enter the name of the property" {...register('name', { required: "This field is required" })} />
                    {errors.name && (
                        <span className="text-red-500">{errors.name.message}</span>
                    )
                    }
                </label>
            </div>

            <div className="flex gap-4 py-2">
                <label className="text-gray-700 text-xs font-bold flex-1">
                    City
                    <input className="bg-gray-100 rounded w-full py-3 px-2 font-normal" type="text" placeholder="Enter the city of the property" {...register('city', { required: "This field is required" })} />
                    {errors.city && (
                        <span className="text-red-500">{errors.city.message}</span>
                    )
                    }
                </label>

                <label className="text-gray-700 text-xs font-bold flex-1">
                    Country
                    <input className="bg-gray-100 rounded w-full py-3 px-2 font-normal" type="text" placeholder="Enter the country of the property" {...register('country', { required: "This field is required" })} />
                    {errors.country && (
                        <span className="text-red-500">{errors.country.message}</span>
                    )
                    }
                </label>
            </div>

            {/* Description */}
            <label className="text-gray-700 text-xs font-bold flex-1">
                Description
                <textarea className="bg-gray-100 rounded w-full py-3 px-2 font-normal" rows={10} placeholder="Enter the details and description of the property" {...register('description', { required: "This field is required" })}>
                </textarea>
                {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                )
                }
            </label>

            <div className="flex gap-4 py-2">

                <label className="text-gray-700 text-xs font-bold flex-1">
                    Price per night
                    <input className="bg-gray-100 rounded w-full py-3 px-2 font-normal" type="number" min={1} placeholder="Enter the price per night of the property" {...register('pricePerNight', { required: "This field is required" })} />
                    {errors.pricePerNight && (
                        <span className="text-red-500">{errors.pricePerNight.message}</span>
                    )
                    }
                </label>

                <label className="text-gray-700 text-xs font-bold flex-1">
                    Star Rating
                    <select {...register('starRating', { required: "This field is required" })} className="bg-gray-100 rounded w-full py-3 px-2 font-normal">
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




        </div>
    )
}

export default DetailsSection