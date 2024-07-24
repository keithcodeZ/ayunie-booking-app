import { useEffect, useState } from "react";
import * as apiClient from "../api-client"; // Update import path as needed

type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await apiClient.fetchProperties(); // Replace with the correct API method
        const prices = response.map((property: { pricePerNight: number }) => property.pricePerNight);
        const uniquePrices = Array.from(new Set(prices)).sort((a, b) => a - b); // Remove duplicates and sort
        if (uniquePrices.length > 0) {
          setMinPrice(uniquePrices[0]);
          setMaxPrice(uniquePrices[uniquePrices.length - 1]);
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
  }, []);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    onChange(value);
  };

  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={selectedPrice || minPrice}
          onChange={handleSliderChange}
          className="w-full"
          style={{
            accentColor: '#623A14' // Brown color
          }}
        />
        <span className="text-sm">${selectedPrice || minPrice}</span>
      </div>
    </div>
  );
};

export default PriceFilter;