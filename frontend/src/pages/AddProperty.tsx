import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import ManagePropertyForm from "../forms/ManagePropertyForm/ManagePropertyForm";

const AddProperty = () => {
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const { data: user, isLoading: isUserLoading } = useQuery(
        "currentUser",
        apiClient.fetchCurrentUser,
        { retry: false }
    );

    const { mutate, isLoading } = useMutation(apiClient.addMyProperty, {
        onSuccess: () => {
            showToast({
                message: "Property added successfully",
                type: "SUCCESS",
            });
        },
        onError: () => {
            showToast({
                message: "Error adding property",
                type: "ERROR",
            });
        },
    });

    useEffect(() => {
        if (!isUserLoading && user && user.paymentMethods.length === 0) {
            navigate("/profile?redirectedFromAddProperty=true");
        }
    }, [isUserLoading, user, navigate]);

    const handleSave = (propertyFormData: FormData) => {
        mutate(propertyFormData);
    };

    if (isUserLoading || !user) {
        return <div>Loading...</div>; // Or a spinner/loading component
    }

    return <ManagePropertyForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddProperty;