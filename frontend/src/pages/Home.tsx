import 'swiper/css/bundle';
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SearchBar from "../components/SearchBar";
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
  const { data: properties } = useQuery("fetchTopProperties", async () => {
    const allProperties = await apiClient.fetchProperties();
    return allProperties
      .sort((a, b) => b.starRating - a.starRating)
      .slice(0, 10);
  });

  return (
    <div>
      {/* Hero Image Section */}
      <div className="relative mb-3">
        <img 
          src="../src/assets/images/ayunie-hero.webp" 
          alt="Hero" 
          className="w-full h-[500px] object-cover" 
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white text-5xl font-bold text-center px-4">
          Ayunie Vacation<br />
          Tahanan ng Kabayan
        </div>
      </div>
      <SearchBar/>

      {/* Carousel Section */}
      <div className="my-8">
        <h2 className="text-3xl font-bold mb-4">Top Rated Properties</h2>
        <Swiper modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
        >
          {properties?.map((property) => (
            <SwiperSlide key={property._id}>
              <LatestDestinationCard property={property} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
