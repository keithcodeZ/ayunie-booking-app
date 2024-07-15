import React, { useContext, useState } from "react";

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  propertyId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
  clearSearchValues: () => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>(() => sessionStorage.getItem("destination") || "");
  const [checkIn, setCheckIn] = useState<Date>(() => new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()));
  const [checkOut, setCheckOut] = useState<Date>(() => new Date(sessionStorage.getItem("checkOut") || new Date().toISOString()));
  const [adultCount, setAdultCount] = useState<number>(() => parseInt(sessionStorage.getItem("adultCount") || "1"));
  const [childCount, setChildCount] = useState<number>(() => parseInt(sessionStorage.getItem("childCount") || "0"));
  const [propertyId, setPropertyId] = useState<string>(() => sessionStorage.getItem("propertyId") || "");

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    propertyId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);

    if (propertyId) {
      setPropertyId(propertyId);
    }

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());

    if (propertyId) {
      sessionStorage.setItem("propertyId", propertyId);
    }
  };

  const clearSearchValues = () => {
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultCount(1);
    setChildCount(0);
    setPropertyId("");

    sessionStorage.removeItem("destination");
    sessionStorage.removeItem("checkIn");
    sessionStorage.removeItem("checkOut");
    sessionStorage.removeItem("adultCount");
    sessionStorage.removeItem("childCount");
    sessionStorage.removeItem("propertyId");
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        propertyId,
        saveSearchValues,
        clearSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};