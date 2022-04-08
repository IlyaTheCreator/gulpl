import { useSelector } from "react-redux";

import City from "../City";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";

const CitiesSwiper = ({ selectedCityId, setSelectedCityId }) => {
  const citiesData = useSelector((state) => state.cities.citiesList);
  const initialIndex = citiesData.findIndex(
    (city) => city.id === selectedCityId
  );

  const slideChangeHandler = (swiper) => {
    setSelectedCityId(citiesData[swiper.activeIndex].id);
  };

  const updateHandler = (swiper) => {
    swiper.slideTo(citiesData.findIndex((city) => city.id === selectedCityId));
  };

  return (
    <Swiper
      grabCursor={true}
      modules={[Pagination]}
      onSlideChange={slideChangeHandler}
      initialSlide={initialIndex}
      onUpdate={updateHandler}
      pagination={{
        el: ".navigation__pages",
        clickable: true,
        renderBullet: (index, className) => {
          return `<i class="icon icon-dot navigation__circle ${className}"></i>`;
        },
      }}
    >
      {citiesData.map((city) => (
        <SwiperSlide key={city.id}>
          <City cityData={city} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CitiesSwiper;
