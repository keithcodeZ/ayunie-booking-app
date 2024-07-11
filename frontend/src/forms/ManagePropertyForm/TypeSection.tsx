import { useFormContext } from "react-hook-form";
import { propertyTypes } from "../../config/property-options-config";
import { PropertyFormData } from "./ManagePropertyForm";

const TypeSection = () => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<PropertyFormData>();

    const typeWatch = watch("type");

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Type of the Property</h2>
            <div className="grid grid-cols-5 gap-2">

                {propertyTypes.map((type) => (
                    <label
                        className={
                            typeWatch === type
                                ? "bg-blue-300 text-sm rounded-full px-4 py-2 cursor-pointer font-semibold"
                                : "bg-gray-300 text-sm rounded-full px-4 py-2 cursor-pointer font-semibold"
                        }
                    >
                        <input
                            type="radio"
                            value={type}
                            {...register("type", { required: "This field is required" })}
                            className="hidden"
                        />
                        <span>
                            {type}
                        </span>
                    </label>
                ))}

            </div>
            
            {errors.type && (
                <span className="text-red-500 text-sm font-bold">   
                    {errors.type.message}
                </span>
                )
            }

        </div>
    )
}

export default TypeSection