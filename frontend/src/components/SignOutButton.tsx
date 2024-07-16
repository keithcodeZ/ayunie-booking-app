import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";


const SignOutButton = () => {
    const queryClient = useQueryClient();

    const { showToast } = useAppContext();

    //calling the logout endpoint
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            //force the validatetoken function to run again and it'll check the expired token
            await queryClient.invalidateQueries("validateToken");
            //showToast
            showToast({message: "Sign out successful", type: "SUCCESS"});

        }, 
        onError: (error: Error) => {
            //showToast
            showToast({message: error.message, type: "ERROR"});
            console.log(error.message);
        }
    });

    //this invokes the api call to logout
    const handleClick = () => {
        mutation.mutate();
    }

    return (
        <button
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}
        >
            Sign Out
        </button>
    );
};

export default SignOutButton