import { Link } from "react-router-dom";
import { PropertyType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";
type Props = {
  property: PropertyType;
};

const SearchResultsCard = ({ property }: Props) => {
  return (
    <div className="grid grid-cols-1">

      <div className="flex h-64 border rounded">

        <div className="flex w-2/5 border my-4 ml-4 justify-center">
          <img className="object-cover h-56" src={property.imageUrls[0]} />
        </div>

        <div className="w-3/5 px-4">

          <div className="flex justify-between">
            <h2 className="text-xl font-bold py-2">{property.name}</h2>

            <span className="flex p-4">
              {Array.from({ length: property.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
          </div>

          <div className="flex items-center indent-1 text-xs pb-2">

            <svg className="h-4 w-4 text-custom-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            {property.city}, {property.country}
          </div>


          <div>
            <div className="text-xs text-pretty h-16 line-clamp-3 px-2 pb-2">{property.description}</div>
          </div>

          <div className=" rounded-sm flex text-xs pt-2 items-center indent-1">
            <svg className="h-4 w-4 text-custom-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>

            {property.adultCount} adults, {property.childCount} children
          </div>

          <div>

            <div className="pt-2 flex gap-1 items-center">
              {property.facilities.slice(0, 3).map((facility) => (
                <span className="border border-gray-300 rounded-full p-1 rounded-lg text-xs whitespace-nowrap">
                  {facility}
                </span>
              ))}

              <span className="text-xs">
                {property.facilities.length > 3 &&
                  `+${property.facilities.length - 3} more`}
              </span>
            </div>

            <div className="flex justify-between py-3">
              <div>
                <span className="flex">
                  <Link to={`/detail/${property._id}`}
                    className="text-xs inline-block bg-brown hover:bg-light-brown hover:text-custom-gray text-white py-2 px-10 rounded"> View More </Link>
                </span>
              </div>

              <div>
                <p className="text-lg text-center text-custom-gray font-bold leading-tight">£{property.pricePerNight}</p>
                <p className="text-right text-xs leading-none">includes taxes and fees</p>
              </div>

            </div>



          </div>

        </div>
      </div>
    </div>


  );
};

export default SearchResultsCard;