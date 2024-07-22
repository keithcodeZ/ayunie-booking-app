import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import ManageUserForm, { UserFormData } from "../forms/ManageUserForm/ManageUserForm";
import { UserType } from "../../../backend/src/shared/types";

const UserProfile = () => {
  const { showToast } = useAppContext();

  const { data: user, isLoading: isFetchingUser } = useQuery<UserType>(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  const { mutate, isLoading: isSaving } = useMutation(apiClient.updateCurrentUser, {
    onSuccess: () => {
      showToast({ message: "User Profile Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving User Profile", type: "ERROR" });
    },
  });

  const handleSave = (userFormData: FormData) => {
    mutate(userFormData);
  };

  if (isFetchingUser) {
    return <div>Loading...</div>;
  }

  return (
    <ManageUserForm user={user as unknown as UserFormData} onSave={handleSave} isLoading={isSaving} />
  );
};

export default UserProfile;
