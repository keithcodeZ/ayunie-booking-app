//fetch requests

import { RegisterFormData } from "./pages/Register"
import { SignInFormData } from "./pages/SignIn";
import { PropertySearchResponse, PropertyType, UserType } from "../../backend/src/shared/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";

//ENVIRONMENT VARIABLES USING VITE
//the || '' tells that there is no API BASE URL so just use the same server for all the requests
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

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

export const addMyProperty = async (propertyFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-properties`, {
        method: "POST",
        credentials: "include",
        body: propertyFormData
    });
    // const responseBody = await response.json();

    if (!response.ok) {
        throw new Error("Failed to add property");
    }

    return response.json();
};

export const fetchMyProperties = async (): Promise<PropertyType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-properties`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error fetching properties");
    }

    return response.json();
};

export const fetchMyPropertyById = async(propertyId: string): Promise<PropertyType> =>{
    const response = await fetch(`${API_BASE_URL}/api/my-properties/${propertyId}`, 
    {credentials: "include"})

    if(!response.ok){
        throw new Error("Error fetching properties")
    }

    return response.json();
}

export const updateMyPropertyById = async (propertyFormData: FormData)=> {
    const response = await fetch(`${API_BASE_URL}/api/my-properties/${propertyFormData.get("propertyId")}`,
    {
        method: "PUT",
        body: propertyFormData,
        credentials: "include",
    });

    if(!response.ok){
        throw new Error("Failed to update Property")
    }

    return response.json();
}

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchProperties = async (searchParams: SearchParams): Promise<PropertySearchResponse>=> {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) => queryParams.append("facilities", facility));
  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/properties/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching properties");
  }

  return response.json();
};

export const fetchProperties = async (): Promise<PropertyType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/properties`);
  if (!response.ok) {
    throw new Error("Error fetching properties");
  }
  return response.json();
};

export const fetchPropertyById = async (propertyId: string): Promise<PropertyType> => {
  const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}`);
  if (!response.ok) {
    throw new Error("Error fetching Property");
  }

  return response.json();
};

export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/properties/${formData.propertyId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error booking room");
  }
};

export const fetchMyBookings = async (): Promise<PropertyType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookings");
  }

    return response.json();
};
