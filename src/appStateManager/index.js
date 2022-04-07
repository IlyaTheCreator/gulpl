const initialIndex = 9000;

const getNumberOfOpenedModals = (state) => {
  let counter = 0;

  Object.keys(state).forEach((key) => (state[key].isOpen ? counter++ : null));

  return counter;
};

export const appActionTypes = {
  OPEN_SETTINGS: "open-settings",
  CLOSE_SETTINGS: "close-settings",
  OPEN_CITY_LIST: "open-city-list",
  CLOSE_CITY_LIST: "close-city-list",
  OPEN_ADD_CITY: "open-add-city",
  CLOSE_ADD_CITY: "close-add-city",
  OPEN_SELECT_API_SOURCE: "open-select-api-source",
  CLOSE_SELECT_API_SOURCE: "close-select-api-source",
  OPEN_MAP: "open-map",
  CLOSE_MAP: "close-map"
}

export const initialState = {
  SettingsModal: { isOpen: false, zIndex: initialIndex },
  CityListModal: { isOpen: false, zIndex: initialIndex },
  AddCityModal: { isOpen: false, zIndex: initialIndex },
  SelectAPISourceModal: { isOpen: false, zIndex: initialIndex },
  MapModal: { isOpen: false, zIndex: initialIndex },
};

export const reducer = (state, action) => {
  const numberOfOpenedModals = getNumberOfOpenedModals(state);
  const newIndex =
    numberOfOpenedModals === 0
      ? initialIndex
      : initialIndex + numberOfOpenedModals;

  switch (action.type) {
    case appActionTypes.OPEN_SETTINGS:
      return {
        ...state,
        SettingsModal: {
          zIndex: newIndex,
          isOpen: true,
        },
      };
    case appActionTypes.CLOSE_SETTINGS:
      return {
        ...state,
        SettingsModal: { zIndex: initialIndex, isOpen: false },
      };
    case appActionTypes.OPEN_CITY_LIST:
      return {
        ...state,
        CityListModal: {
          zIndex: newIndex,
          isOpen: true,
        },
      };
    case appActionTypes.CLOSE_CITY_LIST:
      return {
        ...state,
        CityListModal: { zIndex: initialIndex, isOpen: false },
      };
    case appActionTypes.OPEN_ADD_CITY:
      return {
        ...state,
        AddCityModal: {
          zIndex: newIndex,
          isOpen: true,
        },
      };
    case appActionTypes.CLOSE_ADD_CITY:
      return {
        ...state,
        AddCityModal: { zIndex: initialIndex, isOpen: false },
      };
    case appActionTypes.OPEN_SELECT_API_SOURCE:
      return {
        ...state,
        SelectAPISourceModal: {
          zIndex: newIndex,
          isOpen: true,
        },
      };
    case appActionTypes.CLOSE_SELECT_API_SOURCE:
      return {
        ...state,
        SelectAPISourceModal: { zIndex: initialIndex, isOpen: false },
      };
    case appActionTypes.OPEN_MAP:
      return {
        ...state,
        MapModal: {
          zIndex: newIndex,
          isOpen: true,
        },
      };
    case appActionTypes.CLOSE_MAP:
      return { ...state, MapModal: { zIndex: initialIndex, isOpen: false } };
    default:
      return state;
  }
};