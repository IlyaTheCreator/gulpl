import { useSelector } from "react-redux";

import City from "../City";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/effect-cube";

const CitiesSwiper = () => {
  const citiesData = useSelector((state) => state.cities.citiesList);

  return (
    <Swiper
      grabCursor={true}
      modules={[Pagination]}
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
