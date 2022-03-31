import React, { Suspense } from "react";
import { useSelector } from "react-redux";

const AddCityModal = React.lazy(() => import("./AddCityModal"));
const CityListModal = React.lazy(() => import("./CityListModal"));
const MapModal = React.lazy(() => import("./MapModal"));
const SelectAPISourceModal = React.lazy(() => import("./SelectAPISourceModal"));
const SettingsModal = React.lazy(() => import("./SettingsModal"));

const ModalWindows = () => {
  const {
    isSettingsOpen,
    isCityListOpen,
    isAddCityOpen,
    isSelectAPISourceOpen,
    isMapOpen,
  } = useSelector((state) => state.modals);

  return (
    <>
      {isAddCityOpen && (
          <Suspense fallback="<div>loading...</div>">
              <AddCityModal />
          </Suspense>
      )}
      {isCityListOpen && (
          <Suspense fallback="<div>loading...</div>">
              <CityListModal />
          </Suspense>
      )}
      {isMapOpen && (
          <Suspense fallback="<div>loading...</div>">
              <MapModal />
          </Suspense>
      )}
      {isSelectAPISourceOpen && (
          <Suspense fallback="<div>loading...</div>">
              <SelectAPISourceModal />
          </Suspense>
      )}
      {isSettingsOpen && (
          <Suspense fallback="<div>loading...</div>">
              <SettingsModal />
          </Suspense>
      )}
    </>
  );
};

export default ModalWindows;
