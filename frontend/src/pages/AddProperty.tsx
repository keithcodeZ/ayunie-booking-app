import * as apiClient from "../api-client";
import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import ManagePropertyForm from "../forms/ManagePropertyForm/ManagePropertyForm"

const AddProperty = () => {
    const {showToast} = useAppContext();

    const {mutate, isLoading} = useMutation(apiClient.addMyProperty,{
        onSuccess: () => {
            showToast(
                {message: "Property added successfully", type: "SUCCESS"}
            )
        },
        onError: () => {
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
