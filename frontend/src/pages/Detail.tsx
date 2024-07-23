import * as apiClient from "./../api-client";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { propertyId } = useParams();

  const { data: property } = useQuery(
    "fetchPropertyById",
    () => apiClient.fetchPropertyById(propertyId || ""),
    {
      enabled: !!propertyId,
    }
  );


  if (!property) {
    return <></>;
  }

  return (
    <div className="">

      {/*Star rating*/}
      <div className="flex justify-between pt-8 pb-4 px-8">
        <h2 className="text-xl font-bold py-2">{property.name}</h2>

        <span className="flex p-4">
          {Array.from({ length: property.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400 h-5 w-5" />
          ))}
        </span>
      </div>

      {/*Make this an image carousel*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center pb-10">
        {property.imageUrls.map((image) => (
          <div className="h-[300px]">
            <img
              src={image}
              alt={property.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>


      {/*facilities*/}
      <span className="w-full text-xl font-bold px-8 pt-10 ">Facilites</span>
      <div className="grid grid-cols-5 gap-2 col-span-2 pt-5 pb-10">
        {property.facilities.map((facility) => (
          <div className="border border-gray-300 rounded-full p-2 rounded-lg text-sm whitespace-nowrap">
            {facility}
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="w-2/3 whitespace-pre-line">{property.description}</div>

        {/*Booking Form*/}
          <div className="w-1/3 items-right">
            <GuestInfoForm
              pricePerNight={property.pricePerNight}
              propertyId={property._id}/>
          </div>
      </div>

    </div>
  );
};

export default Detail;