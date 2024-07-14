import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import ManagePropertyForm from "../forms/ManagePropertyForm/ManagePropertyForm";

const EditProperty = () => {
  const { propertyId } = useParams();
  const { showToast } = useAppContext();

  const { data: property } = useQuery(
    "fetchMyPropertyById",
    () => apiClient.fetchMyPropertyById(propertyId || ""),
    {
      enabled: !!propertyId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyPropertyById, {
    onSuccess: () => {
      showToast({ message: "Property Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Property", type: "ERROR" });
    },
  });

  const handleSave = (PropertyFormData: FormData) => {
    mutate(PropertyFormData);
  };

  return (
    <ManagePropertyForm property={property} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditProperty;