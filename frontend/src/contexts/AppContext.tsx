//define a type of the context which holds all the properties that we need to expose to the components
//all the things that the components can access

import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

type ToastMessage = {
    message: string
    type: "SUCCESS" | "ERROR"
}

//global state for the app
type AppContext = {
    //whenever our components use the showToast function, they will have to pass in an object of a toast message and a type
    showToast: (toastMessage: ToastMessage) => void;

    isLoggedIn: boolean;
}

//whenever the app loads for the first time, the context will be undefined
const AppContext = React.createContext<AppContext | undefined>(undefined);

//provider is a thing that wraps our components
//gives our components access to all the things in the app context
//it accepts children properties
//AppContextProvider is where we can store states, use hooks
export const AppContextProvider = ({ children, }: { children: React.ReactNode }) => {

    //state object which holds the state of the toast if it's being displayed or not
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

    //whenever the validateToken is called it automatically passes the HTTP cookie that was stored in the browser
    //the query name is "validateToken"
    //if the user wants to signout and clicked the signout button, the query will be called again and the HTTP cookie will be removed from the browser
    //isError is a boolean that is true if there's an error and it will logout the user
    const {isError} = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
    });

    return (
        <AppContext.Provider value={{
            //in our app context provider, we are exposing a function that called showToast
            showToast: (toastMessage) => {
                console.log(toastMessage);
                setToast(toastMessage);
            },

            //if there's no error, that means the token is good and status 200
            //if this is false, also means the user is logged out
            isLoggedIn: !isError
        }}
        >
            {/* sets the toast to false or undefind which will not render the toast */}
            {toast && <Toast
                message={toast.message}
                type={toast.type}
                onclose={() => setToast(undefined)} />}

            {children}
        </AppContext.Provider>
    );
};

// a hook that lets our component easily access the provider
//when our components need something from the context, they can import this hook to access all the properties inside it
//useAppContext is the name of this hook
export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
};
