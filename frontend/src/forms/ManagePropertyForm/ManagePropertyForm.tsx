import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { PropertyType } from "../../../../backend/src/models/property";
import { useEffect } from "react";

export type PropertyFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageFiles: FileList;
    imageUrls: string[];
};

type Props = {
    property?: PropertyType;
    onSave: (propertyFormData: FormData) => void;
    isLoading: boolean;
};


const ManagePropertyForm = ({ onSave, isLoading, property }: Props) => {
    const formMethods = useForm<PropertyFormData>();
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        reset(property);
    }, [property, reset]
    );

    const onSubmit = handleSubmit((formDataJSON: PropertyFormData) => {
        console.log(formDataJSON);

        //create new form data object & call our api
        const formData = new FormData();

        if (property) {
            formData.append("propertyId", property._id);
        }
        formData.append("name", formDataJSON.name);
        formData.append("city", formDataJSON.city);
        formData.append("country", formDataJSON.country);
        formData.append("description", formDataJSON.description);
        formData.append("type", formDataJSON.type);
        formData.append("adultCount", formDataJSON.adultCount.toString());
        formData.append("childCount", formDataJSON.childCount.toString());
        // formData.append("facilities", JSON.stringify(formDataJSON.facilities));
        formData.append("pricePerNight", formDataJSON.pricePerNight.toString());
        formData.append("starRating", formDataJSON.starRating.toString());
        formData.append("imageFiles", formDataJSON.imageFiles[0]);

        formDataJSON.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });

        if (formDataJSON.imageUrls) {
            formDataJSON.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url);
            })
        }

        //converting the image file type to an array
        Array.from(formDataJSON.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        })

        onSave(formData);

    })

    return (
        <FormProvider {...formMethods}>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-10"
            >
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />

                <span className="flex justify-end">
                    <button disabled={isLoading} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl disabled:bg-gray-500">
                        {isLoading ? "Saving..." : "Save Property"}
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}

export default ManagePropertyForm