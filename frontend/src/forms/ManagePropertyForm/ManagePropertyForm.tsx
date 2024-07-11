import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

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
};

type Props = {
    onSave: (propertyFormData: FormData) => void;
    isLoading: boolean;
};


const ManagePropertyForm = ({ onSave, isLoading }: Props) => {
    const formMethods = useForm<PropertyFormData>();
    const { handleSubmit } = formMethods;

    const onSubmit = handleSubmit((formDataJSON: PropertyFormData) => {
        console.log(formDataJSON);

        //create new form data object & call our api
        const formData = new FormData();

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
        })

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
                <DetailsSection/>
                <TypeSection/>
                <FacilitiesSection/>
                <GuestsSection/>
                <ImagesSection/>

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