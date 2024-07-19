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
            <span className="flex justify-between py-8 px-8">
                <h1 className="text-xl font-bold text-custom-gray"> Property Type </h1>
            </span>
            <div className="grid grid-cols-5 gap-4">

                {propertyTypes.map((type) => (
                    <label
                        className={
                            typeWatch === type
                                ? "bg-light-brown text-xs text-custom-gray rounded-full px-4 py-2 cursor-pointer font-semibold text-center"
                                : "border-2 hover:bgbg-light-brown hover:text-custom-gray text-xs rounded-full px-4 py-2 cursor-pointer font-semibold text-center"
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