import { modalTypes } from "../constants";

const initialIndex = 9000;

const getNumberOfOpenedModals = (state) => {
  let counter = 0;

  Object.keys(state).forEach((key) => (state[key].isOpen ? counter++ : null));

  return counter;
};

export const appActionTypes = {
  OPEN_MODAL: "open-modal",
  CLOSE_MODAL: "close-modal",
};

export const initialState = {
  [modalTypes.SETTINGS]: { isOpen: false, zIndex: initialIndex },
  [modalTypes.CITY_LIST]: { isOpen: true, zIndex: initialIndex },
  [modalTypes.ADD_CITY]: { isOpen: false, zIndex: initialIndex },
  [modalTypes.SELECT_API_SOURCE]: { isOpen: false, zIndex: initialIndex },
  [modalTypes.MAP]: { isOpen: false, zIndex: initialIndex },
};

export const reducer = (state, action) => {
  const numberOfOpenedModals = getNumberOfOpenedModals(state);
  const newIndex =
    numberOfOpenedModals === 0
      ? initialIndex
      : initialIndex + numberOfOpenedModals;

  switch (action.type) {
    case appActionTypes.OPEN_MODAL:
      return {
        ...state,
        [action.payload]: {
          zIndex: newIndex,
          isOpen: true,
        },
      };
    case appActionTypes.CLOSE_MODAL:
      return {
        ...state,
        [action.payload]: {
          zIndex: initialIndex,
          isOpen: false,
        },
      };
    default:
      return state;
  }
};
