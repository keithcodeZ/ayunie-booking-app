import { AiFillStar } from "react-icons/ai";
import { PropertyType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

interface Props {
  property: PropertyType;
}

const LatestDestinationCard = ({ property }: Props) => {
  return (
    <Link
      to={`/detail/${property._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-md mb-3">
        <img
          src={property.imageUrls[0]}
          alt={property.name}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <p className="text-xs text-gray-600">{property.type}</p>
          <h3 className="text-xl font-bold mb-1">{property.name}</h3>
          <p className="text-sm mb-2">{property.city}, {property.country}</p>
          <span className="flex text-sm text-gray-600">
              {Array.from({ length: property.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-400" />
              ))}
          </span>
          <div className="text-sm text-custom-gray text-center mt-5">
            <span className="text-xl font-bold">${property.pricePerNight.toFixed(2)}</span>
            <span>/night</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
