import { Link } from "react-router-dom";
import { PropertyType } from "../../../backend/src/shared/types";

type Props = {
  property: PropertyType;
};

const LatestDestinationCard = ({ property }: Props) => {
  return (
    <Link
      to={`/detail/${property._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={property.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-3xl">
          {property.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;