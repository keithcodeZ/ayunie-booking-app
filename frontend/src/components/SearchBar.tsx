import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const navigate = useNavigate();
    const search = useSearchContext();

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount
        );
        navigate("/search")
    };

    const handleClear = () => {
        search.clearSearchValues();
        setDestination('');
        setCheckIn(new Date());
        setCheckOut(new Date());
        setAdultCount(1);
        setChildCount(0);
    };

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <div className="bg-light-brown rounded-3xl p-5 mb-5">

            <div className="flex flex-col w-full items-center py-2 mb-4">
                <MdTravelExplore size={50} />
                <h1 className="text-2xl font-semibold"> Search for an accomodation </h1>
                <p className="text-sm">Discover the perfect space for you!</p>
            </div>



            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-2">
                    {/* Destination Search Field */}
                    <div className="flex flex-row items-center flex-1 p-2 col-span-2">
                        <label className="text-gray-700 text-xs flex-1">
                            Search for anything
                            <input
                                placeholder="Where are you going?"
                                className="bg-white rounded w-full py-3 px-2 font-normal"
                                value={destination}
                                onChange={(event) => setDestination(event.target.value)}
                            />
                        </label>
                    </div>

                    {/* Guest Count Field */}
                    <div className="flex flex-row items-center flex-1 p-2 gap-4">
                        <label className="text-gray-700 text-xs flex-1">
                            Adults:
                            <input
                                className="bg-white rounded w-full py-3 px-2 font-normal"
                                type="number"
                                min={1}
                                max={20}
                                value={adultCount}
                                onChange={(event) => setAdultCount(parseInt(event.target.value))}
                            />
                        </label>
                        <label className="text-gray-700 text-xs flex-1">
                            Children:
                            <input
                                className="bg-white rounded w-full py-3 px-2 font-normal"
                                type="number"
                                min={0}
                                max={20}
                                value={childCount}
                                onChange={(event) => setChildCount(parseInt(event.target.value))}
                            />
                        </label>
                    </div>


                    {/* Date Fields */}
                    <div className="flex flex-row items-center flex-1 p-2 gap-4">
                        <label className="text-gray-700 text-xs flex-1">
                            Check-in date
                            <DatePicker
                                selected={checkIn}
                                onChange={(date) => setCheckIn(date as Date)}
                                selectsStart
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={minDate}
                                maxDate={maxDate}
                                placeholderText="Check-in Date"
                                className="bg-white rounded w-full py-3 px-2 font-normal"
                                wrapperClassName="min-w-full"
                            />
                        </label>
                        <label className="text-gray-700 text-xs flex-1">
                            Check-out date
                            <DatePicker
                                selected={checkOut}
                                onChange={(date) => setCheckOut(date as Date)}
                                selectsStart
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={minDate}
                                maxDate={maxDate}
                                placeholderText="Check-out Date"
                                className="bg-white rounded w-full py-3 px-2 font-normal"
                                wrapperClassName="min-w-full"
                            />
                        </label>
                    </div>

                </div>
                <div className="flex flex-row justify-center flex-1 p-4 gap-4">
                        <button className="w-2/3 text-center inline-block bg-brown hover:shadow-lg text-white font-bold py-2 px-10 rounded">
                            Search
                        </button>
                        <button type="button" onClick={handleClear} className="w-1/3 text-center inline-block bg-red-900 hover:shadow-lg text-white font-bold py-2 px-10 rounded">
                            Clear
                        </button>
                    </div>

            </form>
        </div>
    );
}

export default SearchBar;