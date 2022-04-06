import { useDispatch, useSelector } from "react-redux";

import City from "../City";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { selectCity } from "../../store/cities";

import "swiper/css";
import "swiper/css/effect-cube";

const CitiesSwiper = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.cities.selectedCity);
  const citiesData = useSelector((state) => state.cities.citiesList);

  return (
    <Swiper
      grabCursor={true}
      modules={[Pagination]}
      onSlideChange={(swiper) => {
        dispatch(selectCity(citiesData[swiper.activeIndex]));
      }}
      initialSlide={citiesData.findIndex((city) => city.id === selectedCity.id)}
      pagination={{
        el: ".navigation__pages",
        clickable: true,
        renderBullet: (index, className) => {
          return `<i class="icon icon-dot navigation__circle ${className}"></i>`;
        }
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
