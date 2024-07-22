import { useMutation } from "react-query";
import ManagePropertyForm from "../forms/ManagePropertyForm/ManagePropertyForm"
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddProperty = () => {
    const {showToast} = useAppContext();

    const {mutate, isLoading} = useMutation(apiClient.addMyProperty,{
        onSuccess: () => {
            console.log("success")
            showToast(
                {message: "Property added successfully", type: "SUCCESS"}
            )
        },
        onError: () => {
            // console.log(error)
            showToast(
                {message: "Error adding property", type: "ERROR"}
            )
        }
    });

    const handleSave = (propertyFormData: FormData) => {
        mutate(propertyFormData);
    }


    return (<ManagePropertyForm onSave={handleSave} isLoading={isLoading}/>)
}

export default AddProperty
