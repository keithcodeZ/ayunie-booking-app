import { useQuery } from "react-query";
import { useState } from "react";
import * as apiClient from "../api-client";
import { useSearchContext } from "../contexts/SearchContext";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import PropertyTypesFilter from "../components/PropertyTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedPropertyTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: propertyData } = useQuery(["searchProperties", searchParams], () =>
    apiClient.searchProperties(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handlePropertyTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const propertyType = event.target.value;

    setSelectedPropertyTypes((prevPropertyTypes) =>
      event.target.checked
        ? [...prevPropertyTypes, propertyType]
        : prevPropertyTypes.filter((property) => property !== propertyType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">

      {/* Filter */}
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky">
        <div className="space-y-5">
          <h3 className="text-m font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>

          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <PropertyTypesFilter
            selectedPropertyTypes={selectedPropertyTypes}
            onChange={handlePropertyTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>

      {/* Sort */}
      <div className="flex flex-col gap-8">

        <div className="flex justify-between items-center">

          <span className="text-xl font-bold text-custom-gray">
            {propertyData?.pagination.total} Properties found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md text-sm"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {propertyData?.data.map((property) => (
          <SearchResultsCard property={property} />
        ))}

        <div className="text-sm">
          <Pagination
            page={propertyData?.pagination.page || 1}
            pages={propertyData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>

      </div>
    </div>
  );
};

export default Search;