//fetch requests

import { RegisterFormData } from "./pages/Register"
import { SignInFormData } from "./pages/SignIn";

//ENVIRONMENT VARIABLES USING VITE
//the || '' tells that there is no API BASE URL so just use the same server for all the requests
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const register = async (formData: RegisterFormData) => {

    // an api call to register a user
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        //anytime we make a post request to the register endpoint, we want to include any HTTP cookies along with the request
        credentials: "include",
        //tells the server to expect the body of request to be json
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
};

export const signIn = async (formData: SignInFormData) => {

    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;

}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        // method: "GET",
        credentials: "include"
    });
    // const responseBody = await response.json();
    if (!response.ok) {
        // throw new Error(responseBody.message);
        throw new Error("TOKEN INVALID/Failed to validate token");
    } 

    return response.json();
}

//new fetch request to call the logout endpoint
//we are creating an expired token that will expire in 1 second
export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to logout - Error during sign out");
    }
}