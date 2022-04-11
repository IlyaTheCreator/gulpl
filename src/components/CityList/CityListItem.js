import { useState } from "react";
import Widget from "../ui/Widget";
import { Swiper, SwiperSlide } from "swiper/react";

import { widgetTypes } from "../../constants";

const CityListItem = ({ itemData, onClick, onSwipe }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const classes = ["screen__city"];

  if (isDeleting) {
    classes.push("city-to-be-deleted");
  }

  const sliderChangeHandler = (swiper) => {
    if (swiper.activeIndex !== 1) {
      return;
    }

    setIsDeleting(true);

    const timeoutId = setTimeout(() => {
      onSwipe();
      clearTimeout(timeoutId);
    }, 300);
  };

  const sliderMoveHandler = () => {
    if (isMoving) {
      setIsMoving(true);
    }
  };

  const clickHandler = () => {
    if (isMoving) {
      return;
    }

    onClick();
  };

  const sliderTouchEndHandler = () => {
    if (isMoving) {
      setIsMoving(false);
    }
  };

  const content = (
    <div className="link">
      <h3 className="screen__title">
        <div className="screen__city-title-group">
          <span className="screen__city-name">{itemData.title}</span>
          <p className="screen__city-time">
            {new Date(itemData.date).toDateString()}
          </p>
        </div>
        <span className="screen__city-temperature">
          {itemData.currentTemp}°
        </span>
      </h3>
      <div className="screen__city-info">
        <span className="screen__city-weather-condition">
          {itemData.weatherCondition}
        </span>
        <span className="screen__city-temperature-range">
          Max. {itemData.widgetRelatedInfo.maxTemp.value}
          <span> </span>
          Min. {itemData.widgetRelatedInfo.minTemp.value}
        </span>
      </div>
    </div>
  );

  return (
    <Widget classes={classes} type={widgetTypes.LIST} onClick={clickHandler}>
      <Swiper
        resistanceRatio={1}
        shortSwipes={false}
        allowSlidePrev={false}
        slidesPerView={1}
        spaceBetween={5}
        onSliderMove={sliderMoveHandler}
        onSlideChange={sliderChangeHandler}
        onTouchEnd={sliderTouchEndHandler}
      >
        <SwiperSlide>{content}</SwiperSlide>
        <SwiperSlide>
          <div className="btn delete-city-btn">
            <i className="icon-trash-empty" />
          </div>
        </SwiperSlide>
      </Swiper>
    </Widget>
  );
};

export default CityListItem;