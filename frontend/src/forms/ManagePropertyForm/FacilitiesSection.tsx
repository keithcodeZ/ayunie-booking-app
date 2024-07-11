import { useFormContext } from "react-hook-form";
import { propertyFacilities } from "../../config/property-options-config";
import { PropertyFormData } from "./ManagePropertyForm";

const FacilitiesSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<PropertyFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Facilities of the Property</h2>

            <div className="grid grid-cols-5 gap-3">

                {propertyFacilities.map((facility) => (
                    <label
                        className="flex gap-1 text-sm text-gray-00 items-center cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            value={facility}
                            {...register("facilities", { 
                                validate: (facilities) => {
                                    if(facilities && facilities.length > 0) {
                                        return true
                                    } else{
                                        return "At least one facility must be selected"
                                    }
                                }
                             })}
                        />
                        <span>
                            {facility}
                        </span>
                    </label>
                ))}

            </div>
            
            {errors.facilities && (
                <span className="text-red-500 text-sm font-bold">   
                    {errors.facilities.message}
                </span>
                )
            }

        </div>
    )
}

export default FacilitiesSection